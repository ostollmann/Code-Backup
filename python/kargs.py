import inspect

# class Person:
# 	def __init__(self, first, last, age):
# 		self._first_name = first
# 		self._last_name = last
# 		self._age = age
# 		self._id = 12
# 		self.__id = 24
	
# 	def __getitem__(self, key):
# 		return getattr(self, '_' + key)
	
# 	def __setitem__(self, key, value):
# 		print('Trying to set attr \'%s\' to \'%s\'' % (key, value))
# 		try:
# 			getattr(self, '_' + key)
# 		except AttributeError:
# 			raise AttributeError('\'Person\' object has not attribute \'' + key + '\'') 
# 		print('Setting attr \'%s\' to \'%s\'' % (key, value))
# 		setattr(self, '_' + key, value)


	# @property
	# def first_name(self):
	# 	return self._first_name
	
	# @first_name.setter
	# def first_name(self, value):
	# 	self._first_name = value

	# @property
	# def last_name(self):
	# 	return self._last_name
	
	# @last_name.setter
	# def last_name(self, value):
	# 	self._last_name = value

	# @property
	# def age(self):
	# 	return self._age
	
	# @age.setter
	# def age(self, value):
	# 	self._age = value

	# def info(self):
	# 	return {'first_name': self._first_name, 'last_name': self._last_name, 'age': self._age}

class Book:
	def __getattr__(self, key):
		return 'asd' #getattr(self, key)
	def __setattr__(self, key, value):
		print('Setting attr \'%s\' to \'%s\'' % (key, value))

class Car:
	pass





class Person:
	def __init__(self, first, last):
		self._id = 12
		self.first_name = first
		self.last_name = last
	
	def info(self):
		print('P -- %s %s (ID=%s)' % (self.first_name, self.last_name, self._id))

	def setID(self, id):
		self._id = id
	
	def __getattribute__(self, key):
		print('key=%s' % key)
		if inspect.getouterframes(inspect.currentframe(), 2)[1][3] != '<module>':
			return object.__getattribute__(self, key)
		else:
			if key[:1] == '_' and key[:2] != '__':
				print('ERROR')
				raise AttributeError('Cannot access private field \'%s\'' % key)
			else:
				return object.__getattribute__(self, key)

	def __setattr__(self, key, value):
		if inspect.getouterframes(inspect.currentframe(), 2)[1][3] != '<module>':
			self.__dict__[key] = value
		else:
			if key[:1] == '_' and key[:2] != '__':
				raise AttributeError('Cannot set attributes starting with \'_\'')
			else:
				self.__dict__[key] = value

class SuperPerson(Person):
	def __init__(self, first, last):
		self.first_name = first
		self.last_name = last
		self._id = 24
	def test(self):
		self._id=88

if __name__ == '__main__':

	# oliver = Person('Oliver', 'Stollmann')
	# oliver.info()
	# oliver.first_name = 'Nicholas'
	# oliver.info()
	# oliver._id = 23
	victor = SuperPerson('Victor', 'Stollmann')
	victor.info()
	victor.test()
	victor.info()

	# c = Car()
	# c.age_of_construction = 1982
	# print(c.age_of_construction)

	# b = Book()
	# b.title = 'Pro Python'
	# print(b.title)
	# b.author = 'Marty Alchin'
	# print(b.author)

	# p = Person('Oliver', 'Stollmann', 22)
	# print(p.info())
	# p.first_name = 'Nathalie'
	# p.last_name = 'Ng Kuet Leong'
	# p.age = 24
	# print(p.info())
	# p.first_name = 'Vi'
	# print(p.info())

	# print(p.__dict__)
	# print(p._Person__id)
