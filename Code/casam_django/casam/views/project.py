from django import http
from django.template import loader
from casam.models import OriginalImage
from casam.models import Project

def home(request, id):
  img = OriginalImage.objects.select_related().order_by('project__name')

  context = {'images':img}

  content = loader.render_to_string('project/home.html', dictionary=context)
  return http.HttpResponse(content)