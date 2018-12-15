var initialTopic = ["random", "funny", "mouse"];
var topic = initialTopic;
var offset = 0;
var colors = ["red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow", "amber", "orange", "deep-orange", "brown", "grey", "blue-grey"];
var lightDark = ["lighten", "darken", "accent"];
var fullColorGamut = [];
var colorNumber = ["1", "2", "3", "4"]
var colorCounter = 0;
var tagClick;
var clickCounter = 0;
var favStore = [];
var favKeyChain;
var favCount;
var gifFav;
var divCount = 0;


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
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tagClick + "&rating=g&limit=10&api_key=fOl7fKImZ3vPLJkKlPB9WHGkhIV488wM&offset=" + offset;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.data[0].rating);
        var newDiv = $("<div>").addClass("row").attr("id", "GifCont" + divCount);
        for (var i = 0; i < 10; i++) {
            var gifCard = $("<div>").addClass("card " + fullColorGamut[i + colorCounter] + " z-depth-3 col s12 m3").attr("id", "gifCard" + [i] + divCount);
            var gifPicDiv = $("<div>").addClass("card-img")
            var gifPic = $("<img>").attr("src", response.data[i].images.fixed_height.url).attr("data-still", response.data[i].images.fixed_height_small_still.url).attr("data-animate", response.data[i].images.fixed_height_small.url).attr("data-state", "still");
            //----Here is where I would have the click pause function, but I decided the app would work better without it--//
            // gifPic.on("click", function(){
            //     var state = $(this).attr("data-state");
            //     if (state === "still"){
            //         $(this).attr("src", $(this).attr("data-animate"));
            //         $(this).attr("data-state", "animate");
            //     } else {
            //         $(this).attr("src", $(this).attr("data-still"));
            //         $(this).attr("data-state", "still");
            //     }
            // })
            function buttonColor() {
                if (favStore.includes(response.data[i].id)) {
                    console.log("yes");
                    gifFav = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light green").html('<i class="material-icons">stars</i>').attr("id", "favButton").attr("gifID", response.data[i].id).attr("favState", "yes");
                } else {
                    console.log("no");
                    gifFav = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light red").html('<i class="material-icons">stars</i>').attr("id", "favButton").attr("gifID", response.data[i].id).attr("favState", "no");
                }
            }
            buttonColor();

            gifFav.on("click", function () {
                var favState = $(this).attr("favState");
                console.log(favState)
                if (favState === "no") {
                    $(this).attr("class", "btn-floating halfway-fab waves-effect waves-light green");
                    $(this).attr("favState", "yes");
                    favStore.push($(this).attr("gifID"));
                    console.log(favStore.length);
                    localStorage.setItem("gifKey", JSON.stringify(favStore));
                    favCount = favStore.length;
                    $("#favCount").html(favCount);
                    favStore = JSON.parse(localStorage.getItem("gifKey"));
                } else {
                    $(this).attr("class", "btn-floating halfway-fab waves-effect waves-light red");
                    $(this).attr("favState", "no");
                    var removeFav = $(this).attr("gifID");
                    favStore.splice(removeFav, 1);
                    localStorage.setItem("gifKey", JSON.stringify(favStore));
                    favCount = favStore.length;
                    $("#favCount").html(favCount);
                    favStore = JSON.parse(localStorage.getItem("gifKey"));
                }
            })

            var gifRating = $("<span>").addClass("card-title").html("<p class='flow-text'>Rating: " + response.data[i].rating + '</p>');
            var gifDesc = $("<div>").addClass("card-content white").text(response.data[i].title);
            $("#divCont").append(newDiv);
            newDiv.append(gifCard);
            gifPicDiv.append(gifPic);
            $("#gifCard" + [i] + divCount).prepend(gifPicDiv, gifRating, gifDesc, gifFav);

        }
        // below on click is to change state of div to favorite and push it to an object.   


    })
}

function callFavGifs() {

    console.log(favStore)
    favCount = favStore.length;
    favKeyChain = favStore.join();
    console.log(favKeyChain);

    favURL = "https://api.giphy.com/v1/gifs?api_key=fOl7fKImZ3vPLJkKlPB9WHGkhIV488wM&ids=" + favKeyChain;

    $.ajax({
        url: favURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#favCard").empty()
        for (var i = 0; i < favStore.length; i++) {
            console.log(favStore.length);
            var gifCard = $("<div>").addClass("card " + fullColorGamut[i + colorCounter] + " z-depth-3 col s12 m3").attr("id", "favGifCard" + [i]);
            var gifPicDiv = $("<div>").addClass("card-img")
            var gifPic = $("<img>").attr("src", response.data[i].images.fixed_height.url).attr("data-still", response.data[i].images.fixed_height_small_still.url).attr("data-animate", response.data[i].images.fixed_height_small.url).attr("data-state", "still");
            gifFav = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light green").html('<i class="material-icons">stars</i>').attr("id", "favButton").attr("gifID", response.data[i].id).attr("favState", "yes");

            gifFav.on("click", function () {
                var favState = $(this).attr("favState");
                console.log(favState)
                if (favState === "no") {
                    $(this).attr("class", "btn-floating halfway-fab waves-effect waves-light green");
                    $(this).attr("favState", "yes");
                    favStore.push($(this).attr("gifID"));
                    localStorage.setItem("gifKey", JSON.stringify(favStore));
                    favCount = favStore.length;
                    $("#favCount").html(favCount);
                } else {
                    $(this).attr("class", "btn-floating halfway-fab waves-effect waves-light red");
                    $(this).attr("favState", "no");
                    var removeFav = $(this).attr("gifID");
                    favStore.splice(removeFav, 1);
                    localStorage.setItem("gifKey", JSON.stringify(favStore));
                    favCount = favStore.length;
                    $("#favCount").html(favCount);
                    $(this).parent().remove()
                    favEmpty();
                }
            })

            var gifRating = $("<span>").addClass("card-title").html("<p class='flow-text'>Rating: " + response.data[i].rating + '</p>');
            var gifDesc = $("<div>").addClass("card-content white").text(response.data[i].title);
            $("#favCard").append(gifCard);
            gifPicDiv.append(gifPic);
            $("#favGifCard" + [i]).prepend(gifPicDiv, gifRating, gifDesc, gifFav);
        }
    })



}


function favEmpty() {
    if (favStore.length === 0) {
        console.log("yes");
        var emptyMessage = $("<div>");
        emptyMessage.attr("id", "emptyId");
        emptyMessage.text("It's all Gone!!!<br>").html("<a href='#'>Head Back to the Home Page for More Great GIFS!!!</a>")
        $("#favCard").append(emptyMessage);
        $("#emptyId").on("click", function () {
            $("#favPage").hide();
            $("#frontPage, .nav-content").show();
        })

    } else {
        console.log("no");
    }
}

function renderButton() {
    console.log("here");
    $("#button-area").empty();

    if (localStorage.getItem("tagKey") !== null) {
        console.log("not null");
        topic = JSON.parse(localStorage.getItem("tagKey"));
    } else {
        topic = initialTopic;
        localStorage.setItem("tagKey", JSON.stringify(topic));
        console.log(topic.length);
    }

    for (var i = 0; i < topic.length; i++) {
        var button = $("<a>");
        var closeIcon = $("<i>").addClass("material-icons").attr("id", "closeIcon").text("close")
        button.addClass("btn-small waves-effect waves-light " + colors[i]);
        button.attr("id", "topicButton");
        button.attr("data-name", topic[i]);
        button.text(topic[i]);
        button.append(closeIcon);
        $("#button-area").append(button);


    }

    $("a #closeIcon").on("click", function () {
        $(this).parent("a").remove();
        var removeTag = $(this).closest("a").attr("data-name");
        var tagIndex = topic.indexOf(removeTag);
        if (tagIndex !== -1) {
            console.log(removeTag);
            topic.splice(tagIndex, 1);
            console.log(topic);
        }

        localStorage.setItem("tagKey", JSON.stringify(topic));
        topic = JSON.parse(localStorage.getItem("tagKey"));
    renderButton();
    });
}



$(document).ready(function () {
    if (localStorage.getItem("gifKey") !== null) {
        favStore = JSON.parse(localStorage.getItem("gifKey"));
        favCount = favStore.length
        $("#favCount").html(favCount);
        callFavGifs();
        console.log("before favEmpty")
        favEmpty();
        console.log("after favEmpty")

    }
    favCount = favStore.length;
    $("#favCount").html(favCount);
    renderButton();
    $(document).on("click", "#topicButton", function () {
        clickCounter++;
        console.log(clickCounter);
        offset = 0;
        tagClick = $(this).attr("data-name");
        divCount++;
        console.log($(this))
        $("#divCont div").not("#clickMore").remove();
        $(this).off("click");
        callGifs();
    });
    $(document).on("click", "#clickMore", function () {
        offset += 10;
        colorCounter += 10;
        divCount++;
        callGifs();
    })

    $("#favIcon").on("click", function () {
        callFavGifs();
        $("#frontPage, .nav-content").hide();
        $("#favPage").show();
    })

    $("#homePage").on("click", function () {
        $("#favPage").hide();
        $("#frontPage, .nav-content").show();

    })

    $("#add-tag").on("click", function (event) {
        event.preventDefault();
        var tagInput = $("#tag-input").val().trim();
        topic.push(tagInput);
        localStorage.setItem("tagKey", JSON.stringify(topic));
        console.log(topic);
        renderButton();
    });

   




});






