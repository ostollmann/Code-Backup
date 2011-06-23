 -- file: utils.hs
 -- author: ost
 -- lang: haskell

 module Utils where


padStrL :: Int -> Char -> String -> String
padStrL = padStr False

padStrR :: Int -> Char -> String -> String
padStrR = padStr True


padStr :: Bool -> Int -> Char -> String -> String
padStr s l c ss 
      | length ss >= l  = ss
      | otherwise = padStr s l c (pad s c ss)
          where pad s' c' ss' = if s'
                                then (ss' ++ [c'])
                                else (c':ss')