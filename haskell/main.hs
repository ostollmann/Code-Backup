--distance :: (Fractional a) => (a, a) -> (a, a) -> a
--distance :: (Double, Double) -> (Double, Double) -> Double
--distance :: (Num, Num) -> (Num, Num) -> Num
distance :: (Floating a) => (a, a) -> (a, a) -> a
distance (x1,y1) (x2,y2) = (((x2-x1)^2 + (y2-y1)^2)**(1/2))

addVectors :: (Num a) => (a, a) -> (a, a) -> a  
addVectors (x1, y1) (x2, y2) = (x1 + x2 + y1 + y2)

fib :: Int -> Integer
fib 0 = 1
fib 1 = 1
fib x = fib(x-1) + fib(x-2)

bigger :: (Ord a) => a -> a -> Bool
bigger a b = a > b

plus2 = (+2)