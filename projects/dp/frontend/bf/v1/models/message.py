from django.db import models
from django.contrib.auth.models import User
from v1.models import Conversation

class Message(models.Model):
	
	conversation = models.ForeignKey(Conversation)
	
	sender = models.ForeignKey(User, related_name='message_sender')
	recipient = models.ForeignKey(User, related_name='message_recipient')
	
	
	active = models.BooleanField()

	read = models.BooleanField()
	
	send_date = models.DateTimeField()
	read_date = models.DateTimeField(null=True, blank=True)
	delete_date = models.DateTimeField(null=True, blank=True)
	def __unicode__(self):
		return '<Message: ID=%i, Sender=%s, Recipient=%s>' % (self.id, self.sender, self.recipient)

	class Meta:
		app_label = 'v1'