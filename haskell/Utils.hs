---------------------------------
---------------------------------
------------- Utils -------------
---------------------------------
---------------------------------
-- Author: OST ------------------
-- Date: 15.04.2010 -------------
-- Version: 1.0.0 ---------------
---------------------------------
---------------------------------

module Utils
( distanceBetweenTwoPoints
, tf
, randomIntsInRange
, routesEqual
, distanceBetweenTwoNodes
) where

import Node
import System.Random

tf x = realToFrac x

distanceBetweenTwoPoints ::(Floating a) => (a, a) -> (a, a) -> a
distanceBetweenTwoPoints (x1,y1) (x2,y2) = (((x2-x1)^2 + (y2-y1)^2)**(1/2))

randomIntsInRange :: Int -> Int -> Int -> [Int]
randomIntsInRange s e sd = randomRs (s, e) (mkStdGen sd) :: [Int]

routesEqual :: [Node] -> [Node] -> Bool
routesEqual [] [] = True
routesEqual _ [] = False
routesEqual [] _ = False
routesEqual (c:cx) (e:ex)
            | (length ([c] ++ cx) /= length ([e] ++ ex)) = False            
            | c /= e = False
            | otherwise = routesEqual cx ex

distanceBetweenTwoNodes :: Node -> Node -> Float
distanceBetweenTwoNodes a b = distanceBetweenTwoPoints (tf $ Node.x a, tf $ Node.y a) (tf $ Node.x b, tf $ Node.y b)
