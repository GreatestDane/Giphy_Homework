
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


$(document).on("click", ".animal-button", function(){
    var animal = $(this).val();
    alert("ANIMAL BUTTON OF: " + animal);
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=" + APIKey + "&tag=" +animal + "&rating=G";

    $.ajax({
        Url: queryURL,
        Method: "GET"
        })
        .then(function(response) {
        console.log(response);
        })
        .catch(function(error) {
        console.error(error);
        })
        
});




