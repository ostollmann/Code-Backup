-- Problem 1
myLast :: [a] -> a
myLast (x:[]) = x
myLast (x:xs) = myLast xs

-- Problem 2
myButLast :: [a] -> a
myButLast (xa:xb:[]) = xa
myButLast (x:xs)     = myButLast xs

-- Problem 3
elementAt :: [a] -> Int -> a
elementAt l k = elementAt' 0 l (k-1)
    where elementAt' c l k = if c == k
                             then head l
                             else elementAt' (c + 1) (tail l) k

-- Problem 4
myLength :: [a] -> Int
myLength []     = 0
myLength (_:xs) = 1 + myLength xs

-- Problem 5
myReverse :: [a] -> [a]
myReverse (x:[]) = [x]
myReverse (x:xs) = myReverse xs ++ [x]

-- Problem 6
isPalindrome :: (Eq a) => [a] -> Bool
isPalindrome l = l == reverse l

-- Problem 7
data NestList a = Item a | List [NestList a] deriving (Show)
flatten :: NestList a -> [a]
flatten = flatten' []
    where flatten' o (List [])     = o
          flatten' o (List (l:ls)) = o ++ (flatten' [] l) ++ flatten' [] (List ls)
          flatten' o (Item e)      = o ++ [e]

-- Problem 8
compress :: (Eq a) => [a] -> [a]
compress (x:y:xs) = if x == y
                    then [] ++ compress (y:xs)
                    else [x] ++ compress (y:xs)
compress x        = x

-- Problem 9
pack :: (Eq a) => [a] -> [[a]]
pack []     = []
pack [x]    = [[x]]
pack (x:xs) = if elem x (head (pack xs)) 
              then (x:(head (pack xs))):(tail (pack xs))
              else [x]:(pack xs)

-- Problem 10
encode :: (Eq a) => [a] -> [(Int, a)]
encode l = map (\x -> (length x, head x)) (pack l)



