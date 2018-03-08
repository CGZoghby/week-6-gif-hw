$(document).ready(function () {
    // displayanimalInfo function re-renders the HTML to display the appropriate content
    //"http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5" <-- example
    var animals = [];

    function displayanimalInfo() {
        var animal = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=p8zcPAjaO8q33EgfKVKEreHhlnOUlHep&limit=16";
        // Creates AJAX call for the specific animal button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // First empty animals viewport
            $("#animals-view").empty();
            //then populate with new stuff
            for (var i = 0; i < response.data.length; i++) {
                columnDiv = $("<div>") //adding column divs with bootstrap neatly controls the layout of the gifs
                animalBigDiv = $("<div>"); //this adds an additional level of aesthetic by displaying all gifs on bootstrap's new "cards"
                animalImg = $("<img>"); //adds img src
                animalSmallDiv = $("<div>") //will contain the rating of the attached gif
                columnDiv.addClass("col-md-3");
                animalBigDiv.addClass("card");
                animalImg.addClass("card-img-top");
                animalImg.attr("src", response.data[i].images.downsized.url);
                animalImg.attr("alt", animal + ".gif");
                animalSmallDiv.addClass("card-body")
                animalSmallDiv.append(`<h5 class="card-title"> Rating: ${response.data[i].rating} </h5>`);
                animalImg.append(animalSmallDiv);
                animalBigDiv.append(animalImg);
                columnDiv.append(animalBigDiv);
                $("#animals-view").append(columnDiv);
            };
        });
    };

    function renderButtons() {
        // Deleting the animals prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {
            // Then dynamicaly generating buttons for each animal in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of animal-btn to our button
            a.addClass("animal-btn");
            // Adding a data-attribute
            a.attr("data-name", animals[i]);
            // Providing the initial button text
            a.text(animals[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }
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
    $(document).on("click", ".animal-btn", displayanimalInfo);
});