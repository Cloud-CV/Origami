********
Library
********

The origami-lib library lets you integrate your machine learning code with the Origami web app. All it takes is a couple of function calls. Let's get started!

Configuration
#############

origami-lib supports python2 (on OSX and Linux) only as of now.
Download origami.py from `Github <github.com/Cloud-CV/Origami>`_ to your projects root directory (where the launcher python script is).

origami-lib requires installation of some additional packages::

	sudo apt install python-pip python-dev python-numpy python-opencv

origami-lib has a file requirements.txt that contains dependency python packages::

	pip install -r requirements.txt

Register a new app
##################

origami-lib registration requires a TOKEN from the Origami webapp.
This TOKEN can be copied from the registration page of the application.
Or by clicking Get Token on the app on user profile page.

For a complete example, see this `Gist <https://gist.github.com/NSDCars5/56f3049286731373640b2f3afad88f28>`_.
origami.py is imported to the launcher python script::

	from origami import origami

origami-lib is registered with::

	app = origami.register($TOKEN)

Note that $TOKEN here is replaced by the TOKEN obtained from Origami webapp.
origami-lib requires a main function that is executed when a request is received.
This function must be decorated with both::

	@origami.crossdomain
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
		An example can bee seen at this `gist <https://gist.github.com/NSDCars5/c63124fa951423a3b4638664d7e3646b>`_.

* *getImageArray()*:
	Arguments:
		Mode (String):
			* file_path

			Returns an array of local paths to the uploaded images. This is the default mode.
			An example can be seen at this `gist <https://gist.github.com/NSDCars5/0d3888bad9ff119f6886f2d338cc4904>`_.

			* numpy_array

			Returns an Array/Tuple of the uploaded images as "numpy array" elements (like the image objects used in OpenCV) An example can be seen at this `gist <https://gist.github.com/NSDCars5/887d50defd21dabf85cc02bdd80211c6>`_.
	
	Returns:
		Array of "local path of images" in text obtained after saving images to disk receievd from Origami webapp.

	This function works with:
		Image Input Component

		Text Image Input Component
		An example can be seen at this `gist <https://gist.github.com/NSDCars5/0d3888bad9ff119f6886f2d338cc4904>`_.

* Hybrid components that require multiple types of Input (like Text Image input component)

	Such components require usage of multiple functions at once.
	For example, for Text Image Input component,::

		all_text = origami.getTextArray()
		all_image_paths = origami.getImageArray()

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
		An example can bee seen at this `gist <https://gist.github.com/NSDCars5/e192457a3f6dffc16c9be83ea10826e5>`_.

* *sendImageArray()*
	origami.sendImageArray() injects an array of images into fields in Output component.
	
	Arguments:
		Array/Tuple of image data objects. These data objects can be of multiple types depending upon the mode.

		Mode (String)

			* file_path

			Array/Tuple of "local path of images on the disk" in text

			An example can be seen at this `gist <https://gist.github.com/NSDCars5/e7b9af826c8055e6949ea9092e3be343>`_.

			* numpy_array

			Array/Tuple of "numpy array" elements (like the image objects used in OpenCV)

			An example can be seen at this `gist <https://gist.github.com/NSDCars5/d791ddf3afcbf377ba55cc8c87556f24>`_.

	Returns:
		None

	This function works with:
		Image Output Component

* *sendGraphArray()*
	origami.sendGraphArray() injects an array of plot data into graph in Output component.

	Arguments:
		Array/Tuple of "arrays of plot dictionaries". Each entry in these arrays of plot dictionaries
		have two keys, 'x' and 'y' which take different values depending upon the type of graph.
	
	*Type of Graph*

	* Bar Graph

		x: INTEGER
		y: INTEGER
		'x' and 'y' correspond to X-Axis and Y-Axis on the graph.

		An example can be seen at this `gist <https://gist.github.com/NSDCars5/ed9c7b3ee0745ea746142da4629d9cb3>`_.

	* Scatter Graph

		x: INTEGER
		y: INTEGER
		'x' and 'y' correspond to X-Axis and Y-Axis on the graph.

		An example can be seen at this `gist <https://gist.github.com/NSDCars5/ed9c7b3ee0745ea746142da4629d9cb3>`_.

	* Area Graph

		x: INTEGER
		y: INTEGER
		'x' and 'y' correspond to X-Axis and Y-Axis on the graph.

		An example can be seen at this `gist <https://gist.github.com/NSDCars5/ed9c7b3ee0745ea746142da4629d9cb3>`_.

	* Pie Chart

		x: STRING
		y: INTEGER
		'x' correponds to the sectio name, 'y' correponds to share of that section in the pie.

		An example can be seen at this `gist <https://gist.github.com/NSDCars5/ed9c7b3ee0745ea746142da4629d9cb3>`_.

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
	origami.sendTextArrayToTerminal() allows you to send text feedback to a terminal style interface on the demo page.
	This text data can be sent at any time (before or after the request processing is complete).
	Each element of the array will be put on a newline in the terminal.
	
	Arguments:
		Array/Tuple of text elements

	Returns:
		None

	This function works with:
		All components
		An example can bee seen at this `gist <https://gist.github.com/NSDCars5/efbb52b06a3a44b810452b5f6b00c4cc>`_.
