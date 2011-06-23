-- file: tree.hs
-- author: ost
-- lang: haskell

import Control.Applicative
import System.Directory (doesDirectoryExist, getDirectoryContents, getCurrentDirectory)

run = do
    cwd <- getCurrentDirectory
    names <- getDirectoryContents cwd
    mapM_ putStrLn names

--    mapM_ putStrLn $ filter (notElem '.') names

sequenceA :: (Applicative f) => [f a] -> f [a]  
sequenceA = foldr (liftA2 (:)) (pure [])  