var topic = ["horse", "monkey", "mouse"];
var offset = 0;
var colors = ["red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow", "amber", "orange", "deep-orange", "brown", "grey", "blue-grey"];
var lightDark = ["lighten", "darken", "accent"];
var fullColorGamut = [];
var colorNumber = ["1", "2", "3", "4"]
var colorCounter = 0;


fillColor();

function fillColor() {
    for (var i = 0; i < colors.length; i++) {
        fullColorGamut.push(colors[i]);
        for (var j = 0; j < lightDark.length; j++){
        fullColorGamut.push(colors[i] + " " +lightDark[0] + "-" + colorNumber[j])
        }
        for (var k = 0; k < lightDark.length; k++){
            fullColorGamut.push(colors[i] + " " +lightDark[1] + "-" + colorNumber[k])
            }
            for (var l = 0; l < lightDark.length; l++){
                fullColorGamut.push(colors[i] + " " +lightDark[2] + "-" + colorNumber[l])
                }
    }
    console.log(fullColorGamut);
}



function callGifs() {
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=funny+cat&limit=10&api_key=fOl7fKImZ3vPLJkKlPB9WHGkhIV488wM&offset=" + offset;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log(response.data[0].rating);

        for (var i = 0; i < 10; i++) {
        var gifCard = $("<div>").addClass("card " + fullColorGamut[i + colorCounter] + " col s4").attr("id", "gifCard" + [i]);
        var gifPic = $("<div>").addClass("card-img").html("<img src=" + response.data[i].images.fixed_height.url +  ">");
        var gifRating = $("<div>").addClass("card-title").text("Rating: " + response.data[i].rating);
        // var gifDesc = $("<div>").text(response.data[i].title);
        $("#gifCont").prepend(gifCard);
        $("#gifCard"+ [i]).prepend(gifPic, gifRating);
        }
        moreGifs();
    })
    
}



function moreGifs() {
    $("#clickMore").on("click", function() { 
        offset += 10;
        colorCounter += 10;
        callGifs();
        console.log(offset);
        $(this).off("click");
    })
}

function renderButton() {
    $("#button-area").empty();

    for (var i = 0; i < topic.length; i++) {
        var button = $("<a>");
        button.addClass("waves-effect waves-light btn-small " + fullColorGamut[i]);
        button.attr("id", "topicButton");
        button.attr("data-name", topic[i]);
        button.text(topic[i]);
        $("#button-area").append(button);

    }
}

$(document).ready(function(){
    // $("body").css("background-image", "linear-gradient(to bottom right, " + color0 + ", " + color9);
    renderButton();

    callGifs();
})



