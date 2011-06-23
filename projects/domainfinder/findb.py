import random, commands, sys

class DFinder():
	
	def __init__(self, a):
		print 'starting'
		while 1:
			word = ""		

			for i in range(len(a)):	
				if not a[i].isdigit():
					if a[i] == "-":
						word += self.r(None, None, True)
					else:
						word += self.r(None, a[i])
				elif a[i].isdigit():
					word += self.r(int(a[i]))
			o = commands.getstatusoutput("whois %s.com" % word)
			if o[1][190:198] == "No match":
				print "found: %s.com" % word			
	
	def r(self, v, char=None, wild=False):
		vocal = [97, 105, 101, 111, 117]
		r = random.randint(97, 122)

		if wild:
			pass
		elif char is not None:
			r = ord(char)
		elif v == 1:
			while r not in vocal:
				r = random.randint(97, 122)
		elif v == 0:
			while r in vocal:
				r = random.randint(97, 122)		
		r = chr(r)
		return r

if __name__ == "__main__":
	dfinder = DFinder(sys.argv[1:])
