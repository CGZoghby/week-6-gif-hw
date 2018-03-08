$(document).ready(function () {
    // displaygifInfo function re-renders the HTML to display the appropriate content
    //"http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5" <-- example
    var gifs = [];

    function displaygifInfo() {
        var gif = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=p8zcPAjaO8q33EgfKVKEreHhlnOUlHep&limit=10"; //limit keyword is purely dictated by gifs/row ratio
        // Creates AJAX call for the specific gif button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // First empty gifs viewport
            $("#gifs-view").empty();
            //then populate with new stuff
            for (var i = 0; i < response.data.length; i++) {
                columnDiv = $("<div>") //adding column divs with bootstrap neatly controls the layout of the gifs
                gifBigDiv = $("<div>"); //this adds an additional level of aesthetic by displaying all gifs on bootstrap's new "cards"
                gifImg = $("<img>"); //adds img src
                gifSmallDiv = $("<div>") //will contain the rating of the attached gif
                columnDiv.addClass("col-md-3");
                gifBigDiv.addClass("card");
                gifImg.addClass("card-img-top");
                gifImg.attr("src", response.data[i].images.fixed_height_still.url); // I elected for the fixed height option because that would control height of rows, in theory
                gifImg.attr("data-still", response.data[i].images.fixed_height_still.url)
                gifImg.attr("data-animate", response.data[i].images.fixed_height.url)
                gifImg.attr("data-state", "still")
                gifImg.attr("alt", response.data[i].slug + ".gif");
                gifSmallDiv.addClass("card-body")
                gifSmallDiv.append(`<p class="card-text"> Rating: ${response.data[i].rating} </p>`);
                gifBigDiv.append(gifImg);
                gifBigDiv.append(gifSmallDiv);
                columnDiv.append(gifBigDiv);
                $("#gifs-view").append(columnDiv);
            };
        });
    };

    function renderButtons() {
        // Deleting the gifs prior to adding new gifs
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of gifs
        for (var i = 0; i < gifs.length; i++) {
            // Then dynamicaly generating buttons for each gif in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of gif-btn to our button
            a.addClass("gif-btn btn btn-success");
            // Adding a data-attribute
            a.attr("data-name", gifs[i]);
            // Providing the initial button text
            a.text(gifs[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where the add gif button is clicked
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var gif = $("#gif-input").val().trim();
        // The gif from the textbox is then added to our array
        gifs.push(gif);
        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
    });

    $("#gifs-view").on("click","img", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

    // Adding click event listeners to all elements with a class of "gif"
    $(document).on("click", ".gif-btn", displaygifInfo);
});