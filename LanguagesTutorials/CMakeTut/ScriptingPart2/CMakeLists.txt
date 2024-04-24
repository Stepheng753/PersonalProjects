# This is a test project

cmake_minimum_required(VERSION 3.16)
project(MyProject VERSION 1.0.0)


set(MY_VAR "I am a Variable")
set(HASHTAGS "###############################\n")
message(STATUS 
"${HASHTAGS}   This is a Status Message
   MY_VAR : ${MY_VAR}
   PROJECT_NAME : ${PROJECT_NAME}
   PROJECT_VERSION : v${PROJECT_VERSION}
   ${HASHTAGS}")


if("FALSE")
    message(STATUS "${HASHTAGS}   Condition was MET \n   ${HASHTAGS}")
else()
    message(STATUS "${HASHTAGS}   Condition was NOT MET \n   ${HASHTAGS}")
endif()
