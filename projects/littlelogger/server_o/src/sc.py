import random

def _(str):
    print '=================================================================='
    print str
    print '=================================================================='

def encrypt(key, data):
	enc = ''
	ckey = 0
	for i in range(len(key)):
		ckey += ord(key[i])
	ckey = str(ckey*ckey)
	print 'CKEY: ' + ckey
	ckey = ckey.translate(None, '0')
	print 'CKEY: ' + ckey

	n = 0
	for i in range(len(data)):
		
		m = ''
		while(int(str(ckey)[n]) > 5):
			if n == len(ckey):
				n = 0
			m = str(ckey)[n]
			n += 1
		ch =ord(data[i])

		key = m

		if ch < 10:
			ch = '00'+str(ch)
		if ch < 100:
			ch = '0'+str(ch)
		else:
			ch = str(ch)		
		
		if  key < 10:
			key = '0000'+str(key)
		if key < 100:
			key = '0'+str(key)
		else:
			key = str(key)

		print 'Ch: ' + ch + ', Key: ' + key
		rand = random.randint(33,126)
		if rand < 100:
			rand = '0'+str(rand)
		else:
			rand = str(rand)

		cr = ch+rand
		enc += cr

	return enc

def decrypt(key, data):
	dec = ''
	for i in range(len(data)/6):
		p = data[i*6:(i*6 + 6)]
		print p



print 'Reading plain text from file...'
ptf = open('plain.txt', 'r')
plain = ptf.read()
ptf.close()
print 'Plain Text:'
_(plain)

print 'enc:'
enc = encrypt('1b0802e3d6', plain)
#print enc
print 'dec:'
#decrypt('1b0802e3d6', enc)

print 'Encrypting plain text...'
##encrypted = ede.encrypt(plain, pad=pad)
print 'Encrypted:'
#_(encrypted)

# print 'Writing encrypted text to file...'
# cif = open('cipher.txt', 'wb')
# cif.write(encrypted)
# cif.close()

# print 'Reading encrypted text from file...'
# ptf = open('cipher.txt', 'rb')
# fencrypted = ptf.read()
# ptf.close()

# print 'Decrypting encrypted text...'
# #decrypted = ede.decrypt(fencrypted, pad=pad)
# print 'Decrypted:'
# _(decrypted)

# print 'Writing decrypted text to file...'
# dpf = open('dplain.txt', 'w')
# dpf.write(decrypted)
# dpf.close()

