from casam.models import OriginalImage
from casam.models import Measurement
from casam.models import PotentialMeasurement
from casam.models import Project
from casam.models import PDM
from casam.logic import pdmoverlay
from casam.logic import point_distribution_model as pdm
from django.conf import settings
from PIL import Image

def createPDM(selectedImages,selectedPMs):
  """
  Create the Point Distribution Model from the selected measurements
  """
  pdmodel = pdm.makePDM()
  potentialids = []
  for i in range(len(selectedPMs)):#for the number of images
    measures = Measurement.objects.all().filter(id__in=selectedPMs[i])#get the measurements
    measures = [j for j in measures]
    measures.sort(key=lambda x: x.mogelijkemeting.name)
    coords = []
    for k, measurement in enumerate(measures):
      if i == 0: #to check if the measurements come from the same potentialmeasurements
        potentialids.append(measurement.mogelijkemeting.id)#on first run, store
      elif potentialids[k] != measurement.mogelijkemeting.id:#on second run compare
        return pdmodel, 0
      coords.append((float(measurement.x),float(measurement.y),0.0))
    pdmodel.addPointSet(coords)
  return pdmodel, 1 
      
def analyse(pdmodel, projectid, selectedImages):
  """
  Analyse the given pdmodel using Procrustes & PCA, save to database and to image
  """
  
  pdmodel.procrustes()
  pdmodel.pca()
  pdmodel.variations()
  pdmObject = PDM(project = Project.objects.all().get(id=projectid))
  pdmObject.save()
  DATADIR = settings.DATADIR
  
  #get size from the first original image (all images should be same size for analysis to work properly anyway
  image = OriginalImage.objects.all().get(id=selectedImages[0])
  im = Image.open(DATADIR+image.id+'.jpg')
  pdmo = pdmoverlay.PDMOverlay(im.size)
  pdmo.drawVariations(pdmodel.variationPositions)
  pdmo.drawMeans(pdmodel.meanPositions)
  
  imagePath = DATADIR + pdmObject.id + ".png"
  pdmObject.path = pdmObject.id + ".png"
  pdmObject.name = "PDM-Overlay"
  pdmObject.save()

  pdmo.saveImage(imagePath)
  
  return pdmObject

    