from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.decorators import user_passes_test

import time

from v1.views import user_logged_in_and_subscribed
from v1.views import user_logged_in
from v1.views import user_subscribed


NUMBER_OF_CONVERSATIONS_PER_PAGE = 10



#@user_passes_test(user_logged_in_and_subscribed, login_url="/login/", redirect_field_name='msg=432&next')
#@user_passes_test(user_logged_in_and_subscribed, login_url="/login/")
@user_passes_test(user_logged_in, login_url="/login/")
@user_passes_test(user_subscribed, login_url="/not-subscribed/")
def messages(request, p=1):
	#@todo: 	fix this stupid conversation model, because it makes slicing impossible (ie. get 20	first conversations because of the merging)
	p = int(p) - 1
	limit_start = p * NUMBER_OF_CONVERSATIONS_PER_PAGE
	limit_end = (p+1) * NUMBER_OF_CONVERSATIONS_PER_PAGE
	
	user = request.user
	conversationsa = user.conversation_usera.extra(order_by=['last_message_date']).all()
	conversationsb = user.conversation_userb.extra(order_by=['last_message_date']).all()
	conversations = []
	o = ''
	for c in conversationsa:
		conversations.append(c)
	for c in conversationsb:
		conversations.append(c)

	# sort conversations by last message date
	conversations = sorted(conversations, key=lambda c: time.mktime(time.strptime(str(c.last_message_date), '%Y-%m-%d %H:%M:%S')), reverse=True)
	# split for display
	conversations = conversations[limit_start:limit_end]
	
	if p==0 and len(conversations) == 0:
		o = 'No Messages!'
	
	#@todo: 	redirect to 404 error
	elif len(conversations) == 0:
		o = 'ERROR 404'


	for c in conversations:
		o += 'Conversation between %s and %s:<br />' % (str(c.usera), str(c.userb))
		messages = c.message_set.extra(order_by=['-send_date']).all()
		for m in messages:
			if not m.read:
				o += '----- <strong>[%s] %s -> %s<br /></strong>' %(str(m.send_date), str(m.sender), str(m.recipient))
			else:
				o += '----- [%s] %s -> %s<br />' %(str(m.send_date), str(m.sender), str(m.recipient))

	return HttpResponse(o)