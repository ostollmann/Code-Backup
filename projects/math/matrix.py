class Matrix:
	def __init__(self, M, rs, cs):
		self.M = M
		self.r = rs
		self.c = cs
	
	def __getitem__(self, key):
		return self.M[key]

	def __setitem__(self, key, value):
		print(value)
		if type(value) != list:
			raise TypeError('Row must be of type list!')
		self.M[key] = value
	
	def clone(self):
		C = []
		for r in range(self.r):
			C.append([])
			for c in range(self.c):
				C[r].append(self[r][c])
		return Matrix.M(*C)


	def add(self, other): return Matrix.Addition(self, other)
	def __add__(self, other): return self.add(other)
	
	def substract(self, other): return Matrix.Substraction(self, other)
	def __sub__(self, other): return self.substract(other)
	
	def multiply(self, other): return Matrix.Multiplication(self, other)
	def __mul__(self, other): return self.multiply(other)

	def transpose(self): return Matrix.Transpose(self)
	def __invert__(self): return self.transpose()

	def invert(self): return Matrix.Invert(self)
	def __neg__(self): return self.invert()
	
	def det(self): return Matrix.Determinant(self)

	@staticmethod
	def Addition(A, B):
		if A.r != B.r or A.c != B.c:
			raise TypeError('Matrice sizes not appropriate for addition!')
		MA = []
		for r in range(A.r):
			MA.append([])
			for c in range(A.c):
				MA[r].append(A[r][c] + B[r][c])
		return Matrix.M(*MA)

	@staticmethod
	def Substraction(A, B):
		if A.r != B.r or A.c != B.c:
			raise TypeError('Matrice sizes not appropriate for addition!')
		MA = []
		for r in range(A.r):
			MA.append([])
			for c in range(A.c):
				MA[r].append(A[r][c] - B[r][c])
		return Matrix.M(*MA)

	@staticmethod
	def Multiplication(A, B):
		if A.r != B.c or A.c != B.r:
			raise TypeError('Matrice sizes not appropriate for multiplication!')
		sl = A.c
		MM = []
		for r in range(A.r):
			MM.append([])
			for c in range(B.c):
				sum = 0
				for i in range(sl):
					sum += A[r][i] * B[i][c]

				MM[r].append(sum)
		return Matrix.M(*MM)

	@staticmethod
	def Determinant(M):
		if M.r != M.c:
			raise TypeError('Matrix is not square!')
		if M.r == 2:
			return Matrix.Determinant2x2(M)
		elif M.r == 3:
			return Matrix.Determinant3x3(M)	
		else:
			L,U = Matrix.LU(M)
			det = 0
			for i in range(U.r):
				det *= U[i][i]
			return det

	@staticmethod
	def Determinant2x2(M):
		print('Determinant2x2')
		if M.r != 2 or M.c != 2:
			raise TypeError('Matrix is not 2x2!')
		return M[0][0]*M[1][1] - M[0][1]*M[1][0]

	@staticmethod
	def Determinant3x3(M):
		print('Determinant3x3')
		if M.r != 3 or M.c != 3:
			raise TypeError('Matrix is not 3x3!')
		return M[0][0]*M[1][1]*M[2][2] + M[0][1]*M[1][2]*M[2][0] + M[0][2]*M[1][0]*M[2][1] - M[0][0]*M[1][2]*M[2][1] - M[0][1]*M[1][0]*M[2][2] - M[0][2]*M[1][1]*M[2][0]	

	@staticmethod
	def Transpose(M):
		MT = []
		for r in range(M.c):
			MT.append([])
			for c in range(M.r):
				MT[r].append(M[c][r])
		return Matrix.M(*MT)

	@staticmethod
	def Gauss(M):
		M = M.clone()
		M = Matrix.SoftTriangulate(M)
		for c in range(M.c):
			for r in range(M.r):
				pass
	#			print(M[r][c])
		raise NotImplementedError()

	
	@staticmethod
	def SoftTriangulate(M):
		nM = Matrix.Ones(M.r, M.c)
		print('========== nM ==========')
		print(nM)

		print('========== M ===========')
		print(M)

		# for c in range(M.c):
		# 	for r in range(M.r):
		# 		if M.c[r][c] == 0:
		raise NotImplementedError()					



	@staticmethod
	def Invert(M):
		if M.r != M.c:
			raise TypeError('Matrix if not square!')
		return None

	@staticmethod
	def LU(M):
		print('============== M ==============')
		print(M)
		print('===============================')

		n = M.r

		L = Matrix.Eye(n)
		U = M.clone()
		print('============== U ==============')
		print(U)
		print('===============================')
		print('------ %s' % U[2][2])
		for i in range(n):
			for j in range(i+1,U.r):
				print('U[%s][%s]=%s' % (i,i,U[i][i]))
				if U[i][i] == 0:
					raise TypeError('Matrix must not contain zeros on the diagonal!')
				L[j][i] = 1.0 * U[j][i] / U[i][i]
				for k in range(M.c):
					U[j][k] -= L[j][i] * U[i][k]
		return L,U

	@classmethod
	def M(cls, *args, force_type=False, force_numeric=False):

		rs = len(args)
		if rs == 0:
			raise TypeError('Cannot create empty matrix, use ZeroMatrix!')
		
		if type(args[0]) != list:
				raise TypeError('Argument must be a list of lists (2D array)!')
	
		cs = len(args[0])
		if cs == 0:
			raise TypeError('Cannot create empty matrix (see ZeroMatrix)!')
		
		ftype = type(args[0][0])

		for c in args:
			if type(c) != list:
				raise TypeError('Argument must be a list of lists (2D array)!')
			if len(c) != cs:
				raise TypeError('All rows must be of same length!')
			if force_type:
				for v in c:
					if type(v) != ftype:
						raise TypeError('All values must be of the same type unless force_type is set to false!')
		return cls(list(args), rs, cs)
			
	@classmethod
	def Scalar(cls, rs, cs, sc):
		M = []
		for r in range(rs):
			M.append([])
			for c in range(cs):
				M[r].append(sc)
		return cls(M, rs, cs)

	@classmethod
	def Eye(cls, rc):
		M = []
		for r in range(rc):
			M.append([])
			for c in range(rc):
				if r == c:
					M[r].append(1)
				else:
					M[r].append(0)
		return cls(M, rc, rc)

	@classmethod
	def Zeros(cls, rs, cs):
		return Matrix.Scalar(rs, cs, 0)
	
	@classmethod
	def Ones(cls, rs, cs):
		return Matrix.Scalar(rs, cs, 1)
	
	@classmethod
	def Square(cls, rc, sc):
		return Matrix.Scalar(rc, rc, sc)

	@classmethod
	def RowVector(cls, r, sc):
		return Matrix.Scalar(r, 1, sc)
	
	@classmethod
	def ColumnVector(cls, c, sc):
		return Matrix.Scalar(1, c, sc)
	
	def __repr__(self):
		st = ''
		for r in range(self.r):
			for c in range(self.c):
				st += '%s\t' % self.M[r][c]
			st += '\n'
		return st

if __name__ == '__main__':
	a = Matrix.M([0,0,-1],[0,-1,2],[-2,1,2])
	b = Matrix.SoftTriangulate(a)

	# b = Matrix.M([1,2,1,3],[4,5,4,6],[7,8,7,9],[10,11,10,12])
	# print('det(b)=%s' % b.det())
	# L,U = Matrix.LU(b)
	# print('=========== L*U: ===========')
	# print(L*U)
	# print('============================')
