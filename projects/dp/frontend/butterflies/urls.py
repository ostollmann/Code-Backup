from django.conf.urls.defaults import *

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    #(r'^$', 'main.views.index'),
	#(r'^(?P<video_id>\d+)/$', 'main.views.detail'),
	#(r'^user/(?P<username>[a-zA-Y0-9]+)/$', 'main.views.user_detail'),
	(r'^login/', 'main.views.login'),
	(r'^logout/', 'main.views.logout'),
	(r'^register/', 'main.views.register'),
	#(r'^$', 'main.views.index'),
    # Uncomment the admin/doc line below to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),
)
