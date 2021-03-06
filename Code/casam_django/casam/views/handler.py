from django import http
from django import forms
from django.conf import settings
from django.template import loader
import datetime

from django.contrib.auth.models import User

from casam.logic import user_profile as user_profile_logic

class Handler(object):
  """Handler base class for Django requests.
  """

  def __call__(self, request, *args, **kwargs):
    """When called by django dispatch to the appropriate method.
    """

    if not (request.method == 'POST' or request.method == 'GET'):
      # redirect to GET page
      return http.HttpResponseRedirect(request.path)

    self.request = request
    self.method = request.method
    self.is_post = request.method == 'POST'
    self.args = args
    self.kwargs = kwargs
    self.GET = request.GET
    self.POST = request.POST
    self.FILES = request.FILES
    self.path = request.path
    self.BASE_PATH = settings.BASE_PATH
    self.DATA_DIR = settings.DATADIR

    self.user = request.user
    self.profile = user_profile_logic.getProfile(self.user)
    self.profile_type = user_profile_logic.getType(self.user)

    self.form = self.getForm()

    if not self.authenticated():
      context = {'BASE_PATH': self.BASE_PATH}
      content = loader.render_to_string('access_denied.html', dictionary=context)
      return http.HttpResponse(content)

    if self.is_post and self.form.is_valid():
      self.cleaned_data = self.form.cleaned_data
      return self.post()
    else:
      is_valid_returnde = self.form.is_valid()
      errors = self.form.errors

    return self.get()

  def authenticated(self):
    """Default implementation, returns whether the user is logged in.
    """

    return self.user.is_authenticated()

  def getUserAuthenticationContext(self):
    """Returns the context values related to authentication.
    """

    context = {}

    if self.user.is_authenticated():
      context['name'] = self.user.first_name
      #if there is no friendly first name, use the user name
      if context['name']=='':
        context['name'] = self.user
      context['TYPE'] = self.profile_type
      context['is_chirurg'] = self.profile_type == 'Chirurg'
      context['is_onderzoeker'] = self.profile_type == 'Onderzoeker'
      context['is_beheerder'] = self.profile_type == 'Beheerder'
      context['PROFILE'] = self.profile
      context['expiration_in_seconds'] = self.request.session.get_expiry_age()
    return context

  def getContext(self):
    """Returns a dictionary for every class
    """

    context = {
        'BASE_PATH': self.BASE_PATH,
        'DATA_DIR': self.DATA_DIR,
        'USER': self.user,
        'form': self.form,
        'submit_value': 'save',
        }

    context.update(self.getUserAuthenticationContext())

    return context

  def getForm(self):
    """Returns the appropriate form for the current request.
    """

    if self.is_post:
      return self.getPostForm()

    return self.getGetForm()

  def getGetForm(self):
    """Default implementation, returns an empty form.
    """

    return forms.Form()

  def getPostForm(self):
    """Default implementation, returns the get form.
    """

    return forms.Form(self.POST)

  def get(self):
    """No sane default get implementation, return error message.
    """

    return http.HttpResponse("Missing implementation")

  def post(self):
    """Default implementation, redirects to GET.
    """

    return http.HttpResponseRedirect(request.path)
