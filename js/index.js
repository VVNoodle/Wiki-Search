$(document).ready(function() {
  $("#button").click(function() {
    $("h2").css("margin", "40px 0px 40px 0px");
    $("body").attr("style", "background-size: default");

    //Get user input
    var term = $("#userSearch").val();

    //Open Search action for wiki API
    var link =
      "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
      term +
      "&format=json&callback=?";

    //API call
    $.ajax({
      type: "GET",
      url: link,
      async: false,
      dataType: "json",
      success: function(array) {
        $("#results").html("Results for: " + term);

        var desCount = 0;
        var greyscale = "greyscale";
        // var animation = "animated fadeInDown";
        var descID = "description";
        var newTab = "_blank";

        //reset search if user searches again
        $("#choices").html("");

        //Search results. Title and description
        if (array[1]) {
          array[1].forEach(function(val) {
            //Say array[3] stores Title and array[2] stores description
            //desCount is counter
            // If no description, change array to "No Description"
            if (array[2][desCount] == "") {
              array[2][desCount] = "No Description";
            }
            $("#choices").append(
              "<a href=" +
                array[3][desCount] +
                " target =" +
                newTab +
                "><p class=" +
                greyscale +
                "><b>" +
                val +
                "</b></p></a>" +
                "<p id=" +
                descID +
                ">" +
                array[2][desCount++] +
                "</p><br/>"
            );
          });
        }
      },
      error: function(error) {
        alert("ERROR");
      }
    }); //end ajax
  }); //end button click

  var userSearch = document.getElementById("userSearch");

  userSearch.onkeydown = () => {
    var key = event.keyCode || event.charCode;
    if (key == 8 || key == 46) {
      console.log("TEST");
      setTimeout(() => {
        $("#button").click();
      }, 0);
    }
  };

  //Allow user to search using Enter/Return (ascii value is 13)
  $("#userSearch").keypress(function(key) {
    if (key.which === 13) {
      $("#button").click();
    }
    var tuts = setTimeout(() => {
      if (
        (key.which >= 65 && key.which <= 90) ||
        (key.which >= 97 && key.which <= 122)
      ) {
        $("#button").click();
      }
    }, 1500);
  });
});
