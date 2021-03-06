/*=========================================================================

  Program:   Visualization Toolkit
  Module:    $RCSfile: vtkNonLinearCell.h,v $

  Copyright (c) Ken Martin, Will Schroeder, Bill Lorensen
  All rights reserved.
  See Copyright.txt or http://www.kitware.com/Copyright.htm for details.

     This software is distributed WITHOUT ANY WARRANTY; without even
     the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
     PURPOSE.  See the above copyright notice for more information.

=========================================================================*/
// .NAME vtkNonLinearCell - abstract superclass for non-linear cells
// .SECTION Description
// vtkNonLinearCell is an abstract superclass for non-linear cell types.
// Cells that are a direct subclass of vtkCell or vtkCell3D are linear;
// cells that are a subclass of vtkNonLinearCell have non-linear interpolation
// functions. Non-linear cells require special treatment when tessellating
// or converting to graphics primitives. Note that the linearity of the cell
// is a function of whether the cell needs tessellation, which does not
// strictly correlate with interpolation order (e.g., vtkHexahedron has
// non-linear interpolation functions (a product of three linear functions
// in r-s-t) even thought vtkHexahedron is considered linear.)

#ifndef __vtkNonLinearCell_h
#define __vtkNonLinearCell_h

#include "vtkCell.h"

class VTK_FILTERING_EXPORT vtkNonLinearCell : public vtkCell
{
public:
  vtkTypeRevisionMacro(vtkNonLinearCell,vtkCell);
  void PrintSelf(ostream& os, vtkIndent indent);

  // Description:
  // Non-linear cells require special treatment (tessellation) when
  // converting to graphics primitives (during mapping). The vtkCell
  // API IsLinear() is modified to indicate this requirement.
  virtual int IsLinear() {return 0;}

protected:
  vtkNonLinearCell();
  ~vtkNonLinearCell() {}

private:
  vtkNonLinearCell(const vtkNonLinearCell&);  // Not implemented.
  void operator=(const vtkNonLinearCell&);  // Not implemented.
};

#endif


