from django.http import HttpResponse

from littlelogger.application.models import Application
from littlelogger.server.models import Server

def application(request, server_id, app_name):    
    try:
        server = Server.objects.get(id=server_id)
        app = server.application_set.get(uri_name=app_name)
    except Exception:
        return HttpResponse('Could not find application: %s') % app_name
    
    str = '<strong>%s :: %s</strong><br /><br />' % (server.name, app.name)
    for log in app.log_set.all().order_by('-create_date'):
        if not log.read:
            str += '<strong>'
        
        str += '[%s] %s - %s<br />' % (log.log_level, log.create_date, log.log_text)
        
        if not log.read:
            str += '</strong>'

    return HttpResponse(str)