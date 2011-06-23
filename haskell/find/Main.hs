module Main (main) where

import System (getArgs)
import System.Directory (getModificationTime)
import Control.Concurrent (threadDelay)

main = do
    forever do

tail f st tl = do
    threadDelay st
    let tc = getModificationTime forever
    if tc == tl
    then printl 
