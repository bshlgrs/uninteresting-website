$(function() {
  var doShit = function () {
    // read in the data
    var rows = $("#tsv-input").val().split("\n");
    var data = _(rows).map(function (row) {
      return row.split("\t");
    });

    var dataSplitByPlace = splitByPlace(data);

    var result = _.flatten(_(dataSplitByPlace).map(function(people, place) {
      return distributeInArea(people, place);
    }), true);

    var tsv_output = "place\tconnector\tconnectee(_(result).map(function(x) { return x.join(",") }).join("\n"));

    $("#tsv-output").html(tsv_output);
  }

  var splitByPlace = function (data) {
    var splitData = {};
    
    _(data).each(function (row) {
      var name = row[0];
      var role = row[1];
      var place = row[2];

      if (!splitData[place]) {
        splitData[place] = {};
      }

      if (!splitData[place][role]) {
        splitData[place][role] = [];
      }

      splitData[place][role].push(name);
    });

    return splitData;
  }

  var randomPick = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  var distributeInArea = function (people, place) {
    var matches = []

    var seniorConnectors = people["Senior connector"]
    var connectors = people["Connector"]
    var connectees = people["Connectee"]

    _(people["Connectee"]).each(function(person) {
      matches.push([person, randomPick(connectors), randomPick(seniorConnectors)]);
    });
    
    return matches;
  }

  $("#doShit").on("click", doShit);
})