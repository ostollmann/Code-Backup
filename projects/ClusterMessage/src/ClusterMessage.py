import sys
import cmd

#from Lib import Message

from lib.message import Message
from lib.server import Server

class ClusterMessage(cmd.Cmd):
	
	def __init__(self):
		cmd.Cmd.__init__(self)
		pass
	
	def preloop(self):
		# before cmd start
		cmd.Cmd.preloop(self)
		
	def postloop(self):
		# after cmd start
		cmd.Cmd.postloop(self)
	
	def do_exit(self, args):
		print('Exiting...')
		sys.exit(0)
	
	def do_run(self, args):
		print('running')
		server = Server()
		print('Hostname: %s' % server.hostname)
		print('Nodename: %s' % server.nodename)
		print('IP: %s' % server.ip)
	
	def do_send(self, args):
		print(args)
		
		
if __name__ == '__main__':
	try:
		ClusterMessage().cmdloop()
	except KeyboardInterrupt:
		print('\nExiting...')
		exit(0)