module GlobRegexCase
       (
         globToRegex
       , matchesGlob
       ) where

import Text.Regex.Posix ((=~))
import Char


matchesGlob :: FilePath -> String -> Bool -> Bool
matchesGlob name pat sens = name =~ globToRegex pat sens

globToRegex :: String -> Bool -> String
globToRegex cs s = '^' : globToRegex' cs s ++ "$"

globToRegex' :: String -> Bool -> String
globToRegex' "" _              = ""
globToRegex' ('*':cs) s        = ".*" ++ globToRegex' cs s
globToRegex' ('?':cs) s        = '.' : globToRegex' cs s
globToRegex' ('[':'!':c:cs) s  = "[^" ++ (escapeCase c s) ++ charClass cs s
globToRegex' ('[':c:cs) s      = '[' : (escapeCase c s) ++ charClass cs s
globToRegex' ('[':_) s         = error "unterminated character class"
globToRegex' (c:cs) s          = escape c s ++ globToRegex' cs s

escapeCase :: Char -> Bool -> String
escapeCase c True   = [toUpper c] ++ [toLower c]
escapeCase c False  = [c]

escape :: Char -> Bool -> String
escape c s | elem c regexChars = '\\' : [c]
           | otherwise = if s then concat ["[", [toUpper c], [toLower c], "]"] else [c]
           where
             regexChars = "\\+()^$.{}]|"

charClass :: String -> Bool -> String
charClass (']':cs) s = ']' : globToRegex' cs s
charClass (c:cs)   s = (escapeCase c s) ++ charClass cs s
charClass []       s = error "unterminated character class"