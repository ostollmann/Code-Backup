# -- file: ws.py
# -- project: ws
# -- author: ost
# -- lang: py

import socket


host = ''
port = 8000
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((host, port))
s.listen(1)

conn, addr = s.accept()
print('Connection from: %s' % str(addr))

try:
    while True:
        data = conn.recv(1024)
        print('data: %s' % str(data))
except KeyboardInterrupt:
    print('Quitting...')
    s.close()
