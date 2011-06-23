from django.db import models
from django.contrib.auth.models import User

class Message(models.Model):
	user = models.ForeignKey(User, related_name='message_user')
	recipient = models.ForeignKey(User, related_name='message_recipient')
	
	record_date = models.DateTimeField('record date')
	send_date = models.DateTimeField('send date')
	receipt_date = models.DateTimeField('receipt date')
	
	def __unicode__(self):
		return "[Message] ID: " + str(self.id) + ", User: " + str(self.user) + ", Recipient: " + str(self.recipient)
	
	class Meta:
		app_label = 'main'