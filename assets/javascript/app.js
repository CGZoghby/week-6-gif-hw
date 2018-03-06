$(document).ready(function () {

    // Initial array of animals
    var animals = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

    // displayanimalInfo function re-renders the HTML to display the appropriate content
    function displayanimalInfo() {
        var animal = $(this).attr("data-name");
        var queryURL = "https://www.omdbapi.com/?t=" + animal + "&y=&plot=short&apikey=trilogy";
        // Creates AJAX call for the specific animal button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // YOUR CODE GOES HERE!!!
            $("#animals-view").prepend(
                "<br><img src=" + response.Poster + ">" +
                "<br>Title: " + response.Title +
                "<br>Actors: " + response.Actors +
                "<br>Rating: " + response.Rated +
                "<br>Plot: " + response.Plot +
                "<br>Release Date: " + response.Released +
                "<br><br>");
        });
    }
    // Function for displaying animal data
    function renderButtons() {
        // Deletes the animals prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Loops through the array of animals
        for (var i = 0; i < animals.length; i++) {
            // Then dynamicaly generates buttons for each animal in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adds a class of animal to our button
            a.addClass("animal");
            // Added a data-attribute
            a.attr("data-name", animals[i]);
            // Provided the initial button text
            a.text(animals[i]);
            // Added the button to the buttons-view div
            $("#buttons-view").append(a);
        };
    };
    // This function handles events where the add animal button is clicked
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var animal = $("#animal-input").val().trim();
        // The animal from the textbox is then added to our array
        animals.push(animal);
        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
    });
    // Adding click event listeners to all elements with a class of "animal"
    $(document).on("click", ".animal", displayanimalInfo);
    // Calling the renderButtons function to display the intial buttons
    renderButtons();
});