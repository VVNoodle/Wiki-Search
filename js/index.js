$(document).ready(function() {
  $("#button").click(function() {
    $("h2").css("margin", "40px 0px 20px 0px");
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
        var desCount = 0;
        // var animation = "animated fadeInDown";
        var descID = "description";
        var newTab = "_blank";

        //reset search if user searches again
        $("#choices").html("");

        //Search results. Title and description
        if (array[1]) {
          $("#results").html("Results for: " + term);
          array[1].forEach(function(val) {
            //Say array[3] stores Title and array[2] stores description
            //desCount is counter
            // If no description, change array to "No Description"
            if (array[2][desCount] == "") {
              array[2][desCount] = "No Description";
            }
            $("#choices").append(
              '<div class="choiceitems"><a href=' +
                array[3][desCount] +
                ' target ="_blank" ><p class="title greyscale"><b>' +
                val +
                "</b></p></a>" +
                "<p id=" +
                descID +
                ">" +
                array[2][desCount++] +
                "</p><br/></div>"
            );
          });
        } else {
          // remove "Resuts for: " if search is empty
          $("#results").html("");
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
    if (key === 13) {
      $("#button").click();
    } else if (key == 8 || key == 46) {
      setTimeout(() => {
        $("#button").click();
      }, 300);
    } else if ((key >= 65 && key <= 90) || (key >= 97 && key <= 122)) {
      setTimeout(() => {
        $("#button").click();
      }, 1000);
    }
  };

  //Allow user to search using Enter/Return (ascii value is 13)
});
