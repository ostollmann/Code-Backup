from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
	
	user = models.OneToOneField(User)
	
	registration_date = models.DateTimeField()
	
	age = models.IntegerField()
	city = models.CharField(max_length=250)
	sex = models.IntegerField()
	
	def __unicode__(self):
		return 'User=%s' % self.user.username
	
	class Meta:
		app_label = 'v1'