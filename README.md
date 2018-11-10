<p align="center"><img width="30%" height="15%" src="origami_logo.png" /></p>

<p align="center">
 <a href="https://travis-ci.org/Cloud-CV/Origami">
	<img src="https://travis-ci.org/Cloud-CV/Origami.svg?branch=master"/>
 </a>
 <a href='https://coveralls.io/github/Cloud-CV/Origami?branch=master'>
	<img src='https://coveralls.io/repos/github/Cloud-CV/Origami/badge.svg?branch=master' alt='Coverage Status' />
 </a>
 <a href="https://david-dm.org/Cloud-CV/cvfy-frontend" title="dependencies status">
	<img src="https://david-dm.org/Cloud-CV/cvfy-frontend/status.svg"/>
 </a>
 <a href="https://david-dm.org/Cloud-CV/cvfy-frontend?type=dev" title="devDependencies status">
	<img src="https://david-dm.org/Cloud-CV/cvfy-frontend/dev-status.svg"/>
 </a>
 <a href="https://github.com/prettier/prettier" title="styled with">
	<img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"/>
 </a>
</p>

<p align="center"><img width="80%" height="60%" src="origami.png" /></p>
<h4 align="center">Artificial Intelligence as a Service</h4>

- Origami is an AI-as-a-service that allows researchers to easily convert their deep learning models into an online service that is widely accessible to everyone without the need to setup the infrastructure, resolve the dependencies, and build a web service around the deep learning model. By lowering the barrier to entry to latest AI algorithms, we provide developers, researchers and students the ability to access any model using a simple REST API call.

- The aim of this project is to create a framework that can help people create a web based demo out of their machine learning code and share it. Others can test the model without going into the implementation details. Usually testing models by other people involves a lot of preparation and setup. This project aims to cut that down.


This app is presently under active development and we welcome contributions. Please check out our [issues thread](https://github.com/Cloud-CV/Origami/issues) to find things to work on, or ping us on [Gitter](https://gitter.im/Cloud-CV/Origami).

# Installation Instructions

## For Windows

### VirtualBox

One of the easier ways to get started with Origami on Windows is by using a virtual machine of Ubunutu 16.04 LTS on Oracle's VirtualBox. We can install VirtualBox in just two easy steps.

#### Step One - Downloading Virtual Box
You can install Virtual Box on [Oracle's VirtualBox website](https://www.virtualbox.org/wiki/Downloads).
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48304752-b1ba6e00-e4ec-11e8-869b-32e10a5bd6f1.png" /></p>

Next, under "Virtual binaries," click on **Windows hosts** under "VirtualBox X.X.XX platform packages" to download the executable file for the latest version of VirtualBox. Wait for this to install and open the file when the download has completed.

#### Step Two - Starting installation

The .exe file will have the following format: VirtualBox-VersionNumber-BuildNumber-Win.exe.

- Once the setup wizard is open, follow the instructions. Everything can be kept as default, but feel free to change anything to your preference. 
- If you encounter a Windows User Account Control Warning pop-up, click **Yes** to accept and continue.
- When you reach the Network Interface dialouge box, be sure to proceed. VirtualBox will install network interfaces that will interact with the installed your virtual machine(s) and Windows. You will be temporarily disconnected from the Internet, but this connection will be re-established.

When you launch VirtualBox, you should see a screen similar to the one below. Congratualtions, you have successfully installed VirtualBox! 
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48304960-d87aa380-e4f0-11e8-88c7-255b4ee2d3a2.jpg" /></p>

### Setting up an Ubuntu 16.04 LTS virtual machine with VirtualBox

Origami works well on an Ubuntu 16.04 LTS virtual machine, which is what we will use when creating our virtual machine.

##### Disable Hyper-V

Hyper-V is a tool that provides hardware virtualization, or allows virtual machines to run on virtual hardware. While this sounds useful, it can hamper your ability to use a 64-bit version of Ubuntu for your virtual machine. To avoid issues further along the line, we will disable this feature. We **need** to use a 64-bit virtual machine, as this is required for Docker, which will be used to install Origami. 

**Note: This will disable other applications that may require Hyper-V, such as Docker for Windows. You can always switch Hyper-V back on, but you will only be able to use VirtualBox or the other application(s) at a time.**

- Press **Windows Key + X** and select **Apps and Features**
<p><img width="25%" height="25%" src="https://user-images.githubusercontent.com/24444124/48305225-e03c4700-e4f4-11e8-86b5-a61bcdc7449c.PNG" /></p>

- Under "Related settings," select **Programs and Features**
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48305228-e7635500-e4f4-11e8-9a43-f61bae3d3536.PNG" /></p>

- Next, click **Turn windows features on or off** on the left pane
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48305230-ea5e4580-e4f4-11e8-86fc-923151b7366e.PNG" /></p>

- Find **Hyper-V** and unmark it
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48305231-ed593600-e4f4-11e8-839f-13e20379f0da.PNG" /></p>

- Finally, click **OK** to save changes and reboot your computer

### Installing Ubuntu inside Windows with VirtualBox

Although, below, we install Ubuntu 16.04 for Origami, this method can be used to install all other distributions of Ubuntu. Please be aware that you have at least a minimum of 512 MB of RAM on your computer, but keep in mind 1 or more GB is recommended. 

#### Step One - Downloading the Ubuntu disk image (.iso file)

Navigate to [this page](http://releases.ubuntu.com/16.04/) to view the Ubuntu 16.04.5 LTS release page. Select the "64-bit PC (AMD64) desktop image" and save this for usage laters (install the 32-bit **desktop** image below the 64-bit option if you plan on using a 32-bit virtual machine).
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48305379-68235080-e4f7-11e8-9605-d95a7beaf75e.PNG" /></p>

#### Step Two - Creating the New Virtual Machine

After installing the disk image, we will create the virtual machine on VirtualBox. Launch VirtualBox and select **New** to proceed. Type in "Ubuntu" into the "Name:" field of the New Virtual Machine Wizard pop-up. Conveniently, this should adjust the "Type:" and "Version:" fields automatically as needed.
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48305431-4080b800-e4f8-11e8-8f5e-fd3be552898d.PNG" /></p>

#### Step Three - Setting Base Memory (RAM)

VirtualBox will give a recommendation of how much memory (RAM) to allocate for your virtual machine. If you do not have much RAM, especially 1 GB or less, stick with VirtualBox's recommendation. If you have ample RAM, try to stick to a quarter of your total RAM. If you do not know how much RAM you have, or as a matter of fact do not know what RAM is, stick with the recommendation.
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48305518-d79a3f80-e4f9-11e8-9717-2262d33bee47.PNG" /></p>

#### Step Four - Hard Disk

Since this is probably your first time using VirtualBox, create a new hard disk and then click "Next."
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48305562-0369f500-e4fb-11e8-9024-98f4ef428d34.PNG" /></p>

#### Step Five - Disk Type

Leave file type as "VDI (VirtualBox Disk Image)" and click "Next."
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48305596-a15dbf80-e4fb-11e8-8f4e-1cf406edf06b.PNG" /></p>

#### Step Six - Storage Details

A dynamically expanding virtual hard drive may be best, as it will only take up the space that you actually use on your virtual machine. However, there has been issues where the virtual hard drive fills up instead of actually expanding. Thus, it is recommended to pick "Fixed size."
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48305622-35c82200-e4fc-11e8-87b8-019e9f0f088f.PNG" /></p>

#### Step Seven - Disk File Location and Hard Drive Size

Although Origami itself does not take up relatively much space, when installing Docker and other software, hard drive space can run low. Be sure to add as much hard drive space as you can, as it is a bit tedious to expand hard drive space after the virtual machine has been fully set up. 
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48305653-c7379400-e4fc-11e8-9311-433bde192e17.PNG" /></p>

#### Step Eight - Create the Virtual Hard Drive

Simply click "Create" from the dialouge box from the step prior and wait for the virtual hard drive to be created. As this is usually a large file, it may take a bit of time. 
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48305685-547ae880-e4fd-11e8-8e85-e1aaa487d831.PNG" /></p>

#### Step Nine - Adding the Downloaded Ubuntu Disk Image

Before we boot the virtual machine, we need to add the downloaded Ubuntu disk image (.iso file) onto the virtual machine. While your virtual machine is selected in the left pane, click **Settings** and then **Storage**. Next, under "IDE Controller," select **Empty** and click on the little disk icon. In the menu, click **Choose Virtual Optical Disk File...** next to the folder icon. 
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48305769-bdaf2b80-e4fe-11e8-9910-382b4c3d8814.PNG" /></p>

Navigate to the Ubuntu disk image file downloaded earlier and click "Open."

**Note: Both disk image versions for Ubuntu desktop are downloaded in the image below. As we are using a 64-bit virtual machine, we are opening the 64-bit .iso file.**
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48305811-812fff80-e4ff-11e8-94c2-6c8415cc1f15.PNG" /></p>

Afterward, "Empty" should now be replaced by the filename of our disk image file, and we can now click **OK**.
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48305818-97d65680-e4ff-11e8-81e0-833581ef1d11.PNG" /></p>

#### Step Ten - Downloading Ubuntu onto your virtual machine

Double-click your virtual machine to start it up. You may get various pop-ups providing warnings and instructions in regard to operating a virtual machine with VirtualBox. Be sure to read these, and you can mark not to see these again if you would like. Once Ubuntu is booted up, click **Install Ubuntu** and follow the instructions as if you were installing Ubuntu on an actual hard drive. 
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48305898-bf79ee80-e500-11e8-83c9-e633b70a4ed6.PNG" /></p>
<p><img width="50%" height="50%" src="https://user-images.githubusercontent.com/24444124/48305903-cbfe4700-e500-11e8-8af6-a4a5e63d916a.PNG" /></p>

## Installing Docker

We use Docker to install Origami. As Origami runs well on Ubuntu, we recommend you follow the official Docker documentation [here](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-repository). Use the "repository method" for the installation of Docker CE on this site. CE stands for "Community Edition," as is designed for developers and ordinary users. Make sure to install the latest version of Docker (skip step #3 on "Installing Docker CE"), and if you followed the tutorial above and created an Ubuntu virtual machine, follow the `x86_64` architecture command when setting up the repository.

If you are using MacOS, follow the instructions on Docker's site [here](https://docs.docker.com/docker-for-mac/install/).

### Setting the environment variables

* `origami.env` stores all the environment variables necessary to run Origami.

1. `HOST` should be set to the hostname of the server
2. `PORT` should be set to the port you want the server to listen on. (Generally 80)
3. `DB_NAME` will be used to set the name for your postgres database
4. `DB_PASS` will be used to set the password for the database user. This is also the admin password
5. `DB_USER` is the username for a user who can modify the database. This is also the admin username
6. `DB_USER_EMAIL` stores the email for the admin
7. `DB_HOST `should be set to postgres in production and localhost in development
8. `REDIS_HOST` should be set to redis and localhost in development

To create the file, `cp origami.env.sample origami.env` and edit the file with the above fields.

* `Origami/outCalls/config.js` stores config variables needed by the UI.

1. `CLIENT_IP` should be set to the same value as `HOST` in `origami.env`
2. `CLIENT_PORT` should be set to the same value as `PORT` in `origami.env`
3. For `DROPBOX_API_KEY` , check step 3 of [configuring Origami](http://cloudcv-origami.readthedocs.io/en/latest/web-app.html#configuration) 

## Production setup instructions 

**Use docker to setup Origami on production**

### Running the server

You can run the server with the help of docker and docker-compose.

Run  `docker-compose up`

## Development setup instructions

**This application requires node v5+ and Python 2.7/3.4+**

### Create a Virtual Environment

1. `pip install virtualenv`
2. `virtualenv venv` venv = Name of virtualenv
3. `source venv/bin/activate`

**Note: Step 2 will create a folder named venv in your working directory**

### Getting the code and dependencies

1. Clone this repository

2. Navigate to the repo. Usually `cd Origami/`

3. Add all the python dependencies.
   `pip install -r requirements.txt` 

4. Add all the javascript dependencies
   `yarn` (preferably) or `npm install`

5. Setup redis 
   `docker run -d -p 6379:6379 --name origami-redis redis:alpine`

6. Setup the environment

   `source origami.env`

### Setting up the database

#### Create all the tables

```
python manage.py makemigrations
python manage.py migrate
```

#### Create admin account

`python manage.py initadmin`

### Start the server

1. Start the server by `python manage.py runserver --noworker`
2. Start the worker by `python manage.py runworker`
3. `yarn run dev`
4. Go to [localhost:8000](http://localhost:8000/)
  Visit [Read the docs](http://cloudcv-origami.readthedocs.io/en/latest/) for further instructions on Getting started

## Contributing to Origami

1. Make sure you run tests on your changes before you push the code using:
	* `python manage.py test`
	* `yarn run test`

2. Fix lint issues with the code using:
	* `yarn run lint:fix`

## License

This software is licensed under GNU AGPLv3. Please see the included `License` file. All external libraries, if modified, will be mentioned below explicitly.
