$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyAnzCjVKceoPA4q3DVM160UG3IVLtjg0lg",
        authDomain: "train-scheduler-12518.firebaseapp.com",
        databaseURL: "https://train-scheduler-12518.firebaseio.com",
        projectId: "train-scheduler-12518",
        storageBucket: "train-scheduler-12518.appspot.com",
        messagingSenderId: "470427973994"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    var name = "";
    var destination = "";
    var firstTrain = "";
    var frequency = 0;
    var nextArrival = 0;
    var minsAway = 0;

    database.ref().on("child_added", function(childsnapshot) {
        var child = childsnapshot.val();


        var table = $("<tr class = 'table'>");
        $("#table").append(table);
        table.append("<td>" + child.dataName + "</td>");
        table.append("<td>" + child.dataDest + "</td>");
        table.append("<td>" + child.dataFreq + "</td>");
        table.append("<td>" + child.dataArriv + "</td>");
        table.append("<td>" + child.dataMins + "</td>");


    }, function(error) {
        console.log("error");

    });

    $("#submit").on("click", function() {

        event.preventDefault();

        name = $("#train-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrain = $("#time-input").val().trim();
        frequency = parseInt($("#freq-input").val().trim());

        var timeconvert = moment(firstTrain, "HH:mm").subtract(1, "years");
        var difference = moment().diff(moment(timeconvert), "minutes");
        var remain = difference % frequency;
        minsAway = frequency - remain;
        //var nextTrain = moment().add(minsAway, "mins");
        nextArrival = moment().add(minsAway,'minutes').format('hh:mm');
   
        database.ref().push({
            dataName: name,
            dataDest: destination,
            dataTime: firstTrain,
            dataFreq: frequency,
            dataMins: minsAway,
            dataArriv: nextArrival,  
        })

        $("#train-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#freq-input").val("");

    })

})