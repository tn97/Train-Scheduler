// Initialize Firebase
var config = {
	apiKey: "AIzaSyAKJnG1qH2HVep5kA5SZjCXsuh_BzhSN7I",
	authDomain: "classwork-5f45e.firebaseapp.com",
	databaseURL: "https://classwork-5f45e.firebaseio.com/",
	projectId: "classwork-5f45e",
	storageBucket: "classwork-5f45e.appspot.com",
	messagingSenderId: "1055004047031"
};
firebase.initializeApp(config);

var database = firebase.database();

//button t oadd trains
$('#submitButton').on('click', function () {
	//gets user input
	var trainName = $('#trainNameInput').val().trim();
	var destination = $('#destinationInput').val().trim();
	var firstTime = moment($('#timeInput').val().trim(), "HH:mm").format("");
	var frequency = $('#frequencyInput').val().trim();

	var newTrains = {
		name: trainName,
		tdestination: destination,
		tFirst: firstTime,
		tfreq: frequency,
	}

	//uploads data to the database
	database.push(newTrains);

	//alert to show that trains have been added
	alert("Train successfully added!");

	//clears text boxes for new train
	$('#trainNameInput').val("");
	$('#destinationInput').val("");
	$('#timeInput').val("");
	$('#frequencyInput').val("");

	return false;
});

// on new child (firebase) run function
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().tdestination;
	var firstTime = childSnapshot.val().tFirst;
	var frequency = childSnapshot.val().tfreq;

	// pushing 1 year back
	var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

	//current time
	var currentTime = moment();

	//difference between times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

	//time apart
	var tRemainder = diffTime % frequency;

	//minutes until train
	var tMinutesTillTrain = frequency - tRemainder;

	//next train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var nextTrainConverted = moment(nextTrain).format("hh:mm a");

	//add each trains data into the table
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});


