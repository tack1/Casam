IF(EXISTS "${CMAKE_ROOT}/Modules/FindPackageHandleStandardArgs.cmake")
  INCLUDE("${CMAKE_ROOT}/Modules/FindPackageHandleStandardArgs.cmake")
ELSE(EXISTS "${CMAKE_ROOT}/Modules/FindPackageHandleStandardArgs.cmake")
  GET_FILENAME_COMPONENT(_CURRENT_DIR  "${CMAKE_CURRENT_LIST_FILE}" PATH)
  INCLUDE("${_CURRENT_DIR}/FindPackageHandleStandardArgs2.cmake")
ENDIF(EXISTS "${CMAKE_ROOT}/Modules/FindPackageHandleStandardArgs.cmake")
