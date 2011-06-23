from django.db import models

from littlelogger.application.models import Application

class Log(models.Model):
    
    # foreign keys
    application = models.ForeignKey(Application)

    # id for the specific application
    application_log_id = models.IntegerField()
    
    # dates
    create_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now=True)
    delete_date = models.DateTimeField(null=True, blank=True)
    
    read_date = models.DateTimeField(null=True, blank=True)
    
    read = models.BooleanField()
    deleted = models.BooleanField()
    
    # log info
    log_level = models.IntegerField()
    log_text = models.TextField()
    
    def __unicode__(self):
        return '/%s/%s[%s]' % (self.application.server.name, self.application.name, self.application_log_id)