
add_library(
    helloWorld
    src/printHello/printHello.h
    src/printHello/printHello.c
)

# SETS PATH FOR INCLUDE STATEMENTS FOR LIBRARY
target_include_directories(helloWorld PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/src/printHello) 

# SETS CMAKE DEFINITIONS
target_compile_definitions(helloWorld PUBLIC PRINT_HELLO_VERSION=4.0)