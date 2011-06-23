import sys
import os
import mimetypes
import logging


class DynCSS():

	def __init__(self, argv):
		self.log = None
		self.filepath = None
		self.file = None
		self.variables = {}

		self._initLogger()
		self._checkFile(argv[0])
		self._getReadFile()
		self._getVariables()
		self._finalizeVariables()
		self._closeReadFile()
		#self._dumpVariables()
		
		#self._getWriteFile()


	

	def _checkVariables(self):
		n = True
		for name, value in self.variables.items():
			if(name[0] == "!" or value[0] == "!"):
				n = False
		return n

	def _dumpVariables(self):
		print(self.variables)

	def _finalizeVariables(self):
		n = 0
		while(not self._checkVariables()):
			n += 1
			if(n > 5000):
				self.log.error("Looping infinitely, please check your variables")
				sys.exit(1)
			for name, value in self.variables.items():
				if(value[0] == "!"):
					self.variables[name] = self.variables[value[1:]]
		self.log.debug(self.variables)

	def _getVariables(self):
		n = 0
		for line in self.file:
			n += 1
			line = line.replace("\n", "")
			try:
				if(line.lstrip()[0] == "!"):
						expr = line.lstrip()[1:]
						self.log.debug("Line %i: found expr \"%s\"" % (n, expr))
						try:
							name, value = expr.split("=")
							if(len(name.strip()) == 0 or len(value.strip()) == 0):
								raise ValueError
							self.variables[name.strip()] = value.strip()
						except ValueError:
							self.log.warning("Line %i: syntax error!" % n)						
			except IndexError:
				self.log.debug("Line %i: blank line" % n)

	def _getReadFile(self):
		try:	
			self.file = open(self.filepath, "r")
			self.log.info("Opened file \"%s\"" % self.filepath)
		except IOError:
			self.log.error("Could not open file \"%s\"!" % self.filepath)
			sys.exit(1)

	def _closeReadFile(self):
		self.log.info("Closing file \"%s\"" % self.filepath)
		self.file.close()

	def _checkFile(self, filepath):
		if(not os.path.isfile(os.path.abspath(filepath))):
			self.log.error("File \"%s\" not found!" % os.path.abspath(filepath))
			sys.exit(2)		
		if(not mimetypes.guess_type(os.path.abspath(filepath))[0] == "text/css"):
			self.log.error("File \"%s\" not of correct type \"text/css\"!" % os.path.abspath(filepath))
			sys.exit(2)
		self.filepath = filepath

	def _initLogger(self):
		self.log = logging.getLogger("log")
		self.log.setLevel(logging.DEBUG)
		lh = logging.StreamHandler()
		lh.setLevel(logging.DEBUG)
		#lh.setFormatter(logging.Formatter("%(asctime)s %(levelname)s: %(message)s"))
		lh.setFormatter(logging.Formatter("%(levelname)s: %(message)s"))
		self.log.addHandler(lh)

	def loop(self):
		pass
		

if __name__ == "__main__":
	dynCSS = DynCSS(sys.argv[1:])
