class num:
	def __init__(self,r=0, i=0):
		self.r = r
		self.i = i
	def __repr__(self):
		if self.r == 0 and self.i == 0:  return '0'
		elif self.r == 0:                return '%si'       % self.i
		elif self.i == 0:                return '%s'        % self.r
		else:
			if self.i < 0:                 return '%s-%si'    % (self.r, self.i)
			else:                          return '%s+%si'    % (self.r, self.i)