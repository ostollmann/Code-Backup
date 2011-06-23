#! /usr/env python

import os, urllib.request, re
from ftplib import FTP

def run():
	ftp_host = "stollmann.net"
	ftp_user = "u7222963"
	ftp_pass = "QUUz4QgN"
	ip = get_ip()
	upload(ftp_host, ftp_user, ftp_pass, ip)

def get_ip():
	print('Getting IP address...')
	page = urllib.request.urlopen("http://checkip.dyndns.org")
	with page as str:
		s = str.read()
		s = s.decode()
	ips = re.findall('(?:\d{0,3}\.){3}\d{0,3}',s)
	print('Got IP address: '+ips[0]+'...')
	return ips[0]
	
def upload(host, user, passw, ip):
	directory = 'oliverstollmann.net'	
	file_name = 'ip.txt'
	print('Connecting to FTP @'+host+'...')
	ftp = FTP(host)
	print('Logging in with user:'+user+', password:*******...')
	ftp.login(user, passw)
	print('Changing directory to: '+directory+'...')
	ftp.cwd(directory)
	ip_file = open('/tmp/'+file_name, 'rb')
	print('Uploading: '+file_name+'...')
	ftp.storbinary("STOR ip.txt", ip_file)
	ip_file.close()

def create_file(ip):
	f = open('/tmp/ip.txt', 'w')
	f.write(ip)
	f.close()

if __name__ == "__main__":
	run()
