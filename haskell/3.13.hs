import Data.List hiding (intersperse)
import Data.Function
import Data.Ord

-- 1
size :: [a] -> Integer
size (x:xs) = 1 + size xs
size []     = 0

-- 3
mean :: Fractional a => [Rational] -> a
mean [] = 0
mean x  = (/) (fromRational $ sum x) (fromIntegral $ length x)

-- 4
palind :: [a] -> [a]
palind x = concat [x, reverse x]

-- 5
isPalind :: Eq a => [a] -> Bool
isPalind [] = True
isPalind x
         | mod (length x) 2 == 1 = False
         | take m x == reverse (drop m x) = True
         | otherwise = False
           where m = div (length x) 2

-- 6
sortByLength [[x]] = [[x]]
sortByLength x = sortBy (comparing length) x 

-- *
quickSort :: Ord a => [a] -> [a]
quickSort [] = []
quickSort (x:xs) = quickSort (filter (< x) xs) ++ [x] ++ quickSort (filter (>= x) xs)

-- 7
intersperse :: a -> [[a]] -> [a]
intersperse s [[]] = [s]
intersperse s (x:xs)
            | length xs == 0 = x
            | length xs == 1 = concat [x,[s],concat xs]
            | otherwise = x ++ [s] ++ intersperse s xs

-- 8
data Tree a = Node a (Tree a) (Tree a)
              | Empty
              deriving (Show, Eq)

treeHeight :: (Tree a) -> Int
treeHeight Empty = 0
treeHeight (Node _ Empty Empty) = 0
treeHeight (Node _ Empty cr) = 1 + treeHeight cr
treeHeight (Node _ cl Empty) = 1 + treeHeight cl
treeHeight (Node a cl cr) = 1 + treeHeight cl + treeHeight cr

treeHeight2 :: (Tree a) -> Int
treeHeight2 Empty = 0
treeHeight2 (Node _ cl cr) = 1 + max (treeHeight2 cl) (treeHeight2 cr)