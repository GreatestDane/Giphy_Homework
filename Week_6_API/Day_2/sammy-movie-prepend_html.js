< !DOCTYPE html >
  <html lang="en">

    <head>
      <meta charset="utf-8">
        <title>Favorite Movies</title>
        <style type="text/css">
          button,
          div,
          form,
    input {
            margin: 10px;
        }
  </style>
</head>

      <body>

        <div class="container">
          <h1>Movie Search</h1>

          <!-- Rendered buttons will get dumped Here  -->
    <div id="buttons-view"></div>

          <form id="movie-form">
            <label for="movie-input">Add a Movie Bro</label>
            <input type="text" id="movie-input"><br>

              <!-- Button triggers new movie to be added -->
      <input id="add-movie" type="submit" value="Add a Movie Bro">
    </form>

              <!-- Movies will get dumped here -->
    <div id="movies-view"></div>

              <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js"></script>
              <script type="text/javascript">
                // Initial array of movies
                var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];
          
                // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayMovieInfo() {

        var movie = $(this).attr("data-name");
                var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        
                // Creates AJAX call for the specific movie button being clicked
        axios({
                  url: queryURL,
                method: "GET"
        }).then(function(response) {
          if(response.data.Error) {
                  console.error("ERROR")
            return ;
              }
              console.log(response);
              var movieDiv = $("#movies-view")
              // YOUR CODE GOES HERE!!!
              //movie poster
          var poster = $("<img>");
                poster.attr("src", response.data.Poster);
      
                //rating
          var rating = $("<p>");
                  rating.text(response.data.Rated);
        
                  //realease date
          var release = $("<p>");
                    release.text(response.data.Released)
          
                    //plot
          var plot = $("<p>");
                      plot.text(response.data.Plot);
          var containerDiv = $("<div>");
              
                        containerDiv.append([poster,rating,release,plot]);
                        movieDiv.prepend(containerDiv);
                      });
              
                    }
              
                    // Function for displaying movie data
      function renderButtons() {

                            // Deletes the movies prior to adding new movies
                            // (this is necessary otherwise you will have repeat buttons)
                            $("#buttons-view").empty();

                          // Loops through the array of movies
                          for (var i = 0; i < movies.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
                          // Adds a class of movie to our button
                          a.addClass("movie");
                          // Added a data-attribute
                          a.attr("data-name", movies[i]);
                          // Provided the initial button text
                          a.text(movies[i]);
                          // Added the button to the buttons-view div
                          $("#buttons-view").append(a);
                        }
                      }
                
                      // This function handles events where the add movie button is clicked
      $("#add-movie").on("click", function(event) {
                              event.preventDefault();
                            // This line of code will grab the input from the textbox
                            var movie = $("#movie-input").val().trim();
                    
                            // The movie from the textbox is then added to our array
                            movies.push(movie);
                    
                            // Calling renderButtons which handles the processing of our movie array
                            renderButtons();
                    
                          });
                    
                          // Adding click event listeners to all elements with a class of "movie"
                          $(document).on("click", ".movie", displayMovieInfo);
                    
                          // Calling the renderButtons function to display the intial buttons
                          renderButtons();
    </script>
                        </div>
</body>

</html>
