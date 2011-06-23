module URI where

import Data.List.Split
import Data.Char (digitToInt, isAlphaNum, is)

type Key   = String
type Value = String

data Scheme   = Scheme String 
              deriving (Show)

data Path     = Path [String]
              --deriving (Show)

instance Show Path where
  show (Path (x:xs)) = "/" ++ x ++ show (Path xs)
  show (Path []) = "/"

str2Path :: String -> Path
str2Path s = Path . filter (not . null) $ splitOn ("/") s

-- Taken from "Network.HTTP.Base" -----------------------------------------------------
urlDecode :: String -> String
urlDecode ('%':a:b:rest) = toEnum (16 * digitToInt a + digitToInt b) : urlDecode rest
urlDecode (h:t) = h : urlDecode t
urlDecode [] = []
---------------------------------------------------------------------------------------
urlEncode :: String -> String
urlEncode     [] = []
urlEncode (ch:t) 
  | (isAscii ch && isAlphaNum ch) || ch `elem` "-_.~" = ch : urlEncode t
  | not (isAscii ch) = foldr escape (urlEncode t) (eightBs [] (fromEnum ch))
  | otherwise = escape (fromEnum ch) (urlEncode t)
    where
     escape b rs = '%':showH (b `div` 16) (showH (b `mod` 16) rs)
     
     showH x xs
       | x <= 9    = toEnum (o_0 + x) : xs
       | otherwise = toEnum (o_A + (x-10)) : xs
      where
       o_0 = fromEnum '0'
       o_A = fromEnum 'A'

     eightBs :: [Int]  -> Int -> [Int]
     eightBs acc x
      | x <= 0xff = (x:acc)
      | otherwise = eightBs ((x `mod` 256) : acc) (x `div` 256)

data Query    = Query [(Key, Value)]
              deriving (Show)

data Fragment = Fragment String
              deriving (Show)

data Authority = Authority { tld        :: String
                           , domain     :: String
                           , subdomains :: Maybe [String]
                           } deriving (Show)

data URI       = URI       { scheme    :: Scheme
                           , authority :: Authority
                           , path      :: Path
                           , query     :: Maybe Query
                           , fragment  :: Maybe Fragment
                           } deriving (Show)