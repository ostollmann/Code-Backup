import random, commands, sys

class DFinder():
	
	def __init__(self):
		words = []
		vocal = [97, 105, 101, 111, 117]
		c = 1
		for i in range(int(sys.argv[2])):
			word = ""		
			for j in range(int(sys.argv[1])):	
				
				r = random.randint(97,122)				
				if j == 0:
					while r in vocal:
						r = random.randint(97,122)
				if j == 1:
					while r not in vocal:
						r = random.randint(97,122)
				if j == 2:
					while r in vocal:
						r = random.randint(97,122)
				if j == 3:
					r = 97					
					#while r in vocal:
					#	r = random.randint(97,122)
				if j == 4:
					r = 108
					#while r in vocal:
					#	r = random.randint(97,122)
				if j == 5:
					r = 101					
					#while r not in [111]:
					#	r = random.randint(97,122)
				word = word + chr(r)			
			#print word
			#print "whois %s.com" % word
			o = commands.getstatusoutput("whois %s.com" % word)
			#print o
			if o[1][190:198] == "No match":
				print "found: %s.com" % word			


if __name__ == "__main__":
	dfinder = DFinder()
