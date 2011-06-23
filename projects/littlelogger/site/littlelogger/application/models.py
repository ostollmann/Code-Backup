from django.db import models
from django.contrib.auth.models import User

from littlelogger.server.models import Server

class Application(models.Model):
    
    server = models.ForeignKey(Server)
    
    owner = models.ForeignKey(User, related_name='application_owner')
    admins = models.ManyToManyField(User, related_name='application_admin')
    users = models.ManyToManyField(User, related_name='application_user')

    create_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now=True)
    
    # server info
    key = models.CharField(max_length=128)
    password = models.CharField(max_length=128)
    
    name = models.CharField(max_length=255)
    uri_name = models.CharField(max_length=255)
    
    def __unicode__(self):
        return '/%s/%s/' % (self.server.name, self.name)