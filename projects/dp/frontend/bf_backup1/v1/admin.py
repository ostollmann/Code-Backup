from django.contrib import admin

from v1.models import Profile
from v1.models import Subscription
from v1.models import Payment
from v1.models import Pitch

admin.site.register(Profile)
admin.site.register(Subscription)
admin.site.register(Payment)
admin.site.register(Pitch)