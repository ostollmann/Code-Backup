##################################
# 010000100110100101101110011000 #
# 010111001001111001010001100111 #
# 010101101110                   #
#                                #
# Simple demonstration of binary #
# addition and substraction, as  #
# well as integer to binary (and #
# vice-versa) conversion         #
#                                #  
# Author: Oliver Stollmann       #
#                                #
# Usage:                         #
# - ex: binary.py 75 50          #
# - ex: binary.py 2323232323 3   #
##################################

import sys

class Binary():

	# binaries are actually list of
	# ints in this class (not actual
	# python bins)
	
	@staticmethod
	def int2bin(i):
		bits = []
		while i != 0:
			if (i % 2 == 1):
				bits.append(1)
				i = (i-1)/2
			else:
				bits.append(0)
				i = i/2
		bits.reverse()
		return bits
	
	@staticmethod
	def bin2int(b):
		l = len(b)
		i = 0
		for n in range(l):
			i += int(b[l-1-n])*2**n
		return i
	
	@staticmethod
	def add(a, b):
		la = len(a)
		lb = len(b)
		
		# pad shorter binary list if
		# necessary
		if la < lb:
			for i in range(lb-la):
				a.insert(0, 0)
		if lb < la:
			for i in range(la-lb):
				b.insert(0, 0)
		
		# addition
		a.reverse()
		b.reverse()
		bsum = []
		c = [0]
		for i in range(la):
			s = a[i] + b[i] + c[i]
			if(s == 0):
				bsum.append(0)
				c.append(0)
			elif(s == 1):
				bsum.append(1)
				c.append(0)
			elif(s == 2):
				bsum.append(0)
				c.append(1)
			elif(s == 3):
				bsum.append(1)
				c.append(1)
		
		if c[len(c)-1] == 1:
			bsum.append(1)

		bsum.reverse()

		while bsum[0] == 0:
			bsum.pop(0)
				
		a.reverse()
		b.reverse()

		return bsum
	
	@staticmethod
	def sub(a,b):
		if Binary.bin2int(a) == Binary.bin2int(b):
		  return [0]

		# this function only works if the first 
		# number is bigger than the second 
		# number (ie. no negative results)
		if Binary.bin2int(b) > Binary.bin2int(a):
			Binary.err('1. num < 2. num!')
			return -1
		
		# pad shorter bin list
		for i in range(len(a)-len(b)):
			b.insert(0, 0)
		
		# substraction
		ab = [a,b]
		res = []
		for i in range(len(a)):
			s = a[i]-b[i]
			if s == 1: res.append(1)
			if s == 0: res.append(0)
			if s == -1:
				res[i-1] = 0
				res.append(1)
		while res[0] == 0:
			res.pop(0)
					
		a.reverse()
		b.reverse()
		return res

	@staticmethod
	def err(s):
		print('')
		print('##ERROR##')
		print(s)
		print('#########')
		print('')

if __name__ == '__main__':
	ia = int(sys.argv[1])
	ib = int(sys.argv[2])
	print('iA     =  %s' % ia)
	print('iB     =  %s' % ib)
	a = Binary.int2bin(ia)
	b = Binary.int2bin(ib)
	print('')
	print('0bA    =  %s' % a)
	print('0bB    =  %s' % b)
	bsum = Binary.add(a, b)
	isum = Binary.bin2int(bsum)
	print('')
	print('iSUM   =  %s' % isum)
	print('0bSUM  =  %s' % bsum)
	bsub = Binary.sub(a, b)
	isub = Binary.bin2int(bsub)
	print('')
	print('iSUB   =  %s' % isub)
	print('0bSUB  =  %s' % bsub)