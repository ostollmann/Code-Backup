module JSON where

data JValue = JString String
            | JNumber Double
            | JObject [(String, JValue)]
            | JArray [JValue]
            | JTrue
            | JFalse
            | JNull

instance Show JValue where
   show (JString a) = show a
   show (JNumber a) = show a

   show (JArray []) = "[]"
   show (JArray a)  = "[" ++ showArr a ++ "]"
      where showArr (x:[]) = show x
            showArr (x:xs) = show x ++ ", " ++ showArr xs

   show (JObject []) = "{}"
   show (JObject a)  = "{" ++ showObj a ++ "}"
      where showObj ((k,v):[]) = show k ++ ": " ++ show v
            showObj ((k,v):xs) = show k ++ ": " ++ show v ++ ", " ++ showObj xs

   show (JTrue)  = "true"
   show (JFalse) = "false"
   show (JNull)  = "null"

--instance Read JValue where
--  readsPrec _ _ = [(JString "test", "test")]

testObj :: JValue
testObj = JObject [("first_name", JString "oliver"), ("last_name", JString "stollmann")]

testObj2 :: JValue
testObj2 = JObject [("name", JObject [("first_name", JString "Oliver"), ("last_name", JString "Stollmann")]), ("age", JNumber 22), ("info", JArray [JString "Zinistr. 7", JString "8004 Zuerich", JString "Schweiz"]), ("rand", JString "babybaby")]
