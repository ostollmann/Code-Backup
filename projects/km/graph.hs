-- file: graph.hs
-- author: ost
-- lang: haskell

-- cabal unpack array

import List
import Data.Maybe

import Utils

data Matrix a = Matrix [[a]]

ppMatrix (Matrix m) = unlines (map (concat . pad') m)
                        where pad' = map ((padStrL (calcLength m + 4) ' ') . show)
                              calcLength x = maximum $ map (length . show) (concat x)

testMatrix1 :: Matrix Int
testMatrix1 = Matrix [[1,2,3],[4,5,6],[7,8,9]]

testMatrix2 :: Matrix String
testMatrix2 = Matrix [["Jost", "Stollmann", "xx"], ["Fiona", "Stollmann", "xx"], ["Oliver", "Stollmann", "22"], ["Charley", "Stollmann", "20"], ["Alexia", "Stollmann", "18"],["Nicholas","Stollmann","16"],["Victor","Stollmann","14"]]

testMatrix3 :: Matrix Int
testMatrix3 = Matrix [[1,2,3,4,5,6],[10,20,30,40,50,60],[100,200,300,400,500,600],[1000,2000,3000,4000,5000,6000],[10000,20000,30000,40000,50000,60000],[100000,200000,300000,400000,500000,600000]]

testMatrix4 :: Matrix Bool
testMatrix4 = Matrix [[True, False, False, False, False, False, False],[True, False, True, False, True, True, False],[True, False, False, True, True, True, False],[True, False, True, False, True, True, False],[False, False, False, False, True, False, True],[True, False, False, True, True, False, True],[False, True, True, False, False, True, True],[True, False, False, False, False, False, False],[True, False, True, False, True, True, False],[True, False, False, True, True, True, False],[True, False, True, False, True, True, False],[False, False, False, False, True, False, True],[True, False, False, True, True, False, True],[False, True, True, False, False, True, True],[True, False, False, False, False, False, False],[True, False, True, False, True, True, False],[True, False, False, True, True, True, False],[True, False, True, False, True, True, False],[False, False, False, False, True, False, True],[True, False, False, True, True, False, True],[False, True, True, False, False, True, True],[True, False, True, False, True, True, False],[True, False, False, True, True, True, False],[True, False, True, False, True, True, False],[False, False, False, False, True, False, True],[True, False, False, True, True, False, True],[False, True, True, False, False, True, True],[True, False, False, False, False, False, False],[True, False, True, False, True, True, False],[True, False, False, True, True, True, False],[True, False, True, False, True, True, False],[False, False, False, False, True, False, True],[True, False, False, True, True, False, True],[False, True, True, False, False, True, True],[True, False, True, False, True, True, False],[True, False, False, True, True, True, False],[True, False, True, False, True, True, False],[False, False, False, False, True, False, True],[True, False, False, True, True, False, True],[False, True, True, False, False, True, True],[True, False, False, False, False, False, False],[True, False, True, False, True, True, False],[True, False, False, True, True, True, False],[True, False, True, False, True, True, False],[False, False, False, False, True, False, True],[True, False, False, True, True, False, True],[False, True, True, False, False, True, True]]