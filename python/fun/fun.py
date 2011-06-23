# -- file: fun.py
# -- author: ost
# -- lang: py

class Person(object):
    def __init__(self, first_name=None, last_name=None, age=None):
        self._first_name = first_name
        self._last_name = last_name
        self._age = age
    
    def __repr__(self):
        return "%s %s (age=%s)" % (self._first_name, self._last_name, self._age)

    def say_hello(self):
        return "Hello, %s!" % self._first_name

    def __call__(self, mode):
        if mode == 1:
            print(self)
        elif mode == 2:
            print(self.say_hello())

def makebold(fn):
    def wrapped():
        return "<b>" + fn() + "</b>"
    return wrapped

def makeitalic(fn):
    def wrapped():
        return "<i>" + fn() + "</i>"
    return wrapped

@makebold
def hello():
    return "Hello!"
    # return "Hello, %s" % name


def mod(method):
    return method + "111"

@mod
def modMe():
    return "asds"


if __name__ == "__main__":
    print(modMe())
#    print(hello("Oliver"))