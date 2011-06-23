from django.http import HttpResponse

from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.decorators import user_passes_test

from v1.models import Pitch

from v1.views import encode_url, decode_url



def pitches(request, pitch_id=None):
	if not pitch_id:
		o = ''
		for i in range(100001):
			if i != 0:
				o += '[%s] <a href="http://127.0.0.1:8000/pitches/%s/">http://127.0.0.1:8000/pitches/%s/</a><br />' % (i, encode_url(i), encode_url(i))
			
	else:
		return _single_pitch(request, pitch_id)
	return HttpResponse(o)

def delete_pitch(request, pitch_id):
	return HttpResponse('Deleting pitch with id %' % pitch_id)

def _single_pitch(request, pitch_id):
	id = decode_url(pitch_id)
	try:
		o = ''
		pitch = Pitch.objects.get(id=id)
		o += '<h2>Pitch</h2>'
		o += '<p>User: %s</p>' % pitch.user
		o += '<p>Record Date: %s</p>' % pitch.record_date
		
		return HttpResponse(o)
	except ObjectDoesNotExist:
		# @todo: do 404 redirect
		return HttpResponse('Error: Pitch not found (ID=%s)!' % id)
