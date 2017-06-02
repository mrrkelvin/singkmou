angular.module('app.controllers', [])

.controller('singKMouCtrl', ['$scope', '$stateParams', '$ionicPlatform', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicPlatform, $state) {

     $ionicPlatform.ready(function() {
        $scope.toBooking = function(){
            $state.go('menu.booking');
        }
     });

}])

.controller('bookingCtrl', ['$scope', '$stateParams',  '$http', '$cordovaSQLite', '$ionicPlatform', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $cordovaSQLite,$ionicPlatform,$state) {
$ionicPlatform.ready(function() {
  $scope.Room = {};
  $scope.date=new Date();
  var phoneNumber = "";
  var myToken ="";
  document.addEventListener("deviceready", getToken, false);

  function getToken() {
    var push = new Ionic.Push({
    "onNotification":function(data){
       var payload = data.payload;
       console.log("\n"+JSON.stringify(data));
       console.log(data.text);
       alert(data.text);
    },
    "pluginConfig":{
       "android":{
       "iconColor": "teal"
       }
    }
    // "debug": true
    });
    push.register(function(token) {
    console.log("My Device token:",token.token);
    push.saveToken(token);  // persist the token in the Ionic Platform
    myToken = token.token;
    });
    hasReadPermission();
  }

  function onDeviceReady() {
    window.plugins.sim.getSimInfo(successCallback, errorCallback);
  }

  function successCallback(result) {
    console.log(result);
    phoneNumber = result.phoneNumber;
    // $scope.Room.contactNo = phoneNumber;
    // alert(phoneNumber);
  }

  function errorCallback(error) {
    console.log(error);
  }

  // Android only: check permission
  function hasReadPermission() {
    window.plugins.sim.hasReadPermission(
      function(r) {console.log(r); onDeviceReady();},
      function(r) {console.log(r); requestReadPermission();}
    );
  }

  $scope.data = {
   roomType: "",
   roomPrice: ""
 };

  var request = {
      method: "POST",
      url: 'http://192.168.43.202/singkmou/singkmouwebservice.php',
      data: {
        roomType: $scope.data.roomType,
        roomPrice: $scope.data.roomPrice
    }
  };
    $http(request)
      .then(function(response){
        var roomData = angular.fromJson(response.data);//to retrieve data from database
        var cntRow = response.data.length;

        var i = 0;

        for(var i = 0; i <cntRow; i++){
        var roomID = roomData[i].roomID;
        var roomType = roomData[i].roomType;
        var roomPrice = roomData[i].roomPrice;
        var query = "INSERT INTO rooms (roomID, roomType, roomPrice) VALUES (?,?,?)";
        $cordovaSQLite.execute(db, query, [roomID, roomType, roomPrice]);
       }
       console.log(roomData[0].roomType);
       $scope.rooms = [];

    var query = "SELECT roomType FROM rooms";
       $cordovaSQLite.execute(db, query, []).then(function(res) {
           if(res.rows.length > 0) {
             console.log(res.rows.length);
             for( var i = 0; i<res.rows.length; i++){
               $scope.rooms.push({
               roomType:res.rows.item(i).roomType
               });

             }
              $scope.myRoom = $scope.rooms[0].roomType;
              if ($scope.hours = null){
                  $scope.total = 0;
              }
              var query = "SELECT roomID, roomPrice FROM rooms WHERE roomType = ?";
           $cordovaSQLite.execute(db, query, [$scope.rooms[0].roomType]).then(function(res) {
               if(res.rows.length > 0) {
                 $scope.Room = {
                     roomID: res.rows.item(0).roomID,
                     roomPrice: res.rows.item(0).roomPrice,
                     contactNo: phoneNumber
                 };
                 console.log(res.rows.item(0).roomPrice);

            } else {
                console.log("No results found");
                window.alert("SQLite cannot select");


            }
           });

         } else {
             console.log("No results found");
             window.alert("SQLite cannot select11");
         }
     }, function (err) {
         console.error(err);
     });

      }).catch(function(response){
        console.log("Error");
      });

      var roomPriceHour;
      $scope.selectRoom = function(myRoom){

           var query = "SELECT roomID, roomPrice FROM rooms WHERE roomType = ?";
           $cordovaSQLite.execute(db, query, [myRoom]).then(function(res) {
               if(res.rows.length > 0) {
                 $scope.Room = {
                  roomID: res.rows.item(0).roomID,
                  roomPrice: res.rows.item(0).roomPrice,
                  contactNo: phoneNumber
                 };
                 console.log(res.rows.item(0).roomPrice);

            } else {
                console.log("No results found");
                window.alert("SQLite cannot select");


            }
         }, function (err) {
             console.error(err);
         });
       };

       $scope.book = function(){
           var count = 0;

           if (this.hours == null){
               alert("Please input how many hours you would like to sing!");
               count++;
           }
           else if(this.hours < 0){
               alert("The hours must be positive!");
               count++;
           }
           else if(this.hours > 10){
               alert("The hours cannot exceeds 10 hours!");
               count++;
           }
           else if(typeof this.Room == "undefined"){
               alert("Please select the room!");
               count++;
           }

           if(count == 0){
            // var query = "INSERT INTO bookings (roomType, totalPrice) VALUES (?,?)";
            // $cordovaSQLite.execute(db, query, [$scope.myRoom, this.hours*this.Room.roomPrice]);
              var t = new Date(this.startTime);
              var hours = ("0" + (t.getHours())).slice(-2);
              var minutes = ("0" + (t.getMinutes())).slice(-2);
              var todayTime = (hours)+":"+(minutes);

              var d = new Date(this.date);
              var day = ("0" + d.getDate()).slice(-2);
              var month = ("0" + (d.getMonth() + 1)).slice(-2);
              var todayDate = d.getFullYear()+"-"+(month)+"-"+(day);

              var request = {
                method: "POST",
                url: 'http://192.168.43.202/singkmou/mobileBooking.php',
                data: {
                    roomID: $scope.Room.roomID,
                    contactNo: this.Room.contactNo,
                    name: this.name,
                    totalPrice: this.hours*this.Room.roomPrice,
                    startTime: todayTime,
                    date: todayDate,
                    token: myToken
                }
              };
              $http(request)
              .then(function(response){
                  if(response){
                      var query = "INSERT INTO bookings (bookingID) VALUES (?)";
                      $cordovaSQLite.execute(db, query, [response.data]);
                      alert('Your booking is registered successfully with booking id '+response.data);
                      $state.go('menu.singKMou',{},{reload:true});
                  }
              });

            // alert(this.date);
            // alert($scope.Room.roomID);
            // alert(this.Room.contactNo);
            // alert(this.name);
            // alert(this.hours*this.Room.roomPrice);
            // alert(this.startTime);
            console.log(this.hours*this.Room.roomPrice);
           }
       }
    });

}])

.controller('historyOfBookingCtrl', ['$scope', '$stateParams', '$cordovaSQLite','$ionicPlatform', '$http',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cordovaSQLite, $ionicPlatform, $http) {
    $ionicPlatform.ready(function() {
        $scope.bookings= [];

        var query = "SELECT * FROM bookings ORDER BY bookingID DESC";
           $cordovaSQLite.execute(db, query, []).then(function(res) {
               if(res.rows.length > 0) {
                   for (var i=0; i<res.rows.length; i++) {
                        var request = {
                            method: "POST",
                            url: 'http://192.168.43.202/singkmou/getBookingHistory.php',
                            data: {
                                bookingID: res.rows.item(i).bookingID
                            }
                        };
                        $http(request)
                        .then(function(response){
                            console.log(response.data);
                            if(response){
                                var bookingData = angular.fromJson(response.data);//to retrieve data from database
                                console.log(response.data[0].booking_id);

                                    $scope.bookings.push({
                                        booking_id: response.data[0].booking_id,
                                        room_id: response.data[0].room_id,
                                        contact_no: response.data[0].contact_no,
                                        user_name: response.data[0].user_name,
                                        total_price: response.data[0].total_price,
                                        start_time: response.data[0].start_time,
                                        datePicker: response.data[0].datepick,
                                        status: response.data[0].status
                                });
                            }
                        });
                   }

            } else {
                console.log("No results found");
                window.alert("SQLite cannot select");
            }
        },
        function(error){
          alert("Noooo! Cannot Retreive!.."+ error);
        });
    });

}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
