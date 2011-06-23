-- project: MM
-- author: ost
-- date: 11-06-10
-- lang: haskell

module Types ( UID
             , Name(..)
             , Address
             , Entity(..)
             , Money
             , Transaction
             , Month(..)
             , Day(..)
             , Date
             , Time
             , DateTime
             , Currency(..)
             , getEntityUID
             , getEntityName
             , getEntityAddress
             , getDate
             , getTime
             ) where

-- UID:
--------------------------------------------------------------------------------------
type UID = Int

-- Name:
--------------------------------------------------------------------------------------
data Name = CompanyName String
          | PersonName (String, String)
          deriving (Show)

-- Address:
--------------------------------------------------------------------------------------
data Address = Address { streetName   :: String
                       , streetNumber :: Int
                       , postCode     :: Int
                       , city         :: String
                       , country      :: String
                       } deriving (Show)

-- Entity:
--------------------------------------------------------------------------------------
data Entity = Individual UID Name Address
            | Company UID Name Address
            | Bank UID Name Address
            deriving (Show)

getEntityUID :: Entity -> UID
getEntityUID (Individual uid _ _) = uid
getEntityUID (Company    uid _ _) = uid
getEntityUID (Bank       uid _ _) = uid

getEntityName :: Entity -> Name
getEntityName (Individual _ n _) = n
getEntityName (Company    _ n _) = n
getEntityName (Bank       _ n _) = n

getEntityAddress :: Entity -> Address
getEntityAddress (Individual _ _ a) = a
getEntityAddress (Company    _ _ a) = a
getEntityAddress (Bank       _ _ a) = a

-- Money:
--------------------------------------------------------------------------------------
data Money = Money { amount   :: Double
                   , currency :: Currency
                   } deriving (Show)

-- Transaction:
--------------------------------------------------------------------------------------
data Transaction = Transaction { uid       :: UID
                               , datetime  :: DateTime
                               , money     :: Money
                               , sender    :: Entity
                               , recipient :: Entity    
                               } deriving (Show)

-- Time:
--------------------------------------------------------------------------------------
type Year = Int
type Hour = Int
type Minute = Int
type Second = Int

data Month = Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec
           deriving (Show)

data Day = Mon | Tue | Wed | Thu | Fri | Sat | Sun
           deriving (Show)

data Date = Date { year :: Year, month  :: Month , day    :: Day    } deriving (Show)
data Time = Time { hour :: Hour, minute :: Minute, second :: Second } deriving (Show)
data DateTime = DateTime (Date,Time) deriving (Show)

getDate :: DateTime -> Date
getDate (DateTime dt) = fst dt

getTime :: DateTime -> Time
getTime (DateTime dt) = snd dt

-- Currency:
--------------------------------------------------------------------------------------
data Currency = AUD -- Australian Dollar
              | BRL -- Brazilian Real
              | GBP -- British Pound
              | CAD -- Canadian Dollar
              | CNY -- Chinese Yuan
              | DKK -- Danish Krone
              | EUR -- Euro
              | HKD -- Hong Kong Dollar
              | HUF -- Hungarian Forint
              | INR -- Indian Rupee
              | IDR -- Indonesian Rupiah
              | JPY -- Japanese Yes
              | MXN -- Mexican Peso
              | NZD -- New Zealand Dollar
              | NOK -- Norwegian Krone
              | PLN -- Polish Zloty
              | RUB -- Russian Ruble
              | SAR -- Saudi Riyal
              | SGD -- Singapore Dollar
              | ZAR -- South African Rand
              | SEK -- Swedish Krona
              | CHF -- Swiss Franc
              | TWD -- Taiwan Dollar
              | THB -- Thai Baht
              | TRY -- Turkish Lira
              | USD -- United States Dollar
              deriving (Show)

--------------------------------------------------------------------------------------
