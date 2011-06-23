sac (x:xs) s r ls
    | x == s = sac xs s r ls
    | otherwise = sac xs s r $ ls ++ [x]

sac2 = sac2' []
    where sac2' acc [] = acc
          sac2' acc (':':xs) = acc ++ (sac2' [] xs)
          sac2' acc (x:xs)   = sac2' (acc ++ [x]) xs

splitStr2 x s = splitStr' x s "" []
splitStr' (':':xs) s tstr ls = tstr : splitStr' xs s "" ls
splitStr' (x:xs) s tstr ls   = splitStr' xs s (tstr ++ [x]) ls
splitStr' _ _ tstr ls        = ls ++ [tstr]

split c s = case rest of
            []    -> [chunk]
            _:rst -> chunk : split c rst
            where (chunk, rest) = break (== c) s

--splitPath2 = toTup split '/'
--             where toTup [x,y]


splitpath :: String -> (String, String)
splitpath "" = (".", ".")
splitpath "/" = ("/", "/")
splitpath p
    | last p == '/' = splitpath (init p)
    | not ('/' `elem` p) = (".", p)
    | head p == '/' && length (filter (== '/') p) == 1 = ("/", tail p)
    | otherwise = (\(base, dir) -> (reverse (tail dir), reverse base))
        (break (== '/') (reverse p))