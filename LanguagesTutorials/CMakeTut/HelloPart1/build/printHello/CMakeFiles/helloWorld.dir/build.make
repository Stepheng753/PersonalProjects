# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.16

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = "/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1"

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = "/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1/build"

# Include any dependencies generated for this target.
include printHello/CMakeFiles/helloWorld.dir/depend.make

# Include the progress variables for this target.
include printHello/CMakeFiles/helloWorld.dir/progress.make

# Include the compile flags for this target's objects.
include printHello/CMakeFiles/helloWorld.dir/flags.make

printHello/CMakeFiles/helloWorld.dir/src/printHello/printHello.c.o: printHello/CMakeFiles/helloWorld.dir/flags.make
printHello/CMakeFiles/helloWorld.dir/src/printHello/printHello.c.o: ../printHello/src/printHello/printHello.c
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir="/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1/build/CMakeFiles" --progress-num=$(CMAKE_PROGRESS_1) "Building C object printHello/CMakeFiles/helloWorld.dir/src/printHello/printHello.c.o"
	cd "/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1/build/printHello" && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -o CMakeFiles/helloWorld.dir/src/printHello/printHello.c.o   -c "/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1/printHello/src/printHello/printHello.c"

printHello/CMakeFiles/helloWorld.dir/src/printHello/printHello.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/helloWorld.dir/src/printHello/printHello.c.i"
	cd "/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1/build/printHello" && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E "/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1/printHello/src/printHello/printHello.c" > CMakeFiles/helloWorld.dir/src/printHello/printHello.c.i

printHello/CMakeFiles/helloWorld.dir/src/printHello/printHello.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/helloWorld.dir/src/printHello/printHello.c.s"
	cd "/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1/build/printHello" && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S "/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1/printHello/src/printHello/printHello.c" -o CMakeFiles/helloWorld.dir/src/printHello/printHello.c.s

# Object files for target helloWorld
helloWorld_OBJECTS = \
"CMakeFiles/helloWorld.dir/src/printHello/printHello.c.o"

# External object files for target helloWorld
helloWorld_EXTERNAL_OBJECTS =

printHello/libhelloWorld.a: printHello/CMakeFiles/helloWorld.dir/src/printHello/printHello.c.o
printHello/libhelloWorld.a: printHello/CMakeFiles/helloWorld.dir/build.make
printHello/libhelloWorld.a: printHello/CMakeFiles/helloWorld.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir="/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1/build/CMakeFiles" --progress-num=$(CMAKE_PROGRESS_2) "Linking C static library libhelloWorld.a"
	cd "/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1/build/printHello" && $(CMAKE_COMMAND) -P CMakeFiles/helloWorld.dir/cmake_clean_target.cmake
	cd "/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1/build/printHello" && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/helloWorld.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
printHello/CMakeFiles/helloWorld.dir/build: printHello/libhelloWorld.a

.PHONY : printHello/CMakeFiles/helloWorld.dir/build

printHello/CMakeFiles/helloWorld.dir/clean:
	cd "/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1/build/printHello" && $(CMAKE_COMMAND) -P CMakeFiles/helloWorld.dir/cmake_clean.cmake
.PHONY : printHello/CMakeFiles/helloWorld.dir/clean

printHello/CMakeFiles/helloWorld.dir/depend:
	cd "/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1/build" && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" "/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1" "/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1/printHello" "/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1/build" "/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1/build/printHello" "/home/stepheng753/Documents/Projects/PersonalProjects/Programming Languages Tutorials/CMakeTut/HelloPart1/build/printHello/CMakeFiles/helloWorld.dir/DependInfo.cmake" --color=$(COLOR)
.PHONY : printHello/CMakeFiles/helloWorld.dir/depend
