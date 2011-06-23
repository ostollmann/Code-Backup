from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
import littlelogger
#import littlelogger.apps.server.views.
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'littlelogger.views.home', name='home'),
    # url(r'^littlelogger/', include('littlelogger.foo.urls')),
    url(r'^$', 'server.views.server'),
    url(r'^(?P<server_id>\d+)/$', 'server.views.detail'),
    url(r'^(?P<server_id>\d+)/(?P<app_name>[a-y0-9-]+)/$', 'application.views.application'),
    
    # (?P<pitch_id>\w+)/

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
