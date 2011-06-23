from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
	user = models.ForeignKey(User, unique=True)
	
	age = models.IntegerField()
	city = models.CharField(max_length=250)
	
	def __unicode__(self):
		return "[Profile] ID: " + str(self.id)
	
	class Meta:
		app_label = 'main'