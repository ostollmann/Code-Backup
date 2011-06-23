from django.db import models
from django.contrib.auth.models import User

class Pitch(models.Model):
	user = models.ForeignKey(User)
	likes = models.IntegerField()
	record_date = models.DateTimeField('record date')
	def __unicode__(self):
		return "[Pitch] ID: " + str(self.id) + ", User: " + str(self.user)
	
	class Meta:
		app_label = 'main'