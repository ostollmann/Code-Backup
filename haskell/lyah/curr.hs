import Data.Char

main = do
    line <- fmap (reverse . map toUpper) getLine
    putStrLn $ "line: \"" ++ line ++ "\""