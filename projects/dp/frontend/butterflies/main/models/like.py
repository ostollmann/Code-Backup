from django.db import models
from django.contrib.auth.models import User

class Like(models.Model):
	user = models.ForeignKey(User, related_name='like_user')
	recipient = models.ForeignKey(User, related_name='like_recipient')
	
	send_date = models.DateTimeField('send date')
	receipt_date = models.DateTimeField('receipt date')
	
	received = models.BooleanField()
	
	
	def __unicode__(self):
		return "[Like] ID: " + str(self.id) + ", User: " + str(self.user.id)
	
	class Meta:
		app_label = 'main'