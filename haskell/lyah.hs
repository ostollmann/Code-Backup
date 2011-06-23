--isPrime :: Int -> Bool
--isPrime i =  2 == length (filter (mod0 i) [i..1])
--    where mod0 l x = 0 == mod l x

isPrime :: Int -> Int
isPrime i = length (filter (mod0 i) [i..1])
mod0 l x = 0 == mod x l
    