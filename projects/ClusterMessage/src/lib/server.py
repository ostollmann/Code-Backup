import socket
import random
import string

class Server:

	#self.server_hostname
	#self.server_ip
	#self.server_port
	
	def __init__(self):

		# default hostname is computer hostname
		self.hostname = socket.gethostname()

		# default nodename if random alphanumeric string of length 10
		self.nodename = ''.join(random.choice(string.ascii_lowercase + string.digits) for i in range(10))
		
		# default IP is local IP
		self.ip = socket.gethostbyname(socket.gethostname())
		
		# default port is 60060
		self.port = 60060
		
		self.socket = None
		
	def bind(self):
		self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		self.socket.bind(self.ip, self.port)
		
	def listen(self):
		self.socket.listen(1)
		while 1:
			(clientsocket, address) = self.socket.accept()
		



	