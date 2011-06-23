module Parse where

objectStartExpr = '{'
objectEndExpr   = '}'
arrayStartExpr  = '['
arrayEndExpr    = ']'
elementDelim    = ','
pairDelim       = ':'
stringStartExpr = '"'
stringEndExpr   = '"'


testJSONstr = "{\"name\": {\"first_name\": \"Oliver\", \"last_name\": \"Stollmann\"}, \"age\": 22.0, \"info\": [\"Zinistr. 7\", \"8004 Zuerich\", \"Schweiz\"], \"rand\": \"babybaby\"}"

parse [] = show "EOF"
parse (x:xs)
    | x == objectStartExpr = show "[OBJ]"  ++ show (takeWhile ())
    | x == objectEndExpr   = show "[/OBJ]" ++ parse xs
    | x == arrayStartExpr  = show "[ARR]"  ++ parse xs
    | x == arrayEndExpr    = show "[/ARR]" ++ parse xs
    | x == elementDelim    = show "[E]"    ++ parse xs
    | x == pairDelim       = show "[P]"    ++ parse xs
    | x == stringStartExpr = show "[S]"    ++ parse xs
    | x == stringEndExpr   = show "[/S]"   ++ parse xs
    | otherwise            = show x        ++ parse xs

--parse [] = show "EOF"
--parse (x:xs) = case x of
--    objectStartExpr -> show "obj-start"
--    objectEndExpr   -> show "obj-end"
--    arrayStartExpr  -> show "arr-start"
--    arrayEndExpr    -> show "arr-end"
--    elementDelim    -> show "delim"
--    pairDelim       -> show "pair"
--    stringStartExpr -> show "string-start"
--    stringEndExpr   -> show "string-end" 
--    ++ parse xs
 