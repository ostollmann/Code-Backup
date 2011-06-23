import queue
import http.server

class Server(http.server.BaseHTTPRequestHandler):     
    def __init__(self):
        http.server.BaseHTTPRequestHandler.__init__(self)
        print('[REQUEST] Client: %s, Command: %s' % (self.client_address, self.command))
#    def handle(self):
#        http.server.BaseHTTPRequestHandler.handle(self)
#        print('[REQUEST] Client: %s, Command: %s' % (self.client_address, self.command))
#
#    def run(self):
        
        