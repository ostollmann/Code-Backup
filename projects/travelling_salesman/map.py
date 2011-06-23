from random import randint
from operator import attrgetter
import sys

class Node:
	def __init__(self, id, x, y):
		self.id = id
		self.x = x
		self.y = y	

	def __repr__(self):
		return 'Node %s (x=%s, y=%s)' %(self.id, self.x, self.y)


class Map:
	def __init__(self, width=100, height=100):
		self.num_of_nodes = 0
		if width == 0 or height == 0:
			raise AttributeError('Cannot create zero map!')

		self.width = width
		self.height = height
		self.nodes = []

	def __repr__(self):
		return self.draw()

	def already_there(self, x, y):
		for n in self.nodes:
			if n.x == x and n.y == y:
				return True
		return False

	def map_full(self):
		for x in range(self.width):
			for y in range(self.height):
				if not self.already_there(x,y):
					return False
		return True
	
	def addrandnodes(self, num):
		print('Adding %s random nodes...' % num)
		i = -1
		while i < num-1:
			if self.map_full():
				print('WARNING: Map already full! Not adding any more nodes!')
				break
			x = randint(0, self.width-1)
			y = randint(0, self.height-1)
			if not self.already_there(x,y):
				self.num_of_nodes += 1
				node = Node(self.num_of_nodes, x, y)
				self.nodes.append(node)
				i +=1
	
	def addnode(self, x, y):
		if not self.already_there(x,y):
			self.num_of_nodes += 1
			if x > self.width-1 or x < 0 or y > self.height-1 or y < 0:
				raise AttributeError('Node outside of map')
			self.nodes.append(Node(self.num_of_nodes, x, y))
		else:
			raise AttributeError('Node already exists')

	def distances(self):
		for nodea in self.nodes:
			for nodeb in self.nodes:
				print('Distance between [%s] and [%s]: %s' % (nodea, nodeb, Map.distance(nodea, nodeb)))

	def draw(self):
		import math
		nodes = sorted(self.nodes, key=attrgetter('y', 'x'))
		i = iter(nodes)
		mapstr = '%s' % str('').ljust(int(math.log10(self.height)) + 2)
		empty = False
		try:
			cnode = next(i)
		except StopIteration:
			empty = True
		for x in range(self.width):
			mapstr += ' %s' % str(x).zfill(int(math.log10(self.width)) + 1)

		for y in range(self.height):
			mapstr += '\n%s' % str(y).zfill(int(math.log10(self.width)) + 1)
			for x in range(self.width):
				if not empty:
					s = 0
					while cnode.y == y and cnode.x == x:
						if s == 0:
							mapstr += '%sx' % str('').ljust(int(math.log10(self.width)) + 1)
						try:
							cnode = next(i)
							s += 1
						except StopIteration:
							break
					else:
						if s == 0:
							mapstr += '%s' % str('').ljust(int(math.log10(self.width)) + 2)
		return mapstr

	@staticmethod
	def distance(a,b):
		return (((a.x - b.x)**2)+((a.y - b.y)**2))**(0.5)

					
if __name__ == '__main__':
	map1 = Map(10,10)

	map1.addnode(1,1)
	map1.addnode(1,1)
	map1.addnode(1,5)
	map1.addnode(9,9)
	print('Number of Nodes: %s' % map1.num_of_nodes)
	print('Nodes:')
	for node in map1.nodes:
		print(node)
	print('Distances:')
	map1.distances()
	print('Map:')
	map1.draw()

