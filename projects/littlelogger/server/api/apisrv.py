import cw as web

urls = (
    '/log/', 'log'
)

apisrv = web.application(urls, globals())
class err405: method='POST'

class log:
    def POST(self):
        data = web.input()
        return data


   
if __name__ == '__main__':
    apisrv.run()
