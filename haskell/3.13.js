mean :: Fractional a => [Rational] -> a
mean [] = 0
mean x  = (/) (fromRational $ sum x) (fromIntegral $ length x)
