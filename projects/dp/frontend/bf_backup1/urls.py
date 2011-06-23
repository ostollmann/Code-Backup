from django.conf.urls.defaults import *

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',

    (r'^$', 'v1.views.index'),
    (r'^about/', 'v1.views.about'),
    
    # Auth
	(r'^login/', 'v1.views.login'),
	(r'^logout/', 'v1.views.logout'),
	(r'^register/', 'v1.views.register'),
	
	
	
	# Admin
    (r'^admin/', include(admin.site.urls)),
)
