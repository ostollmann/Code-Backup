import binascii

def num_bin(N, places=8):
    def bit_at_p(N, p):
        ''' find the bit at place p for number n '''
        two_p = 1 << p   # 2 ^ p, using bitshift, will have exactly one
                         # bit set, at place p
        x = N & two_p    # binary composition, will be one where *both* numbers
                         # have a 1 at that bit.  this can only happen 
                         # at position p.  will yield  two_p if  N has a 1 at 
                         # bit p
        return int(x > 0)

    bits =  ( bit_at_p(N,x) for x in xrange(places))
    return "".join( (str(x) for x in bits) )

num = '123456789'

bin = ''
for c in num:
  bin += num_bin(ord(c))
  
print 'Writing decrypted text to file...'
dpf = open('bin.txt', 'w')

for i in range(len(bin)/6):
  print bin[i*6:i*6+6]
 
  dpf.write(str(bin[i*6:i*6+6]))
dpf.close()
