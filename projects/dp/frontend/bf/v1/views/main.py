from django.http import HttpResponse
from django.shortcuts import render_to_response

from django.contrib import auth
from django.contrib.auth.models import User


def index(request, pitch_id=None):
	tvs = {}
	if request.user.is_authenticated():
		tvs['authenticated'] = True;
		
		tvs['username'] = request.user.username
		tvs['last_login'] = request.user.last_login
	else:
		tvs['authenticated'] = False;
		
	if not pitch_id:
		return render_to_response('base.html', tvs)
		
	else:
		o = pitch_id
	
	return HttpResponse(o)

def about(request):
	return HttpResponse("About...")