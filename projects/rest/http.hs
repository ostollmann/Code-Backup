module Http where

import Data.Maybe

data Request = Request {
                
               } deriving (Show)

data RequestLine = RequestLine { method  :: Method
                               , uri     :: String
                               , version :: String
                               } deriving (Show)

data Method = OPTIONS
            | GET
            | HEAD
            | POST
            | PUT
            | DELETE
            | TRACE
            | CONNECT
            deriving (Show)

