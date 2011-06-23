-- file: TSPTypes.hs

module TSPTypes
       (
         City(..)
       , Route(..)
       ) where


-- City
data City = City {
              cityID :: Int
            , cityX  :: Int
            , cityY  :: Int
            } deriving (Show)

instance Eq City where
  (==) (City _ ax ay) (City _ bx by) = ax == bx && ay == by
  (/=) ca cb = not $ (==) ca cb

-- Route
data Route = Route {
               routeID :: Int
             , routeCities :: [City]
             , routeLength :: Double
             } deriving (Show)

instance Eq Route where
  (==) (Route _ ac al) (Route _ bc bl) = al == bl && ac == bc
  (/=) ra rb = not $ (==) ra rb

