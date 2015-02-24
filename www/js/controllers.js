angular.module('starter.controllers', [])

.controller('LocationCtrl', function($scope, $state) {

  // PLEASE NOTE:  you must install the apache cordova geolocation plugin for this to function.
  // You can install it with the following command:  ionic plugin add org.apache.cordova.geolocation

  $scope.locationString = "Please click the button above to get your location.";

  // this function is bound to the button on the location page which gets the current location
  $scope.getCurrentLocation = function() {

    // ensure that the geolocator is available
    // on error, send the appropriate message
    if (navigator.geolocation) {

      // this function gets the current location of the device
      // the current location will be stored in the position attribute variable
      // the device latitude and longitude are located in the position.coords array
      navigator.geolocation.getCurrentPosition(function(position) {

        // get the latitude and longitude and create a string displaying everything
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $scope.locationString = 'Your current location is... Latitude: '+lat+' and Longitude: '+lng;
        $state.go('tab.location');
      });
    } else {
      $scope.locationString = "Sorry, but the computer Gremlins struck again!  Yell at Rob!";
      $state.go('tab.location');
    }
    
  }
})

.controller('CameraCtrl', function($scope, $state) {

  // PLEASE NOTE:  you must install the apache cordova camera plugin for this to function.
  // You can install it with the following command:  ionic plugin add org.apache.cordova.camera

  // set the default image URI (a color bar image)
  $scope.imageURI = 'http://www.dvinfo.net/forum/attachments/view-video-display-hardware-software/4853d1193613730-smpte-color-bars-bars_pal.jpg';

  // the takePhoto function attached to the button
  $scope.takePhoto = function() {

    // default camera options, please see https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md
    // for the complete list
    var cameraOptions = {
      targetWidth: 300,
      targetHeight: 300
    };

    // perform the api call to take the picture.  
    // The success function has a URI containing the file location on the phone of the image
    // The error function sends an alert that an issue has occured
    // The cameraOptions are defined above
    navigator.camera.getPicture(function(imageURI) {
      
      $scope.imageURI = imageURI;
      $state.go('tab.camera');

    }, function(err) {

      alert("Oops!  Can't take your photo!  Either you backed out before saving a photo, or you are not on a device.  Camera will not work from the emulator...");
    }, cameraOptions);
  }
});
