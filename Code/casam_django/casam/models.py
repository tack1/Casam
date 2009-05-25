from django.db import models
from django.contrib.auth.models import User
from django_extensions.db.fields import UUIDField


class Tag(models.Model):
  id = UUIDField(primary_key=True, auto=True)
  name = models.CharField(max_length=50)

  def __unicode__(self):
    return str(self.name)


class Project(models.Model):
  id = UUIDField(primary_key=True, auto=True)
  name = models.CharField(max_length=100)
  added = models.DateField(auto_now_add=True)
  description = models.CharField(max_length=200)
  tags = models.ManyToManyField('Tag', related_name='projects')

  def __unicode__(self):
    return str(self.name)


class Image(models.Model):
  id = UUIDField(primary_key=True, auto=True)
  project = models.ForeignKey('Project')
  path = models.CharField(max_length=100)
  name = models.CharField(max_length=30)
  added = models.DateField(auto_now_add=True)
  last_modified = models.DateField(auto_now=True)

  class Meta:
    abstract = True
    
class PDM(Image):
  pass


class OriginalImage(Image):
  pass


class ModifiedImage(Image):
  originalimage = models.ForeignKey('OriginalImage') 
  hash = models.CharField(max_length=40) 
  transformation = models.TextField() 


class PotentialMeasurement(models.Model):
  id = UUIDField(primary_key=True, auto=True)
  project = models.ForeignKey('Project')
  name = models.CharField(max_length=30)


class Measurement(models.Model):
  id = UUIDField(primary_key=True, auto=True)
  image = models.ForeignKey('OriginalImage')
  mogelijkemeting = models.ForeignKey('PotentialMeasurement')
  x = models.CharField(max_length=4)
  y = models.CharField(max_length=4)
  imagewidth = models.CharField(max_length=4)
  imageheight = models.CharField(max_length=4)
  
class Bitmap(models.Model):
  id = UUIDField(primary_key=True, auto=True)
  image = models.ForeignKey('OriginalImage')
  imagewidth = models.CharField(max_length=4)
  imageheight = models.CharField(max_length=4)
  path = models.CharField(max_length=200)
  added = models.DateField(auto_now_add=True)
  last_modified = models.DateField(auto_now=True)

class UserProfile(models.Model):
  id = UUIDField(primary_key=True, auto=True)
  user = models.ForeignKey(User, unique=True)  
  read = models.ManyToManyField('Project', related_name='ReadProject')
  write = models.ManyToManyField('Project', related_name='WriteProject')

class Annotation(models.Model):
  id = UUIDField(primary_key=True, auto=True)
  name = models.CharField(max_length=30)
  url = models.CharField(max_length=200)
  project = models.ForeignKey('Project')
