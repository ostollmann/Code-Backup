import sys
import random

class Calc:
	@staticmethod
	def divide(a, b):
		pass

	@staticmethod
	def integer_base10(i):
		if i == 0: return [0]
		b = []
		while i != 0:
			m = i % 10
			b.append(m)
			i = (i-m)//10
		b.reverse()
		return b

	@staticmethod
	def test_integer_base10(n=10000, p=False):
		for i in range(n):
			r = random.randint(0, 1000000000000000000000)
			ilist = Calc.integer_base10(r)
			slist = list(str(r))
			for j in range(len(slist)):
				slist[j] = int(slist[j])
			if p: print('%s = %s' % (ilist, slist))
			if ilist != slist:
				print('ERROR: Test of integer2base() completed failed!')
				break
		print('Test of integer2base() completed successfully!')

	@staticmethod
	def base10_integer(b):
		b.reverse()
		p = 0
		i = 0
		for j in b:
			i += j*(10**p)
			p += 1
		return i
	
	@staticmethod
	def test_base10_integer(n=10000, p=False):
		for i in range(n):
			r = random.randint(0, 1000000000000000000000)
			t = Calc.base10_integer(Calc.integer_base10(r))
			if p: print('%s = %s' % (r, t))
			if t != r:
				print('ERROR: Test of base102integer() completed failed!')
				break
		print('Test of base102integer() completed successfully!')
	
	@staticmethod
	def test_all(n=10000, p=False):
		Calc.test_integer_base10(n, p)
		Calc.test_base10_integer(n, p)


if __name__ == '__main__':
	Calc.test_all(n=10000)