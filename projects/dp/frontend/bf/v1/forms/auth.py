from django import forms
from django.contrib.auth.models import User

class LoginForm(forms.Form):
	username = forms.CharField(max_length=50)
	password = forms.CharField(widget=forms.PasswordInput, max_length=30)
	
	class Meta:
		app_label = 'v1'
		
class RegisterForm(forms.Form):
	email = forms.CharField(max_length=250)
	username = forms.CharField(max_length=50)
	password = forms.CharField(widget=forms.PasswordInput, max_length=30)
	cpassword = forms.CharField(widget=forms.PasswordInput, max_length=30)
 
	
	city = forms.CharField(max_length=28)
	age = forms.IntegerField()
	sex_choices = ((0, 'male'), (1, 'female'))
	sex = forms.ChoiceField(widget=forms.RadioSelect, choices=sex_choices)
	
	def clean_cpassword(self):
		password = self.cleaned_data['password']
		cpassword = self.cleaned_data['cpassword']
		if password != cpassword:
			raise forms.ValidationError('Passwords do not match!')
		return password
	
	def clean_username(self):
		username = self.cleaned_data['username']
		if not username.isalnum():
			raise forms.ValidationError('Username not valid!')
		try:
			user = User.objects.get(username=username)
			raise forms.ValidationError('Username already in use!')
		except User.DoesNotExist:
			pass
		return username
		
	
	def clean_email(self):
		email = self.cleaned_data['email']
		# Validate email address
		if not self.validEmail(email):
			raise forms.ValidationError('Email address not valid!')
		# Check if email already exists
		try:
			user = User.objects.get(email=email)
			raise forms.ValidationError('Email address already in use!')
		except User.DoesNotExist:
			pass
		return email
		
	
	def validEmail(self, email):
		# http://tfletcher.com/lib/rfc822.py
		qtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]'
		dtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]'
		atom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+'
		quoted_pair = '\\x5c[\\x00-\\x7f]'
		domain_literal = "\\x5b(?:%s|%s)*\\x5d" % (dtext, quoted_pair)
		quoted_string = "\\x22(?:%s|%s)*\\x22" % (qtext, quoted_pair)
		domain_ref = atom
		sub_domain = "(?:%s|%s)" % (domain_ref, domain_literal)
		word = "(?:%s|%s)" % (atom, quoted_string)
		domain = "%s(?:\\x2e%s)*" % (sub_domain, sub_domain)
		local_part = "%s(?:\\x2e%s)*" % (word, word)
		addr_spec = "%s\\x40%s" % (local_part, domain)
		import re
		valid_email = re.compile('\A%s\Z' % addr_spec)
		if valid_email.match(email) is not None:
			return True
		else:
			return False
