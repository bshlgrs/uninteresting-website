$(function() {

  $("#tsv-input").val("Priya\tSenior connector\tEast bay\nAdam\tConnector\tEast bay\nBuck\tConnectee\tEast bay");

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

    var output = ("<table class='table'><tr><td>place</td><td>connectee</td>"+
                      "<td>connector</td><td>senior connector</td></tr>\n"+
      (_(result).map(function(x) { return "<tr><td>"+x.join("</td><td>")+"</td></tr>" }).join("\n"))
      + "</table>");

    $("#output").html(output);
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
      matches.push([place, person, randomPick(connectors), randomPick(seniorConnectors)]);
    });
    
    return matches;
  }

  $("#doShit").on("click", doShit);
})