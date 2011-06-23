from django.db import models

from v1.models import Subscription

class Payment(models.Model):

	external_id = models.CharField(max_length=50)
	
	subscription = models.OneToOneField(Subscription)
	amount = models.DecimalField(max_digits=5, decimal_places=2)
	date = models.DateTimeField()
	
	

	
	def __unicode__(self):
		return '<Payment: ID=%i, Date=%s, Amount=%s, %s >' % (self.id, self.date, self.amount, self.subscription)
	
	class Meta:
		app_label = 'v1'