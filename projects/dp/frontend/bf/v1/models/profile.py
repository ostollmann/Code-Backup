from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
	
	user = models.OneToOneField(User)
	
	active = models.BooleanField()
	
	delete_date = models.DateTimeField(null=True, blank=True)
	
	
	age = models.PositiveIntegerField()
	city = models.CharField(max_length=250)
	sex = models.PositiveIntegerField()
	
	
	
	def __unicode__(self):
		return 'User=%s' % self.user.username
	
	class Meta:
		app_label = 'v1'