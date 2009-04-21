from django import http
from django import forms

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

    self.form = self.getForm()

    if self.is_post and self.form.is_valid():
      self.cleaned_data = self.form.cleaned_data
      return self.post()

    return self.get()

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

    return self.getGetForm()

  def get(self):
    """No sane default get implementation, return error message.
    """

    return http.HttpResponse("Missing implementation")

  def post(self):
    """Default implementation, redirects to GET.
    """

    return http.HttpResponseRedirect(request.path)
