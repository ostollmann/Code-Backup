module Glob ( namesMatching
            ) where

import System.Directory ( doesDirectoryExist
                        , doesFileExist
                        , getCurrentDirectory
                        , getDirectoryContents )
import System.FilePath ( dropTrailingPathSeparator
                       , splitFileName
                       , (</>) )

import Control.Exception (handle)
import Control.Monad (forM)

import GlobRegex (matchesGlob)

namesMatching pat
    | not (isPattern pat) = do -- not a patter
        exists <- doesNameExist pat
        return (if exists then [pat] else [])
    | otherwise = do
        case splitFileName pat of
            ("", baseName) -> do
                curDir <- getCurrentDirectory
                listMatches curDir baseName
            (dirName, baseName) -> do
                dirs <- if isPattern dirName
                    then namesMatching (dropTrailingPathSeparator dirName)
                    else return [dirName]
                let listDir = if isPattern baseName
                              then listMatches
                              else listPlain
                pathNames <- forM dirs $ \dir -> do
                                    baseNames <- listDir dir baseName
                                    return (map (dir </>) baseNames)
                return (concat pathNames) 

listMatches :: FilePath -> String -> IO [String]
listMatches dirName pat = do
    dirName' <- if null dirName
                then getCurrentDirectory
                else return dirName
--    handle (const (return [])) $ do
    names <- getDirectoryContents dirName'
    let names' = if isHidden pat
                 then filter isHidden names
                 else filter (not . isHidden) names
    return (filter (`matchesGlob` pat) names')

listPlain :: FilePath -> String -> IO [String]
listPlain dirName baseName = do
    exists <- if null baseName
              then doesDirectoryExist dirName
              else doesNameExist (dirName </> baseName)
    return (if exists then [baseName] else [])

isHidden :: String -> Bool 
isHidden ('.':_) = True
isHidden _       = False

doesNameExist :: FilePath -> IO Bool
doesNameExist name = do
    fileExists <- doesFileExist name
    if fileExists
    then return True
    else doesDirectoryExist name

isPattern :: String -> Bool
isPattern = any (\l -> elem l pat)
            where
                pat = "[*?"
