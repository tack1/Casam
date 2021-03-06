/*=========================================================================

  Program:   Visualization Toolkit
  Module:    $RCSfile: vtkPNGReader.h,v $

  Copyright (c) Ken Martin, Will Schroeder, Bill Lorensen
  All rights reserved.
  See Copyright.txt or http://www.kitware.com/Copyright.htm for details.

     This software is distributed WITHOUT ANY WARRANTY; without even
     the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
     PURPOSE.  See the above copyright notice for more information.

=========================================================================*/
// .NAME vtkPNGReader - read PNG files
// .SECTION Description
// vtkPNGReader is a source object that reads PNG files.
// It should be able to read most any PNG file
//
// .SECTION See Also
// vtkPNGWriter

#ifndef __vtkPNGReader_h
#define __vtkPNGReader_h

#include "vtkImageReader2.h"

class VTK_IO_EXPORT vtkPNGReader : public vtkImageReader2
{
public:
  static vtkPNGReader *New();
  vtkTypeRevisionMacro(vtkPNGReader,vtkImageReader2);
  virtual void PrintSelf(ostream& os, vtkIndent indent);

  // Description:
  // Is the given file a PNG file?
  virtual int CanReadFile(const char* fname);

  // Description:
  // Get the file extensions for this format.
  // Returns a string with a space separated list of extensions in
  // the format .extension
  virtual const char* GetFileExtensions()
    {
      return ".png";
    }

  // Description:
  // Return a descriptive name for the file format that might be useful in a GUI.
  virtual const char* GetDescriptiveName()
    {
      return "PNG";
    }

protected:
  vtkPNGReader() {};
  ~vtkPNGReader() {};

  virtual void ExecuteInformation();
  virtual void ExecuteData(vtkDataObject *out);
private:
  vtkPNGReader(const vtkPNGReader&);  // Not implemented.
  void operator=(const vtkPNGReader&);  // Not implemented.
};
#endif


