---------------------------------
---------------------------------
------------- Node --------------
---------------------------------
---------------------------------
-- Author: OST ------------------
-- Date: 15.04.2010 -------------
-- Version: 1.0.0 ---------------
---------------------------------
---------------------------------

--module Node
--( Node(..)
--, nodeFromTuple
--, nodesEqual
--, routesEqual
--, distanceBetweenTwoNodes
--) where

module Node
( Node(..)
, nodeFromTuple
) where

data Node = Node { x    :: Int
                 , y    :: Int
                 } deriving (Show)

instance Eq Node where
  (Node ax ay) == (Node bx by) = ax == bx && ay == by

nodeFromTuple :: (Int, Int) -> Node
nodeFromTuple (x, y) = Node x y
