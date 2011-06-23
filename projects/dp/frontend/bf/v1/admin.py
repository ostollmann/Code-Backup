from django.contrib import admin

from v1.models import Profile
from v1.models import Subscription
from v1.models import Payment
from v1.models import Pitch
from v1.models import Conversation
from v1.models import Message

admin.site.register(Profile)
admin.site.register(Subscription)
admin.site.register(Payment)
admin.site.register(Pitch)
admin.site.register(Conversation)
admin.site.register(Message)