
# CREATES AN EXECTUABLE RUNNING THE FOLLOWING C FILE
add_executable(helloWorld.sh main.c)

# ATTACHES THE EXECTUABLE TO THE LIBRARY
target_link_libraries(helloWorld.sh PRIVATE helloWorld)

# COPIES EXECTUABLE TO OUTER DIR
add_custom_command(TARGET helloWorld.sh POST_BUILD
                   COMMAND ${CMAKE_COMMAND} -E copy helloWorld.sh ../)