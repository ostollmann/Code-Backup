# response and request
from django.http import HttpResponse
from django.http import HttpRequest
from django.http import HttpResponseRedirect
from django.template.context import RequestContext
#models
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
# template
from django.template import Context, Template
from django.template.loader import get_template
# form
from main.forms.auth import LoginForm
from django.shortcuts import render_to_response
# auth
from django.contrib import auth


def  login(request):
	# url pattern: "/login/"
	# returns form if method is not POST
	# tries to authenticate user if method is POST
	
	# POST request
	if request.method == "POST":
			login_form = LoginForm(request.POST)

			# form data is valid
			if login_form.is_valid():
				# get escaped post data
				fdata = login_form.cleaned_data
				username = fdata["username"]
				password = fdata["password"]
				# authenticate against db
				user = auth.authenticate(username=username, password=password)
				
				# authentication successful
				# login user and redirect to "/"
				if user is not None and user.is_active:
					auth.login(request, user)
					return HttpResponseRedirect("/")

				# authentication not successful
				# redirect to "/login/"
				# @todo: change redirect
				else:
					return HttpResponseRedirect("/login/")
			# form data validation unsuccessful
			# redirect to "/login/"
			# @todo: change redirect
			else:
				return HttpResponseRedirect("/login/")
	
	# not POST request	
	# return form
	else:
		login_form = LoginForm()
		return render_to_response('auth/login_form.html', {'form': login_form}, context_instance=RequestContext(request))
		
	

def logout(request):
	return HttpResponse("logout")

def register(request):
	return HttpResponse("register")
