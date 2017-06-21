********
Library
********

The cvfy-lib library lets you integrate your machine learning code with the Origami web app. All it takes is a couple of function calls. Let's get started!

Configuration
#############

CVFY-lib supports python2 (on OSX and Linux) only as of now.
Download cvfy.py from `Github <github.com/Cloud-CV/Origami>`_ to your projects root directory (where the launcher python script is).

CVFY-lib requires installation of some additional packages::

	sudo apt install python-pip python-dev python-numpy python-opencv

CVFY-lib has a file requirements.txt that contains dependency python packages::

	pip install -r requirements.txt

Register a new app
##################

CVFY-lib registration requires a TOKEN from the CVFY webapp.
This TOKEN can be copied from the registration page of the application.
Or by clicking Get Token on the app on user profile page.

For a complete example, see this `Gist <https://gist.github.com/tocttou/021c51a9055dea0ac002b7657c01fc25>`_.
cvfy.py is imported to the launcher python script::

	import cvfy

CVFY-lib is registered with::

	app = cvfy.register($TOKEN)

Note that $TOKEN here is replaced by the TOKEN obtained from CVFY webapp.
CVFY-lib requires a main function that is executed when a request is received.
This function must be decorated with both::

	@cvfy.crossdomain
	@app.listen()


This function must return 'OK' in the end.
Lastly, it should have a statement that starts the app,::
	
	app.run()

Input functions
###############

* *getTextArray()*:
	Arguments:
		None

	Returns:
		Array of text elements

	This function works with:
		Text Input Component

		Text Image Input Component
		An example can bee seen at this `gist <https://gist.github.com/tocttou/ceae739c32855a657546aa8420c4bbb7>`_.

* *getImageArray()*:
	Arguments:
		Mode (String):
			* file_path

			Returns an array of local paths to the uploaded images. This is the default mode.
			An example can be seen at this `gist <https://gist.github.com/tocttou/1fd770483294fab36cd17a163e21c4c9>`_.

			* numpy_array

			Returns an Array/Tuple of the uploaded images as "numpy array" elements (like the image objects used in OpenCV) An example can be seen at this `gist <https://gist.github.com/AvaisP/85b74c1a76c79bae0003c0a685b7eb95>`_.
	
	Returns:
		Array of "local path of images" in text obtained after saving images to disk receievd from CVFY webapp.

	This function works with:
		Image Input Component

		Text Image Input Component
		An example can be seen at this `gist <https://gist.github.com/tocttou/1fd770483294fab36cd17a163e21c4c9>`_.

* Hybrid components that require multiple types of Input (like Text Image input component)

	Such components require usage of multiple functions at once.
	For example, for Text Image Input component,::

		all_text = cvfy.getTextArray()
		all_image_paths = cvfy.getImageArray()

Output functions
################

* *sendTextArray()*
	sendTextArray injects an array of text into fields in Output component.

	Arguments:
		Array/Tuple of text elements
	
	Returns:
		None

	This function works with:
		Text Output Component
		An example can bee seen at this `gist <https://gist.github.com/tocttou/da35d86376f134d232907d626bccee9e>`_.

* *sendImageArray()*
	cvfy.sendImageArray() injects an array of images into fields in Output component.
	
	Arguments:
		Array/Tuple of image data objects. These data objects can be of multiple types depending upon the mode.

		Mode (String)

			* file_path

			Array/Tuple of "local path of images on the disk" in text

			An example can be seen at this `gist <https://gist.github.com/tocttou/591d28bb89641ba7b94783687be65fdb>`_.

			* numpy_array

			Array/Tuple of "numpy array" elements (like the image objects used in OpenCV)

			An example can be seen at this `gist <https://gist.github.com/tocttou/58ef4c77d06c0190443ec721e1a233d4>`_.

	Returns:
		None

	This function works with:
		Image Output Component

* *sendGraphArray()*
	cvfy.sendGraphArray() injects an array of plot data into graph in Output component.

	Arguments:
		Array/Tuple of "arrays of plot dictionaries". Each entry in these arrays of plot dictionaries
		have two keys, 'x' and 'y' which take different values depending upon the type of graph.
	
	*Type of Graph*

	* Bar Graph

		x: INTEGER
		y: INTEGER
		'x' and 'y' correspond to X-Axis and Y-Axis on the graph.

		An example can be seen at this `gist <https://gist.github.com/tocttou/f82f730be453f872395c5f30df89b763>`_.

	* Scatter Graph

		x: INTEGER
		y: INTEGER
		'x' and 'y' correspond to X-Axis and Y-Axis on the graph.

		An example can be seen at this `gist <https://gist.github.com/tocttou/f82f730be453f872395c5f30df89b763>`_.

	* Area Graph

		x: INTEGER
		y: INTEGER
		'x' and 'y' correspond to X-Axis and Y-Axis on the graph.

		An example can be seen at this `gist <https://gist.github.com/tocttou/f82f730be453f872395c5f30df89b763>`_.

	* Pie Chart

		x: STRING
		y: INTEGER
		'x' correponds to the sectio name, 'y' correponds to share of that section in the pie.

		An example can be seen at this `gist <https://gist.github.com/tocttou/c0885ce4077d972765b00c56f79b5445>`_.

	Returns:
		None

	This function works with:
		Bar Graph Output Component
		Scatter Graph Component
		Area Graph Component
		Pie Chart Component

Terminal functions
##################

To use the terminal, it must first be enabled for the app on its registration page.
Go to user profile page and click on Modify button on the app then select Metadata
thereafter to go to registration page.
Tick the Show Terminal of demo page checkbox here.

*sendTextArrayToTerminal()*
	cvfy.sendTextArrayToTerminal() allows you to send text feedback to a terminal style interface on the demo page.
	This text data can be sent at any time (before or after the request processing is complete).
	Each element of the array will be put on a newline in the terminal.
	
	Arguments:
		Array/Tuple of text elements

	Returns:
		None

	This function works with:
		All components
		An example can bee seen at this `gist <https://gist.github.com/tocttou/403196805e33af9d7fe0900e7ee5c4c2>`_.