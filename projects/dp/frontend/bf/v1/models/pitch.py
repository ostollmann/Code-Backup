from django.db import models
from django.contrib.auth.models import User

class Pitch(models.Model):
	
	user = models.ForeignKey(User)
	active = models.BooleanField()
	
	watchers = models.ManyToManyField(User, related_name='watchers', blank=True)
	likers = models.ManyToManyField(User, related_name='likers', blank=True)
	
	record_date = models.DateTimeField()
	delete_date = models.DateTimeField(null=True, blank=True)
	
	
	like_count = models.IntegerField(max_length=20)
	
	def __unicode__(self):
		return '<Pitch: ID=%i, Date=%s, User=%s, Active=%s>' % (self.id, self.record_date, self.user, self.active)
	
	class Meta:
		app_label = 'v1'