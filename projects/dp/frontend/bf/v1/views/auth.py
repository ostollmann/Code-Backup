from django.http import HttpResponse, HttpResponseRedirect
from django.template.context import RequestContext

from v1.forms.auth import LoginForm
from v1.forms.auth import RegisterForm

from v1.models import Profile

from django.shortcuts import render_to_response

from django.contrib import auth
from django.contrib.auth.models import User

import datetime

def not_subscribed(request):
	return HttpResponse('Your subscription has expired!')

def login(request):
	if not request.user.is_authenticated():
		# POST request: authenticate user
		if request.method == 'POST':
			login_form = LoginForm(request.POST)
			# Form successfully validated
			if login_form.is_valid():
				form_data = login_form.cleaned_data
				user = auth.authenticate(username=form_data['username'], password=form_data['password'])
				# User successfully authenticated
				if user is not None and user.is_active:
					auth.login(request, user)
					next = request.POST.get('next')
					return HttpResponseRedirect(next)
				# User authentication failed (wrong u/p or user not active)
				else:
					return HttpResponse('Could not login with this username and password')
			# Form validation error
			else:
				return HttpResponse('Could not validate form data')
		# Non-POST request: login_form
		else:
			login_form = LoginForm()
			next = request.GET.get('next', '')
			if next == '':
				next = '/'
			return render_to_response('auth/login_form.html', {'form': login_form, 'next': next}, context_instance=RequestContext(request))
	else:
		return HttpResponse('You must me logged out to login!')

def status(request):
	o = '';
	if request.user.is_authenticated():
		o+= '<strong>Status:</strong> logged in<br />'
		o+= '<strong>Username:</strong> %s<br />' % request.user.username
		o+= '<strong>Email:</strong> %s<br />' % request.user.email
		o+= '<strong>Date Joined:</strong> %s<br />' % str(request.user.date_joined)
		o+= '<strong>Last Login:</strong> %s<br />' % str(request.user.last_login)
	else:
		o+= 'Status: not logged in<br />'

	o+= '<a href="/login/">login</a> - <a href="/logout/">logout</a> - <a href="/register/">register</a>'
	
	return HttpResponse(o)
	
def logout(request):
	if request.user.is_authenticated():
		auth.logout(request)
		return HttpResponse('Succesfully logged out!')
	else:
		return HttpResponse('You must be logged in to log out!')

def register(request):
	if not request.user.is_authenticated():
		if request.method == 'POST':
			errors = []
			register_form = RegisterForm(request.POST)
			if register_form.is_valid():
				cdata = register_form.cleaned_data
				
				email = cdata['email']
				username = cdata['username']
				password = cdata['password']
				city = cdata['city']
				age = cdata['age']
				sex = cdata['sex']
				
				new_user = User.objects.create_user(username, email, password)
				new_user.save()
				
				# create profile for new user
				new_user_profile = Profile(user=new_user, age=age, city=city, sex=sex)
				new_user_profile.save()
				
				# log user in after successful registration
				auth.login(request, auth.authenticate(username=username, password=password))
				
				return HttpResponseRedirect('/')
				
			else:
				errors.append(register_form.errors)
				return render_to_response('auth/register_form.html', {'form': register_form, 'errors': errors}, context_instance=RequestContext(request))
		else:
			register_form = RegisterForm()
			return render_to_response('auth/register_form.html', {'form': register_form}, context_instance=RequestContext(request))
	else:
		return HttpResponse('You must be logged out to register!')
