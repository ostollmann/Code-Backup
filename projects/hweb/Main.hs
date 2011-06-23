import Control.Monad

-- Request: http://hackage.haskell.org/packages/archive/HTTP/4000.0.9/doc/html/Network-HTTP-Base.html#t:Request
-- Response: http://hackage.haskell.org/packages/archive/HTTP/4000.0.9/doc/html/Network-HTTP-Base.html#t:Response
import Network.HTTP
import Network

import System.IO



-- main = putStrLn "Not Implemented!"

main = withSocketsDo $ do
    sock <- listenOn (PortNumber 60000)
    forever $ acceptConnection sock

type RequestHandler = Request -> IO Response

type Port = Int
data IP = IP Int Int Int Int

instance Show IP where
    show (IP a b c d) = show a ++ "." ++ show b ++ "." ++ show c ++ "." ++ show d



