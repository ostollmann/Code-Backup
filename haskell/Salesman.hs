---------------------------------
---------------------------------
-- Travelling Salesman Problem --
---------------------------------
---------------------------------
-- Author: OST ------------------
-- Date: 15.04.2010 -------------
-- Version: 1.0.0 ---------------
---------------------------------
---------------------------------

module Salesman
(
) where

import Map
import Utils
import Node

import Data.List
import Data.Ord

-- <start_node> -> <end_node> -> <map> ->  (<route_length>, [<route_nodes>]) -> (<route_length>, [<route_nodes>])
bruteSolveWithStartAndEnd :: Node -> Node -> [Node] -> [(Float, [Node])] -> [(Float, [Node])]
bruteSolveWithStartAndEnd st en mp [] = bruteSolveWithStartAndEnd st en mp [(0, [st])]
bruteSolveWithStartAndEnd st en mp r
           | length mp - 1 == length (snd ( head r)) = sortBy (comparing fst) $ map (\x -> (fst x + (distanceBetweenTwoNodes en $ last $ snd x), snd x ++ [en])) r
           | otherwise = bruteSolveWithStartAndEnd st en mp $ nextStepsForMany r $ filter (/= en) mp

bruteSolve :: [Node] -> [(Float, [Node])] -> [(Float, [Node])]
bruteSolve mp [] = bruteSolve mp $ map (\l -> (0, [l])) mp
bruteSolve mp r
           | length mp == length(snd (head r)) = sortBy (comparing fst) $ r
           | otherwise = bruteSolve mp $ nextStepsForMany r mp

nextSteps :: (Float, [Node]) -> [Node] -> [(Float, [Node])]
nextSteps r n = map (\l -> ((fst r) + (distanceBetweenTwoNodes l $ last $ snd r), snd r ++ [l])) [ nn | nn <- n, nn `notElem` (snd r)]

nextStepsForMany :: [(Float, [Node])] -> [Node] -> [(Float, [Node])]
nextStepsForMany ar n = concat $ map (\l -> nextSteps l n) ar