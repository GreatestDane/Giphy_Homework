
// start off the page by creating a bunch of buttons from an array 
var animals = ["Cat", "Lion", "Alligator", "Dinosaur", "Dragon", "Unicorn", "Pegasus", "Gryffin", "A real animal", "Spider", "Kermit"]
var animalButton;
var APIKey = "4LlS5TiESc6S7Y1FCFD5Fh7dNug7glhU";


// Use a for loop to actually create the buttons
for (var i = 0; i < animals.length; i++) {
    animalButton = $("<button>").attr("class", "animal-button");
    animalButton.val(animals[i]);
    animalButton.text(animals[i]);
    $("#button-col").append(animalButton);
};



//Dynamically create a new animal button using the search bar
$("#search-button").on("click", function () {
    event.preventDefault();
    animalButton = $("<button>").attr("class", "animal-button");
    animalButton.val($("#gif").val());
    animalButton.text($("#gif").val());
    $("#button-col").append(animalButton);
    $("#gif").val(" ");
});

//Create the on click event for the buttons to display the corresponding gif
$(document).on("click", ".animal-button", function () {
    $("#gif-col").empty();
    // Create a variable that contains the value of the button
    var animal = $(this).val();
    // Create the query URL
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=" + APIKey + "&tag=" + animal + "&rating=R";

    // Make an API call to get the gifs
    // Also make it happen 10 times to get 10 random gifs
    for (var i = 0; i < 10; i++) {
        axios({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                console.log(response.data);

                var imageUrl = response.data.data.fixed_width_small_still_url;
                var imageAnimate = response.data.data.image_original_url;
                var image = $("<img>");
                image.attr("src", imageUrl);
                image.attr("data-still", imageUrl);
                image.attr("data-animate", imageAnimate);
                image.attr("data-state", "still");
                image.attr("alt", "random-gif");
                image.attr("class", "gif-click");
                $("#gif-col").prepend(image);
            })
            .catch(function (error) {
                console.error(error);
            })
    };

    //Create the onclick event that will make the gifs animate
    $(document).on("click", ".gif-click", function () {
        //create a variable to hold the data-state
        var state = $(this).attr("data-state");

        if (state === "still") {
            var animate = $(this).attr("data-animate")
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        }

        if (state === "animate") {
            var still = $(this).attr("data-still");
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }
    });

});




