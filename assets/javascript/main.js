var topic = ["cat", "monkey", "mouse"];
var offset = 0;
var colors = ["red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow", "amber", "orange", "deep-orange", "brown", "grey", "blue-grey"];
var lightDark = ["lighten", "darken", "accent"];
var fullColorGamut = [];
var colorNumber = ["1", "2", "3", "4"]
var colorCounter = 0;
var tagClick;
clickCounter = 0;


fillColor();

function fillColor() {
    for (var i = 0; i < colors.length; i++) {
        fullColorGamut.push(colors[i]);
        for (var j = 0; j < lightDark.length; j++) {
            fullColorGamut.push(colors[i] + " " + lightDark[0] + "-" + colorNumber[j])
        }
        for (var k = 0; k < lightDark.length; k++) {
            fullColorGamut.push(colors[i] + " " + lightDark[1] + "-" + colorNumber[k])
        }
        for (var l = 0; l < lightDark.length; l++) {
            fullColorGamut.push(colors[i] + " " + lightDark[2] + "-" + colorNumber[l])
        }
    }
    // console.log(fullColorGamut);
}



function callGifs() {
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + tagClick + "&limit=10&api_key=fOl7fKImZ3vPLJkKlPB9WHGkhIV488wM&offset=" + offset;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.data[0].rating);

        for (var i = 0; i < 10; i++) {
            var gifCard = $("<div>").addClass("card " + fullColorGamut[i + colorCounter] + " z-depth-3 col s12 m3").attr("id", "gifCard" + [i]);
            var gifPic = $("<div>").addClass("card-img").html("<img src=" + response.data[i].images.fixed_height.url + ">");
            var gifFav = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light red").html('<i class="material-icons">favorite</i>');
            // var gifFB = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light green").html('<i class="material-icons">file_download</i>');
            var gifRating = $("<span>").addClass("card-title").text("Rating: " + response.data[i].rating);
            var gifDesc = $("<div>").addClass("card-content").text(response.data[i].title);
            $("#gifCont").prepend(gifCard);
            $("#gifCard" + [i]).prepend(gifPic, gifRating, gifDesc, gifFav );
        }
        
    })
}



// function moreGifs() {
    
//         callGifs();
//     })
// }

function renderButton() {
    $("#button-area").empty();

    for (var i = 0; i < topic.length; i++) {
        var button = $("<a>");
        button.addClass("chip " + fullColorGamut[i]);
        button.attr("id", "topicButton");
        button.attr("data-name", topic[i]);
        button.text(topic[i]);
        button.append('<i class="close material-icons">close</i>');
        $("#button-area").append(button);

    }
}



$(document).ready(function(){
    renderButton();
    $(document).on("click", "#topicButton",  function(){
        clickCounter++;
        console.log(clickCounter);
        offset = 0;
        tagClick = $(this).attr("data-name");
        console.log($(this))
        $(this).off("click");
        callGifs();  
    });
    $(document).on("click", "#clickMore", function () {
        offset += 10;
        colorCounter += 10;
        callGifs();
    })

    
    // $("body").css("background-image", "linear-gradient(to bottom right, " + color0 + ", " + color9);
    $("#add-tag").on("click", function (event) {
        event.preventDefault();
        var tagInput = $("#tag-input").val().trim();
        topic.push(tagInput);
        console.log(topic);
        renderButton();
    });
    
    
    
});






