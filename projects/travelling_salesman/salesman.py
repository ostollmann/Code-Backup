import sys
from random import randint
from math import factorial
from map import Map

class Salesman:
	def __init__(self, smap):
		self.map = smap
	
	def bruteSolve(self, startid, endid):
		print('*** Brute Solver - Start Node: %s, End Node: %s ***' %(startid, endid))
		solutions = []
		done = False
		sid = 0
		skipped = 0
		nums = 0
		while not done:
			sdistance = 0
			sroute = []
			solution = {}
			sdone = False
			while len(sroute) != self.map.num_of_nodes:
				nid = randint(1,self.map.num_of_nodes)
				if nid not in sroute:
					# sdistance += Node.distance()
					sroute.append(nid)
				
			solution['distance'] = sdistance
			solution['route'] = sroute
			if solution not in solutions and sroute[0] == startid and sroute[-1] == endid:
				sid += 1
				print('Found new solution (%s): %s' % (sid, solution))
				nums += 1
				solutions.append(solution)
				skipped = 0
			else:
				skipped +=1
			
			if skipped > 1000:
				print('skipped the last 20 solutions...quiting!')
				done = True
		
		print('Found %s solutions!' % nums)


	def info(self):
		print('Number of Nodes: %s' % self.map.num_of_nodes)
		print('Nodes:')
		for node in self.map.nodes:
			print(node)
		print('Map:')
		print(self.map)

if __name__ == '__main__':
	m = Map(20,20)
	m.addrandnodes(int(sys.argv[1]))
	sm = Salesman(m)
	sm.info()
	
	startx = int(sys.argv[2])
	endx = int(sys.argv[3])
	if startx > m.num_of_nodes:
		raise AttributeError('Start Node does not exist!')
	if endx > m.num_of_nodes:
		raise AttributeError('End Node does not exist!')
	
	sm.bruteSolve(int(sys.argv[2]), int(sys.argv[3]))