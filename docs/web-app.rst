****************
Origami Web app
****************

The web app provides an interface to interact with demos created by using the library.

Configuration
#############

A root user is created for an installation of Origami.
Origami requires some configuration before it can connect to Github.

* **Step 1: Create a Github developer application**

Go to Github Developer Applications page and "Register a new application" and enter the application details.

**Application Name**
Choose a suitable name for your application.

**Homepage URL**
This is the base-URL of Origami application. This is the URL where this webapp is running.
For *local deployments* on default port, it is "http://localhost:8000/".
For the current Origami installation, it is "http://origami.cloudcv.org/".

**Application description**
Choose a suitable description for your application.

**Authorization callback URL**
This URL is Homepage URL + "/auth/github/login/callback".
For *local deployments* on default port, it is "http://localhost:8000/auth/github/login/callback".
For the current Origami installation, it is "http://origami.cloudcv.org/auth/github/login/callback".

Now click on the "Register application" button to register this application.
On the subsequent page, note down the Client ID and Client Secret.

* **Step 2: Input details of Github application on initial setup page.**

This page is visible when the owner of this Origami installation runs this application for the first time.
Following inputs are required:

**Root user's Github username**
This is the Github username of the person who is the owner of this Origami installation.

**Github Client ID**
This is the "Client ID" noted down in Step 1.

**Github Client Secret**
This is the "Client Secret" noted down in Step 1.

**Application IP address**
This is the IP address (or domain name) where the Origami webapp is running.
It is pre-filled with "0.0.0.0".

**Allow new users**
A root user can forbid other users (those who want to make demos) of this application from using it.
In that case, only the root user can login and create demos.

**Is this deployment by CloudCV**
Check this option if the deployment is by CloudCV. This adds some customizations.

Origami requires a Dropbox App key if you intend to allow users to download/upload from Dropbox

* **Step 3: Create a Dropbox developer application (optional)**

Do this step if you intend to allow users to upload images from their dropbox as input to the demos.
Go to Dropbox Developers Page page and click on "Create your app".

In step 1, choose the *Dropbox API*

In step 2, select *Full Dropbox*. This allows the app access to the users full dropbox.

Now, Name your app and click on create app. The name needs to be *unique*.

Once the app is created, Dropbox redirects you to its configuration page. Note down the App Key

Also, find *Chooser/Saver domains* and add the domains
0.0.0.0
localhost
origami.cloudcv.org

Paste the App Key into *outCalls/config.js*.

Creating a new app
##################

* **Step 1: Login and provision an App**

After the initial setup, click on Create a Demo button on the homepage.
This takes you to github for login. Authorize the application there when asked.
Upon successful login, you are taken to the user profile that lists all his deployed apps.

Click on the + button here to create a new application. This takes you to the Registration page.

* **Step 2: Create an App**

Following inputs are required:

**Appname**
This is the name of your application. This appears on the top of demo page.

**IP of service**
This is the IP address of the system that will be running your machine learning code using Origami-lib.
For local deployments, it is 0.0.0.0.

**Port for service**
This is the preferred port for the service (machine learning code).
This port must be free for Origami-lib to work.

**Description (optional)**
Description for your application. This will be displayed below the application name of demo page.

**Show Terminal on demo page**
This displays a Terminal style text box below the I/O components on the demo page.
Additional data can be sent to this terminal using Origami-lib.

If an *error box* says "This webapp cannot be reached on it's public IP",
you need to check the "Webapp is running locally" checkbox.
Checking this checkbox will make the webapp check local connectivity to itself.

If you see a *green tick* symbol next to the token, your app is configured correctly.
Copy this token for use in Origami-lib and click on "Save" button.

If you see a *red hand* symbol next to the token, your app is configured incorrectly.
You may not be able to connect to your app.

I/O Components
##############

The following procedure applies to both Input and Ouput components.

* **Step 1: Configuring the Input component**

After registering the application, you are taken to the input component selection page.

Choose the kind of Input component your machine learning code requires.
If your code requires processing 1 (or more) images, you need **Image Input** component.
If it requires both an image and a text input with it, you need **Text Image Input** component and so on.

After choosing the Input component of your choice, click on **Modify** button on the component you want.
This opens the modification modal for that component. Each component can have different type of configuration.
For example, **Text Input component** has an **Add Label** option that adds a new text field for input.
The text entered here appears in the placeholder for the field in the Input component on demo page.
You can add or delete any number of fields in Input component.
Press **OK** to save the component.

* **Step 2: Previewing the Input component**

After configuring the Input component, you can preview it by pressing the **Preview** button on the component.
This opens a modal that shows how the Input component will look like on the demo page.

If you are satisfied with the preview, you can click on **OK** and move to the next step.
Otherwise you can edit the Input component and see the preview again.

* **Step 3: Using the Input component**

Once you are satisfied with the preview, you can press the Use button on the component to add to the demo page.

You can come back to this page anytime from the user profile page by clicking on **Modify** on the project
and selecting **Input** thereafter.

Refreshing the page or going back refreshes the app-state.
In that case, you have to go back to the Input component page from the user profile page by clicking **Modify**
and selecting **Input** thereafter.

Publish a demo
##############

A demo is published as soon as the app is registered.

The demo can be accessed by clicking on **Demo** button on the app on user profile page.
A shortened URL for the demo can be created from the user profile page by clicking
**Get permalink** on the app.

Modify/Delete an App
####################

* **Modifying**

Registration data and I/O components can be modified later on as well from the **user profile page**
by clicking on **Modify** button on the component and then in the modal that appears:

**Modify Registration data**
Click on "Metadata"

**Modify Input data**
Click on "Input"

**Modify Output data**
Click on "Output"

* **Deleting**

An application can be deleted by visiting the **user profile** page and clicking on
**Delete** button on the component.
