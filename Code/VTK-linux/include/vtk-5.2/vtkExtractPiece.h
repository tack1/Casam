/*=========================================================================

  Program:   Visualization Toolkit
  Module:    $RCSfile: vtkExtractPiece.h,v $

  Copyright (c) Ken Martin, Will Schroeder, Bill Lorensen
  All rights reserved.
  See Copyright.txt or http://www.kitware.com/Copyright.htm for details.

     This software is distributed WITHOUT ANY WARRANTY; without even
     the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
     PURPOSE.  See the above copyright notice for more information.

=========================================================================*/
// .NAME vtkExtractPiece
// .SECTION Description
// vtkExtractPiece returns the appropriate piece of each
// sub-dataset in the vtkCompositeDataSet.
// This filter can handle sub-datasets of type vtkImageData, vtkPolyData,
// vtkRectilinearGrid, vtkStructuredGrid, and vtkUnstructuredGrid; it does
// not handle sub-grids of type vtkCompositeDataSet.

#ifndef __vtkExtractPiece_h
#define __vtkExtractPiece_h

#include "vtkCompositeDataSetAlgorithm.h"

class vtkImageData;
class vtkPolyData;
class vtkRectilinearGrid;
class vtkStructuredGrid;
class vtkUnstructuredGrid;
class vtkCompositeDataIterator;

class VTK_PARALLEL_EXPORT vtkExtractPiece : public vtkCompositeDataSetAlgorithm
{
public:
  static vtkExtractPiece* New();
  vtkTypeRevisionMacro(vtkExtractPiece, vtkCompositeDataSetAlgorithm);
  void PrintSelf(ostream& os, vtkIndent indent);
  
protected:
  vtkExtractPiece() {}
  ~vtkExtractPiece() {}

  virtual int RequestDataObject(vtkInformation* request, 
                                vtkInformationVector** inputVector, 
                                vtkInformationVector* outputVector);

  virtual int RequestUpdateExtent(vtkInformation*, 
                                  vtkInformationVector**,
                                  vtkInformationVector*);
  virtual int RequestData(vtkInformation*,
                          vtkInformationVector**,
                          vtkInformationVector*);

  void ExtractImageData(vtkImageData *imageData,
                        vtkCompositeDataSet *output,
                        int piece, int numberOfPieces, int ghostLevel,
                        vtkCompositeDataIterator* iter);
  void ExtractPolyData(vtkPolyData *polyData,
                       vtkCompositeDataSet *output,
                       int piece, int numberOfPieces, int ghostLevel,
                       vtkCompositeDataIterator* iter);
  void ExtractRectilinearGrid(vtkRectilinearGrid *rGrid,
                              vtkCompositeDataSet *output,
                              int piece, int numberOfPieces, int ghostLevel,
                              vtkCompositeDataIterator* iter);
  void ExtractStructuredGrid(vtkStructuredGrid *sGrid,
                             vtkCompositeDataSet *output,
                             int piece, int numberOfPieces, int ghostLevel,
                             vtkCompositeDataIterator* iter);
  void ExtractUnstructuredGrid(vtkUnstructuredGrid *uGrid,
                               vtkCompositeDataSet *output,
                               int piece, int numberOfPieces, int ghostLevel,
                               vtkCompositeDataIterator* iter);
private:
  vtkExtractPiece(const vtkExtractPiece&); // Not implemented.
  void operator=(const vtkExtractPiece&); // Not implemented.
};

#endif
