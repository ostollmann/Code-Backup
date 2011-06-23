import sys, getopt, socket, os, time
import sqlite3
import paramiko

class iSMS():

	def __init__(self, args):
		self.log = True

		self.ruser = "root"
		self.rpass = "alpine"
		self.rhost = None

		self.remotedir = "/User/Library/SMS/"
		self.remotefile = "sms.db"

		self.outdir = os.getcwd()
		self.outfile = "messages.txt"

		self.conn = None

		self.messages = None

		self.__prep__(args)

		#self.connect()
		#self.getSMSDb()
		self.readSMSDb()
		self.exportSMSDb()

	def connect(self):
		self.conn = paramiko.SSHClient()
		self.conn.set_missing_host_key_policy(paramiko.AutoAddPolicy())
		try:		
			self.l("[LL] Connecting to host (%s@%s)..." % (self.ruser, self.rhost))
			self.conn.connect(self.rhost, username=self.ruser, password=self.rpass)
		except paramiko.AuthenticationException:
			self.l("[EE] Could not authenticate with host (check username/password)")
			sys.exit(1)
		except (paramiko.SSHException, socket.error):
			self.l("[EE] Could not connect (SSH or socket error)")
			sys.exit(1)

		self.l("[LL] Successfully connected to host...")

	def getSMSDb(self):
		if self.conn is None:
			self.l("[EE] Something went really wrong!")
			sys.exit(1)
		
		sftp = self.conn.open_sftp()

		local = os.path.join(os.getcwd(), self.remotefile)
		remote = self.remotedir + self.remotefile	

		self.l("[LL] Local path: %s" % local)
		self.l("[LL] Remote path: %s" % remote)

		self.l("[LL] Getting sms.db from %s..." % self.rhost)
		try:		
			sftp.get(remote, local)
		except IOError as (err, string):
			self.l("[EE] Could not get remote file (is the path right?)")
			sys.exit(1)

		self.l("[LL] Successfully downloaded '%s' to '%s'" % (remote, local))		

		self.l("[LL] Closing sftp connection...")
		sftp.close

	def readSMSDb(self):
		self.l("[LL] Opening sqlite DB...")
		dbc = sqlite3.connect(os.path.join(os.getcwd(), self.remotefile))
		dbcur = dbc.cursor()
		self.l("[LL] Reading all messages...")
		sql = "SELECT * FROM message"		
		dbcur.execute(sql)
		self.messages = []
		for row in dbcur:
			self.messages.append(row)
			print row
		self.l("[LL] Closing DB connection...")		
		dbc.close()

	def exportSMSDb(self):
		fstr = os.path.join(self.outdir, self.outfile)
		self.l("[LL] Opening export file '%s'..." % fstr)


		# 0: msg_id
		# 1: num
		# 2: some_id (maybe thread? contact?)
		# 3: msg
		# 4: ? (0)
		# 5: ? (0)
		# 6: ? (None)
		# 7: ? (200)
		# 8: ? (0)
		# 9: ? (0)
		# 10: ? (0)
		# 11: ? (0)
		# 12: ? (0)
		# 13: ? (None)
		# 14: ? (0)
		# 15: ? ("ch", country code?)
		# 16: ? (None)
		# 17: ? (None)
		# 18: ? (0)

#		for row in self.messages:
		self.l("[LL] Writing messages to file...")
		tstdout = sys.stdout
		outfile = open(fstr, "w")
		sys.stdout = outfile
		#for msg_id,num,some_id,msg,a,b,c,d,e,f,g,h,i,j,k,l,m in self.messages:	
			#print msg_id, num, msg	
			#print "msg: %s" % str(msg)
			#msgd=msg.encode('utf-32')
			#print msg
			#print "msg: %i: %s" % (msg_id, msg.encode('utf-16'))
			#self.l("[LL] ID: %i, Num: %s, Msg: %s" % (msg_id, num, msg.encode('latin1', errors='replace')))
			#outfile.write("%i,%s,%s\n" % (msg_id, num, msg.repr()))
		sys.stdout = tstdout		
		outfile.close()

	def __prep__(self, args):
		try:
			opts, args = getopt.getopt(args, "qu:p:e:", ["quiet", "user=", "pass=", "export-dir="])
		except getopt.GetoptError:
			self.l("[EE] Invalid options")		
			self.usage()
			sys.exit(2)

		if len(args) == 1:
			try:
				socket.inet_aton(args[0])
				if len(args[0].split(".")) == 4:
					self.l("[LL] Setting host to: %s" % args[0])
					self.rhost = args[0]
				else:
					self.l("[EE] Not a valid IP: %s" % args[0])
					sys.usage()
					sys.exit(2)
			except socket.error:
				self.l("[EE] Not a valid IP: %s" % args[0])
				sys.usage()				
				sys.exit(2)
		else:
			self.l("[EE] Invalid arguments")
			self.usage()
			sys.exit(2)

		for o, a in opts:
			if o in ("-q", "--quiet"):
				self.log = False
			if o in ("-u", "--user"):
				self.l("[LL] Setting username to: %s" % a)
				self.ruser = a
			if o in ("-p", "--pass"):
				self.l("[LL] Setting password to: %s" % a)
				self.rpass = a
			if o in ("-e", "--export-dir"):
				if os.patch.exists(a):
					self.l("[LL] Setting export directory to: %s" % a)
					self.outdir = a
				else:
					self.l("[EE] Could not set custom export directory,\n[EE] path '%s' does not exist" % a)

	def usage(self):
		print "usage..."

	def l(self, msg):
		if self.log == True:
			print "%s" % msg

	def smart_str(self, s, encoding='utf-8', errors='strict'):
		if not isinstance(s, basestring):
			try:
				return str(s)
			except UnicodeEncodeError:
				return unicode(s).encode(encoding, errors)
		elif isinstance(s, unicode):
			return s.encode(encoding, errors)
		elif s and encoding != 'utf-8':
			return s.decode('utf-8', errors).encode(encoding, errors)
		else:
			return s

if __name__ == "__main__":
	runner = iSMS(sys.argv[1:])
	
