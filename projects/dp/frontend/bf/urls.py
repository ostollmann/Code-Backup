from django.conf.urls.defaults import *

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',

	(r'^$', 'v1.views.index'),

    # Statics
	(r'^about/', 'v1.views.about'),
	#(r'^help/', 'v1.views.help'),
	#(r'^team/', 'v1.views.team'),
	#(r'^legal/', 'v1.views.legal'),
	#(r'^contact/', 'v1.views.contact'),

	# Pitches
  	(r'^pitches/$', 'v1.views.pitches'),
 	(r'^pitches/(?P<pitch_id>\w+)/', 'v1.views.pitches'),
 	(r'^pitches/(?P<pitch_id>\w+/delete/$)', 'v1.views.delete_pitch'),
  	#(r'^pitches/new/$', 'v1.views.new_pitch'),

    # Messaging
    (r'^messages/$', 'v1.views.messages'),
	(r'^messages/(?P<p>\d+)/$', 'v1.views.messages'),

    # Auth
	(r'^login/$', 'v1.views.login'),
	(r'^logout/$', 'v1.views.logout'),
	(r'^register/$', 'v1.views.register'),	
	(r'^not-subscribed/$', 'v1.views.not_subscribed'),
	(r'^status/$', 'v1.views.status'),
	
	# Admin
    (r'^admin/', include(admin.site.urls)),

	#(r'^(?P<pitch_id>\w+/)', 'v1.views.index'),

)
