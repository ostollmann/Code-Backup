import sys


# smallest is 7
# find smallest city
def smallest():
	m = 1
	min_pop = 100000000000000000000000
	for line in f:
		if m != 1:
			pop = line.split(',')[4]
			if pop != '':
				p = int(pop)
				if p < min_pop:
					min_pop = p
					print line
		m += 1

# max length is 28 (for pop > 50 000)
# find max length of city name
def max_length():
	f.seek(0)
	n = 1
	m = 1
	length = 0
	for line in f:
		if m != 1:
			pop = line.split(',')[4]
			if pop != '':
				p = int(pop)
				if p > 50000:

					city_name = line.split(',')[2]
					l = len(city_name)
					if l > length:
						length = l
						print '[' + str(len(city_name)) + ': ' + line
		m += 1

# number of cities with pop > 50 000 is 7181
# find cities with pop and pop > 50 000
def bigger_than():
	f.seek(0)
	
	n = 1
	m = 1
	for line in f:
		if m != 1:
			pop = line.split(',')[4]
			if pop != '':
				p = int(pop)
				if p > 50000:
					n += 1
					print '[' + str(n) + '] ' + pop
		m += 1

f = open(sys.argv[1], 'r')

#max_length()
bigger_than()

f.close()
