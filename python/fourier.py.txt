from complex import Complex
from math import pi, sin, cos


class Fourier:

	def __init__(self):
		raise TypeError('This is a static class')
	
	@staticmethod
	def transform(x, inverse=False):
		if type(inverse) != bool: raise TypeError('inverse must be boolean')

		n = len(x)
		t = []

		if not inverse:
			for k in range(n):
				tmp = Complex(0,0)
				for n2 in range(n):
					tmp.re += ((x[n2].re*cos(2*pi*k*n2/n))+(x[n2].im*sin(2*pi*k*n2/n)))
					tmp.im += ((x[n2].im*cos(2*pi*k*n2/n))-(x[n2].re*sin(2*pi*k*n2/n)))
				t.append(tmp)

		else:
			for k in range(n):
				tmp = Complex(0,0)
				for n2 in range(n):
					tmp.re += ((x[n2].re*cos(2*pi*k*n2/n))-(x[n2].im*sin(2*pi*k*n2/n)))
					tmp.im += ((x[n2].re*sin(2*pi*k*n2/n))+(x[n2].im*cos(2*pi*k*n2/n)))								
				tmp.re /= n
				tmp.im /= n
				t.append(tmp)
		return t

if __name__ == '__main__':

	tx = []
	tx.append(Complex(1.001,-2))
	tx.append(Complex(-2.123,3.2))
	tx.append(Complex(3,-3.44))
	tx.append(Complex(42.1013,-34.7))
	tx.append(Complex(5.99,-1))

	print('\n############# TIME #############\n')

	for c in tx:
		print(c)

	print('\n############# FREQ #############\n')
	
	fx = Fourier.transform(tx)
	for c in fx:
		print(c)
	
	print('\n############# TIME #############\n')

	txr = Fourier.transform(fx, True)
	for c in txr:
		print(c)