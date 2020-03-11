$(document).ready(function(){

    var buttonsDisplayed = ["Geralt", "Ciri", "Yennefer"];

    function renderButtons(){ 

        $("#display-buttons").empty();

        for (var i = 0; i < buttonsDisplayed.length; i++){

            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("data-name", buttonsDisplayed[i]); 
            newButton.text(buttonsDisplayed[i]); 
            $("#display-buttons").append(newButton); 
        }
    }

    function displayImage(){

        $("#display-images").empty();
        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=AVWz9Zn8QuqNMW6EZa07lYXT93olCDdG";   

        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {

            for(var k = 0; k < limit; k++) {    

                var display = $("<div>");
                display.addClass("holder");
                var image = $("<img>");
                image.attr("src", response.data[k].images.original_still.url);
                image.attr("data-still", response.data[k].images.original_still.url);
                image.attr("data-animate", response.data[k].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                display.append(image);
                var rating = response.data[k].rating;
                var textRating = $("<p>").text("Rating: " + rating);
                display.append(textRating)
                $("#display-images").append(display);
            }
        });
    }

    function animateImage() {          

        var imageState = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");
        if(imageState == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }
        else if(imageState == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }

    $("#Submit").on("click", function(){
        var input = $("#user-input").val().trim();
        form.reset();
        buttonsDisplayed.push(input);
        renderButtons();
        return false;
    })

    renderButtons();
    $(document).on("click", "#input", displayImage);
    $(document).on("click", ".gif", animateImage);

});