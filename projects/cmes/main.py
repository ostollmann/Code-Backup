import cmd
import sys

#from cmes.lib import Message
import cmes.lib.Message

class CMes(cmd.Cmd):

	def __init__(self):
		cmd.Cmd.__init__(self)
		pass

	def preloop(self):
		# before cmd start
		cmd.Cmd.preloop(self)
		
	def postloop(self):
		# after cmd start
		cmd.Cmd.postloop(self)

	def do_run(self, args):
		this.message = Message()
		
		print('Hello, World!')

	def do_test(self, args):
		this.message.hello()
		print('Hello, Test!')


	def do_exit(self, args):
		print('Exiting...')
		sys.exit(1)


if __name__ == '__main__':
	try:
		CMes().cmdloop()
	except KeyboardInterrupt:
		print('\nExiting...')
