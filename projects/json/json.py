import sys

class JValue(object):
   def __init__(self,value=None):
       self._value = value

class JString(JValue):
  def __repr__(self):
    return "\"" + self._value + "\""

class JNumber(JValue):
  def __repr__(self):
    return str(self._value)

class JBool(JValue):
  def __repr__(self):
    if self._value == True:
      return "true"
    elif self._value == False:
      return "false"

class JNull(JValue):
  def __repr__(self):
    return "null"

class JObject(JValue):
   def __init__(self):
       self.__objdict = {}

   def __getitem__(self, key):
       return self.__objdict[key]

   def __setitem__(self, key, jpair):
       self.__objdict[jpair.key()] = jpair.value()

   def __repr__(self):
       return 'JObject'

class JArray(JValue):
   def __init__(self):
       self._value = []

   def append(self,item):
       self._value.append(item)

   def __getitem__(self,key):
       return self._value[key]

   def __setitem__(self,key,value):
       self._value[key] = value

   def __repr__(self):
       return '[' + ', '.join(map(str, self.__arrlist)) + ']'


class JPair(JValue):
   def __init__(self,key=None,value=None):
       # key: JString
       self.key = key
       # value: JValue
       self.value = value

   def key(self):
       return self.key

   def value(self):
       return self.value

   def __repr__(self):
       return '%s: %s' % (self.key,self.value)


if __name__ == '__main__':
   arr = JArray()
   print(arr)
   obj = JObject()
   print(obj)
   pair = JPair("first_name", "last_name")
   print(pair)
