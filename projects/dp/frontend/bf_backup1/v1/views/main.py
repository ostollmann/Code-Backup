from django.http import HttpResponse


def index(request):
	return HttpResponse("Welcome to Butterflies4two.com")

def about(request):
	return HttpResponse("About...")