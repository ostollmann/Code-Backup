from safe_class import safe_class

class test_class(safe_class):
	def __init__(self, name):
		self._name = name
	def info(self):
		print('<test_class -- name=%s>' % self._name)
	def change(self):
		self._name = 'blabla'