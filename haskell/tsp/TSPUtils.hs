-- file: TSPUtils.hs

module TSPUtils
       (
         distance
       ) where

import TSPTypes

-- distance :: City -> City -> Double
distance :: City -> City -> Double
distance (City _ ax ay) (City _ bx by) = sqrt (dx*dx + dy*dy)
         where dx = fromIntegral (bx - ax)
               dy = fromIntegral (by - ay)

acuteAngle :: City -> City -> City -> Double
--acuteAngle (City _ ax ay) (City _ bx by) (City _ cx cy) = acos $ abs $ d/s
acuteAngle (City _ ax ay) (City _ bx by) (City _ cx cy) = acos $ d/s
           where 
           d = fromIntegral $ dotProduct l1 l2
           s = (vectorLength l1) * (vectorLength l2)
           l1 = (bx-ax, by-ay, 0)
           l2 = (cx-bx, cy-by, 0)

crossProduct :: (Int, Int, Int) -> (Int, Int, Int) -> (Int, Int, Int)
crossProduct (a1, a2, a3) (b1, b2, b3) = (c1, c2, c3)
             where c1 = a2*b3 - a3*b2
                   c2 = a3*b1 - a1*b3
                   c3 = a1*b2 - a2*b1

dotProduct :: (Int, Int, Int) -> (Int, Int, Int) -> Int
dotProduct (a1, a2, a3) (b1, b2, b3) = a1*b1 + a2*b2 + a3*b3

vectorLength :: (Int, Int, Int) -> Double
vectorLength (a1, a2, a3) = sqrt ((sq a1) + (sq a2) + (sq a3))
             where sq = (\a -> fromIntegral $ a*a)

data Direction = LeftTurn | RightTurn | Straight
                 deriving (Show)

data P = P { x :: Double, y :: Double }
             deriving (Show)

turn :: P -> P -> P -> Direction
turn p1 p2 p3 | prod > 0  = LeftTurn
              | prod < 0  = RightTurn
              | otherwise = Straight
     where prod = ((x(p2) - x(p1)) * (y(p3) - y(p1))) - 
                  ((y(p2) - y(p1)) * (x(p3) - x(p1)))

directions :: [P] -> [Direction]
directions ps | length ps < 3 = []
directions (p1:p2:p3:ps) = turn p1 p2 p3 : directions (p2:p3:ps)
