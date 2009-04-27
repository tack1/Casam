from casam.models import Project
from casam.models import ProjectMeasurementList


def handle_add_project(profile, name, mmeting1, mmeting2):
  project = Project(name=name)
  project.save()
  mm1 = ProjectMeasurementList(name=mmeting1, project=project)
  mm1.save()
  mm2 = ProjectMeasurementList(name=mmeting2, project=project)
  mm2.save()
  profile.read.add(project)
  profile.save()
  
def handle_remove_project(id):
  Project.objects.all().get(id=id).delete()
