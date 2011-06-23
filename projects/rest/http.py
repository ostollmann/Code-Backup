# -- file: http.py
# -- author: ost
# -- lang: python

import sys

class Request(object):

    def __init__(self):
        self.request_line = {
            'method': 'sds'
        }
        self.uri = None
        self.version = None

    def say(self):
        print('name: %s' % name)
    
    def __repr__(self):
        return 'blabla'
    
    @staticmethod
    def read(request):
        r = Request()
        request = request.splitlines()
        print('-------- Raw Request: --------\n %s \n------------------------------\n' % request)


    @staticmethod
    def readtxt(file):
        fsock = open(file, "r")
        
        Request.read(fsock.read())

        fsock.close()

if __name__ == '__main__':
    Request.readtxt(sys.argv[1])
    