import inspect

class safe_class:
	def __getattribute__(self, key):
		if inspect.getouterframes(inspect.currentframe(), 2)[1][3] != '<module>':
			return object.__getattribute__(self, key)
		else:
			if key[:1] == '_' and key[:2] != '__':
				raise AttributeError('Cannot access private attribute "%s\"' % key)
			else:
				return object.__getattribute__(self, key)

	def __setattr__(self, key, value):
		if inspect.getouterframes(inspect.currentframe(), 2)[1][3] != '<module>':
			self.__dict__[key] = value
		else:
			if key[:1] == '_' and key[:2] != '__':
				raise AttributeError('Cannot set attributes starting with "_"')
			else:
				self.__dict__[key] = value