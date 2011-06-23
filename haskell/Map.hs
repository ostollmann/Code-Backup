---------------------------------
---------------------------------
------------- Map ---------------
---------------------------------
---------------------------------
-- Author: OST ------------------
-- Date: 15.04.2010 -------------
-- Version: 1.0.0 ---------------
---------------------------------
---------------------------------

module Map
( Map(..)
, createRandMap
) where

import Node
import Utils

data Map = Map { width  :: Int
               , height :: Int
               , nodes  :: [Node]
               } deriving (Show)

-- <width> -> <height> -> <num_of_nodes> -> <rand_seed> -> <map>
createRandMap :: Int -> Int -> Int -> Int -> Map
createRandMap w h nu s = Map w h $ map nodeFromTuple $ zip (take nu $ Utils.randomIntsInRange 0 (h-1) $ s*2) (take nu $ Utils.randomIntsInRange 0 (w-1) $ s*3) 
