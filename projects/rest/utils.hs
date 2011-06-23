module Utils where

import Data.List.Split

splitStr :: String -> Char -> String
splitStr s c = takeWhile (!= c) s ++ 