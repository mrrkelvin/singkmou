# singkmou
A booking application for karaoke. (For Uni Project purpose)

1.      What is the project is all about
        A booking application for karaoke. A customer can book the time for sing karaoke within (1-10) hours per day. There are 4 rooms can be chosen which are small, medium, large , and vip.

2.      The module/functionalities the mobile app has
        -Booking Module
         To place booking and send the booking request to the server.
        -Booking History Module
         To retrieve and view the passed booking.
        -Notification
        To notify the customer whenever their booking is accepted or rejected.
        -Get phone number automatically
        Just an extra feature to get phone number from smartphone provided the phone number is visible on the smartphone.
        You may check on SETTINGS->ABOUT DEVICE->STATUS->PHONE NUMBER.

3.      What libraries/external API’s such as Google API or Firebase API are being used(if any)
        Firebase API as domain to send the notification.

4.      How to setup the development environment – The required libraries(.jar or .js files), the plugin required especially hybrid project
        1. First, install Node.js. Then, install the latest Cordova and Ionic command-line tools in your terminal.
        2. Open cmd, and type "npm install -g cordova ionic".
        3. After finsihing installing ionic cordova, type "ionic start [project_name] blank --type ionic1", and your ionic project will be created based on blank template.
        4. Go to this https://creator.ionic.io, to design your ionic project interfaces and export as .zip.
        5. Then, do unzip the folder and extract to the www folder of your ionic project.
        6. Open your text editor, to start coding, enjoy.
        
        Required cmd for plugin:(cd ../[project name])
        1. ionic cordova platform add android -> to add android platform to your ionic project. (Make sure you have the android sdk files)
        2. ionic cordova build android -> to build your project into apk.
        3. ionic cordova emulate android -> to emualte your project into virtual devices.
        4. ionic cordova run android -> to run and install your project into your android devices.
        5. ionic cordova plugin add cordova-plugin-sim -> to retrieve your phone number.
        6. ionic cordova plugin add cordova-sqlite-storage -> to enable to use sqlite in yur project.
        7. ionic cordova plugin add phonegap-plugin-push --variable SENDER_ID="<your-gcm-project-number>" -> to offer support to receive and handle native push notifications with a single unified API
        8. ionic config set gcm_key <your-gcm-project-number> -> to set sender id retrieved from Cloud Messaging in Firebase.
        9. ionic io init -> create an new app in Ionic.io to use the ionic push notifications service.

#Ionic App Base
=====================

A starting project for Ionic that optionally supports using custom SCSS.

## Using this project

We recommend using the [Ionic CLI](https://github.com/driftyco/ionic-cli) to create new Ionic projects that are based on this project but use a ready-made starter template.

For example, to start a new Ionic project with the default tabs interface, make sure the `ionic` utility is installed:

```bash
$ npm install -g ionic
```

Then run: 

```bash
$ ionic start myProject tabs
```

More info on this can be found on the Ionic [Getting Started](http://ionicframework.com/getting-started) page and the [Ionic CLI](https://github.com/driftyco/ionic-cli) repo.

=======

