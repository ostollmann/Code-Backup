from django.db import models
from django.contrib.auth.models import User

#from v1.models import Payment

class Subscription(models.Model):
	
	user = models.ForeignKey(User)

	active = models.BooleanField()
	
	start_date = models.DateTimeField()
	end_date = models.DateTimeField()
	
	#payment = models.OneToOneField(Payment)

	
	def __unicode__(self):
		return '<Subscription: ID=%i, User=%s, Start-Date=%s, End-Date=%s>' % (self.id, self.user, self.start_date, self.end_date)
	
	class Meta:
		app_label = 'v1'