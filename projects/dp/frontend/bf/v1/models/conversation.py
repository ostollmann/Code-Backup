from django.db import models
from django.contrib.auth.models import User

class Conversation(models.Model):
	
	usera = models.ForeignKey(User, related_name='conversation_usera')
	userb = models.ForeignKey(User, related_name='conversation_userb')
	
	active = models.BooleanField()
	
	start_date = models.DateTimeField()
	delete_date = models.DateTimeField(null=True, blank=True)
	
	last_message_date = models.DateTimeField()
	
	message_count = models.PositiveIntegerField()
	
	def __unicode__(self):
		return '<Conversation: ID=%i, UserA=%s, UserB=%s>' % (self.id, self.usera, self.userb)
	
	def __string__(self):
		return '<Conversation: ID=%i, UserA=%s, UserB=%s>' % (self.id, self.usera, self.userb)
	
	class Meta:
		app_label = 'v1'