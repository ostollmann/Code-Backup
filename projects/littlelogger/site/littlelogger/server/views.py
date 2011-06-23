from django.http import HttpRequest, HttpResponse
from django.http import HttpResponse

from littlelogger.server.models import Server

def server(request):
    user = request.user
    str = ''
    
    str += '<strong>Owner of:</strong><br />'
    for server in user.owner_servers.all():
        str += '&nbsp;&nbsp;&nbsp;%s<br />' % server.name
    
    str += '<strong>Admins of:</strong><br />' 
    for server in user.admin_servers.all():
        str += '&nbsp;&nbsp;&nbsp;%s<br />' % server.name
        
    return HttpResponse(str)

def detail(request, server_id):
    str = ''
    try:
        server = Server.objects.get(id=server_id)
    except Exception:
        return HttpResponse('Server (id=%s) not found!' % server_id)
    
    str += '<h2>Server:</h2>'
    str += '<strong>name:</strong> %s<br />' % server.name
    str += '<strong>ip:</strong> %s<br />' % server.ip_address
    str += '<strong>owner:</strong> %s<br />' % server.owner.username
    str += '<strong>admins:</strong><br />'
    for owner in server.admins.all():
        str += '&nbsp;&nbsp;&nbsp;%s<br />' % owner.username
    str += '<strong>applications:</strong><br />'
    for application in server.application_set.all():
        str += '&nbsp;&nbsp;&nbsp;<a href="/%s/%s/">%s</a><br />' % (server_id, application.uri_name, application.name)
    
    return HttpResponse(str)