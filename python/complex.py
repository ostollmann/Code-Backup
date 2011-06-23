import math

class Complex:
	def __init__(self, re=0, im=0):
		self.img_sign = 'i'

		self.re = re
		self.im = im

	def r(self):
		return ((self.re**2)+(self.im**2))**(1/2)

	def phi(self):
		if self.re > 0: return math.atan(self.im/self.re)
		elif self.re < 0 and self.im >= 0: return math.atan(self.im/self.re) + math.pi
		elif self.re < 0 and self.im < 0: return math.atan(self.im/self.re) - math.pi
		elif self.re == 0 and self.im > 0: return math.pi/2
		elif self.re == 0 and self.im < 0: return -1*math.pi/2
		elif self.re == 0 and self.im == 0: raise ValueError('Arg(0+0i) is undefined')
	
	def arg(self):
		return self.phi()

	def abs(self):
		return self.r()
	
	def conj(self):
		self.im *= -1

	def __repr__(self):
		sign = '+' if self.im >=0 else '' 
		return '%s%s%s%s' % (self.re, sign, self.im, self.img_sign)