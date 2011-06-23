from django.db import models
from django.contrib.auth.models import User

class Server(models.Model):
    
    owner = models.ForeignKey(User, related_name='owner_servers')
    admins = models.ManyToManyField(User, related_name='admin_servers')
    
    # dates
    create_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now=True)
    delete_date = models.DateTimeField(null=True, blank=True)
    
    # server info
    key = models.CharField(max_length=128)
    password = models.CharField(max_length=128)
    
    name = models.CharField(max_length=255)
    uri_name = models.CharField(max_length=255)
    
    ip_address = models.IPAddressField()
    
    def __unicode__(self):
        return '%s (owner: %s)' % (self.name, self.owner.username)