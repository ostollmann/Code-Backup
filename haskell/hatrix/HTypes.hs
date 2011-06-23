module HTypes where

data Matrix = IntMatrix [[Integer]]
            | DoubleMatrix [[Double]]
            deriving (Show)
              