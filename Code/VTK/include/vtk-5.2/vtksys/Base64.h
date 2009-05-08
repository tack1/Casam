/*=========================================================================

  Program:   KWSys - Kitware System Library
  Module:    $RCSfile: Base64.h.in,v $

  Copyright (c) Kitware, Inc., Insight Consortium.  All rights reserved.
  See Copyright.txt or http://www.kitware.com/Copyright.htm for details.

     This software is distributed WITHOUT ANY WARRANTY; without even
     the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
     PURPOSE.  See the above copyright notices for more information.

=========================================================================*/
#ifndef vtksys_Base64_h
#define vtksys_Base64_h

#include <vtksys/Configure.h>

/* Redefine all public interface symbol names to be in the proper
   namespace.  These macros are used internally to kwsys only, and are
   not visible to user code.  Use kwsysHeaderDump.pl to reproduce
   these macros after making changes to the interface.  */
#if !defined(KWSYS_NAMESPACE)
# define kwsys_ns(x) vtksys##x
# define kwsysEXPORT vtksys_EXPORT
#endif
#define kwsysBase64          kwsys_ns(Base64)
#define kwsysBase64_Decode   kwsys_ns(Base64_Decode)
#define kwsysBase64_Decode3  kwsys_ns(Base64_Decode3)
#define kwsysBase64_Encode   kwsys_ns(Base64_Encode)
#define kwsysBase64_Encode1  kwsys_ns(Base64_Encode1)
#define kwsysBase64_Encode2  kwsys_ns(Base64_Encode2)
#define kwsysBase64_Encode3  kwsys_ns(Base64_Encode3)

#if defined(__cplusplus)
extern "C"
{
#endif

/**
 * Encode 3 bytes into a 4 byte string.
 */
kwsysEXPORT void kwsysBase64_Encode3(const unsigned char *src,
                                     unsigned char *dest);

/**
 * Encode 2 bytes into a 4 byte string.
 */
kwsysEXPORT void kwsysBase64_Encode2(const unsigned char *src,
                                     unsigned char *dest);

/**
 * Encode 1 bytes into a 4 byte string.
 */
kwsysEXPORT void kwsysBase64_Encode1(const unsigned char *src,
                                     unsigned char *dest);

/**
 * Encode 'length' bytes from the input buffer and store the encoded
 * stream into the output buffer. Return the length of the encoded
 * buffer (output). Note that the output buffer must be allocated by
 * the caller (length * 1.5 should be a safe estimate).  If 'mark_end'
 * is true than an extra set of 4 bytes is added to the end of the
 * stream if the input is a multiple of 3 bytes.  These bytes are
 * invalid chars and therefore they will stop the decoder thus
 * enabling the caller to decode a stream without actually knowing how
 * much data to expect (if the input is not a multiple of 3 bytes then
 * the extra padding needed to complete the encode 4 bytes will stop
 * the decoding anyway).
 */
kwsysEXPORT unsigned long kwsysBase64_Encode(const unsigned char *input,
                                             unsigned long length,
                                             unsigned char *output,
                                             int mark_end);

/**
 * Decode 4 bytes into a 3 byte string.  Returns the number of bytes
 * actually decoded.
 */
kwsysEXPORT int kwsysBase64_Decode3(const unsigned char *src,
                                    unsigned char *dest);

/**
 * Decode bytes from the input buffer and store the decoded stream
 * into the output buffer until 'length' bytes have been decoded.
 * Return the real length of the decoded stream (which should be equal
 * to 'length'). Note that the output buffer must be allocated by the
 * caller.  If 'max_input_length' is not null, then it specifies the
 * number of encoded bytes that should be at most read from the input
 * buffer. In that case the 'length' parameter is ignored. This
 * enables the caller to decode a stream without actually knowing how
 * much decoded data to expect (of course, the buffer must be large
 * enough).
 */
kwsysEXPORT unsigned long kwsysBase64_Decode(const unsigned char *input, 
                                             unsigned long length,
                                             unsigned char *output,
                                             unsigned long max_input_length);

#if defined(__cplusplus)
} /* extern "C" */
#endif

/* If we are building a kwsys .c or .cxx file, let it use these macros.
   Otherwise, undefine them to keep the namespace clean.  */
#if !defined(KWSYS_NAMESPACE)
# undef kwsys_ns
# undef kwsysEXPORT
# undef kwsysBase64
# undef kwsysBase64_Decode
# undef kwsysBase64_Decode3
# undef kwsysBase64_Encode
# undef kwsysBase64_Encode1
# undef kwsysBase64_Encode2
# undef kwsysBase64_Encode3
#endif

#endif
