
type CardHolder   = String
type CardNumber   = String
type Address      = [String]

type CustomerID   = String

data BillingInfo = CreditCard CardNumber CardHolder Address
                 | CashOnDelivery
                 | Invoice CustomerID
                 deriving (Show)

customerID (Invoice customerID) = customerID
cardNumber (CreditCard cardNumber cardHolder address) = cardNumber  


sumLs (x:xs) = x + sumLs xs
sumLs []     = 0

data Tree a = Node a (Tree a) (Tree a)
            | Empty
            deriving(Show)

is2 :: Int -> Bool
is2 i = 
  case i of
    2    -> True
    _    -> False


--mean :: (Num b, Integral a) => [a] -> b
--mean :: [Double] -> 