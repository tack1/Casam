import sys
import os
import itertools
import urllib

from django import http
from django import forms
from django.conf import settings
from django.template import loader

from casam.models import Project
from casam.models import OriginalImage
from casam.models import Tag
from casam.views import handler
from casam.views import tag as tag_view


class SelectTagForm(forms.Form):
  tags = forms.ModelMultipleChoiceField(Tag.objects.all(), required=False)


class Home(handler.Handler):
  """Handler for the home page.
  """

  def getTags(self, tags):
    tags = [i.id for i in Tag.objects.filter(name__in=tags)]

    return tags

  def getPostForm(self):
    return SelectTagForm(self.POST)

  def get(self):
    context = self.getContext()
    tags = self.getTags(self.GET.getlist('tag'))
    projects = Project.objects.select_related()

    if tags:
      projects = projects.filter(tags__id__in=tags)

    projects = dict([(i,[]) for i in projects])

    for project in projects:
      imgs = OriginalImage.objects.select_related().filter(project=project)
      projects[project] = imgs[0] if imgs else ''

    initial = {
        'tags' : tags,
        }

    context['projects'] = projects
    context['tag_form'] = SelectTagForm(initial=initial)

    content = loader.render_to_string('main/home.html', dictionary=context)
    return http.HttpResponse(content)

  def post(self):
    tags = [i.name for i in self.cleaned_data['tags']]
    url = urllib.urlencode({'tag': tags}, doseq=True)
    return http.HttpResponseRedirect(self.path + '?' + url)
