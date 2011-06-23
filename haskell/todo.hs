
import Data.Maybe
import Data.List
import System.IO


-- Serialization:
--------------------------------------------------------------------------------------
defaultFileName :: String
defaultFileName = "todo.d"

dWriteToDoItems = writeToDoItems defaultFileName
dReadToDoItems = readToDoItems defaultFileName

writeToDoItems :: String -> ToDoItems -> IO ()
writeToDoItems f ts = do
        writeFile f (unlines (map show ts))

readToDoItems :: String -> IO ToDoItems
readToDoItems f = do
        str <- readFile f
        return (map read (lines str))

-- Pretty Print:
--------------------------------------------------------------------------------------

printItems :: ToDoItems -> IO ()
printItems ts = (putStrLn . unlines) (map printToDoItem ts)

printToDoItem :: ToDoItem -> String
--printToDoItem i = "-- [" ++ (printPrio (prio i)) ++ "] " ++ (name i) ++ "\n" ++ "Date/Time: " ++ (printMaybeDateTime (date i) (time i)) ++ "\n" ++ "Description: \n" ++ (printMaybe (desc i))
printToDoItem i = "[" ++ (done' i) ++ "] "++ (padCharR 7 ' ' ("|" ++ (printPrio (prio i)) ++ "|")) ++ " \"" ++ (name i) ++ "\" (" ++ (printMaybeDateTime (date i) (time i)) ++ ")"
        where done' i = if (done i)
                        then "x"
                        else " "

printMaybe :: (Show a) => Maybe a -> String
printMaybe Nothing = ""
printMaybe (Just a) = show a 


-- ToDo:
--------------------------------------------------------------------------------------
data Priority = VeryHigh | High | Normal | Low | VeryLow | None deriving (Show, Read)

printPrio :: Priority -> String
printPrio VeryHigh = "*****"
printPrio High = "****"
printPrio Normal = "***"
printPrio Low = "**"
printPrio VeryLow = "*"

data ToDoItem = ToDoItem { done :: Bool
                         , prio :: Priority
                         , date :: Maybe Date 
                         , time :: Maybe Time
                         , name :: String
                         , desc :: Maybe String
                         } deriving (Show, Read)

type ToDoItems = [ToDoItem]

testItems :: ToDoItems
testItems = [ToDoItem False High (Just (Date 2011 May 1)) (Just (Time 15 30 0)) "Bring calendar to Nicholas" (Just "Must be reformated before finishing it."), ToDoItem True VeryHigh (Just (Date 2011 May 23)) (Just (Time 15 0 0)) "Upload new design files to Dropbox" Nothing, ToDoItem False Low (Just (Date 2011 May 12)) (Just (Time 11 10 0)) "Get the car fixed" (Just "Call 0001-912-3243-433")]

printMaybeDateTime :: Maybe Date -> Maybe Time -> String
printMaybeDateTime Nothing Nothing = "<none>"
printMaybeDateTime (Just d) Nothing = (show (year d)) ++ "-" ++ (show (month d)) ++ "-" ++ (padZeroToTwo (show (day d)))
printMaybeDateTime Nothing (Just t) = (padZeroToTwo (show (hour t))) ++ ":" ++ (padZeroToTwo (show (minute t))) ++ ":" ++ (padZeroToTwo (show (second t)))
printMaybeDateTime (Just d) (Just t) = (printMaybeDateTime (Just d) Nothing) ++ " " ++ (printMaybeDateTime Nothing (Just t))

testTime = (Just (Time 15 30 0))
testDate = (Just (Date 2011 May 1))

padCharL :: Int -> Char -> String -> String
padCharL l c s
              | l <= length s = s
              | otherwise = padCharL l c (c:s)

padCharR :: Int -> Char -> String -> String
padCharR l c s
              | l <= length s = s
              | otherwise = padCharR l c (s ++ [c])

padZeroToTwo :: String -> String
padZeroToTwo s = padCharL 2 '0' s

-- Time:
--------------------------------------------------------------------------------------
type Year = Int
type Day = Int
type Hour = Int
type Minute = Int
type Second = Int

data Month = Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec
           deriving (Show, Read)

data WeekDay = Mon | Tue | Wed | Thu | Fri | Sat | Sun
           deriving (Show, Read)

data Date = Date { year :: Year, month  :: Month , day    :: Day    }
            deriving (Show, Read)
data Time = Time { hour :: Hour, minute :: Minute, second :: Second }
            deriving (Show, Read)

data DateTime = DateTime (Date,Time)
                deriving (Show, Read)

getDate :: DateTime -> Date
getDate (DateTime dt) = fst dt

getTime :: DateTime -> Time
getTime (DateTime dt) = snd dt
