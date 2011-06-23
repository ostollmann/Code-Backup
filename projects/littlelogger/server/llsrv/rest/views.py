from django.http import HttpResponse
from django.contrib.csrf.middleware import csrf_exempt

@csrf_exempt
def log(request):
    if request.method != 'POST':
        return HttpResponse(status=405)
    return HttpResponse('logged!')