import ecn
import hashlib
import sys
import binascii

def _(str):
    print '=================================================================='
    print str
    print '=================================================================='


pad = b"0"

key = '1b0802e3d6'
print 'Using key: %s' % key

key8b = hashlib.md5().hexdigest()[0:8]
print '8-bit key: %s' % key8b

#ede = ecn.des(key8b)
ede = ecn.des('12345678')


print 'Reading plain text from file...'
ptf = open('plain.txt', 'r')
plain = ptf.read()
ptf.close()
print 'Plain Text:'
#_(plain)
#print len(plain)
plain = plain + 'x'
plain = 'hihihihi'
print 'Encrypting plain text...'
encrypted = ede.encrypt(plain)
print 'Encrypted:'
_(encrypted)

#print 'Writing encrypted text to file...'
#cif = open('cipher.txt', 'wb')
#cif.write(encrypted)
#cif.close()
#
print 'Reading encrypted text from file...'
#ptf = open('cipher.txt', 'rb')
#fencrypted = ptf.read()
#ptf.close()

with open("cipher.txt", "rb") as f:
    byte = f.read(1)
    while byte != "":
        # Do stuff with byte.
        byte = f.read(1)
        print '==========================='
        print 'byte: ' + byte
        print 'base64: ' + binascii.b2a_base64(byte)
        print 'b21_hqx: ' + binascii.b2a_hqx(byte)
        print 'hex: ' + binascii.b2a_hex(byte)
        print 'uu: ' + binascii.b2a_uu(byte)
        print 'bq: ' + binascii.b2a_qp(byte)
#
## _('')
## print 'Length e: %s' % len(encrypted)
## print 'Length fe: %s' % len(fencrypted)
## for i in range(len(fencrypted)):
##     print '[%s] %s - %s' % (i, encrypted[i], fencrypted[i])
## print '%s' % (encrypted == fencrypted)
#
#
#print ''
#print encrypted
#print ''
#print fencrypted
#_('')
#
#print 'Decrypting encrypted text...'
#decrypted = ede.decrypt(fencrypted, pad=pad)
#print 'Decrypted:'
#_(decrypted)
#
#print 'Writing decrypted text to file...'
#dpf = open('dplain.txt', 'w')
#dpf.write(decrypted)
#dpf.close()
#
#sys.exit(0)

