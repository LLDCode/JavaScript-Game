
$(document).ready(function() {

    $("#start_button").css({"width":"100px", "height":"80px", "font-size":"20px", "background-color":"black", "color":"yellow", "font-family":"'silkscreen'"}); //This changes width, height, font size, background color, text color, and font family of the button. I decided to keep the border around the button because I like how it makes the button stand out


    let firstName = "";
    firstName = prompt("What is your first name?"); //Prompts user for their name

    let nameElement = document.createElement("p");
    let nameSentence = `Let's get those aliens ${firstName}!`; //creates a p element and assignes a variable to include the text I want in my HTML
    nameElement.innerHTML = nameSentence; //Put the nameSentence variable which contains the text that I want in to my HTML by putting it into the p element
    let test = document.getElementById("heading").appendChild(nameElement); // Puts the p element in the correct spot

    $("#start_button").click(function() { // Once the button is clicked timer and score is set, and the functions to start the basics of the game and start the countdown of the timer start
        timer = 31; 
        score = 0;
        startGame();
        timerCountDown();
        $(this).off();
    });

    $("#gamespace").on("click", "img", function() { //Changes score and hides the image clicked
        changeScore();
        $(this).hide(); 
    });

    $("#foot").load("load/load.html");


});


function randomHeightFunction() {
    let randomHeight = Math.random() * 290; //Chooses a random number betweek 0 and 290px, this is to determine where the alien is placed on the y axis in the gamespace
    return randomHeight;
}

function randomWidthFunction() {
    let randomWidth = Math.random() * 515; // Chooses a random number between 0 and 515, this is to determine where the alien is placed on the x axis
    return randomWidth;
}


let score = 0;
function changeScore() { // score variable and replaces the html with that score, meant to be used when image is clicked
    score = score + 1;
    $("#score").html(score + " pts");
}

function startGame() { // Makes timer visible and starts the timer, adds image of aliens as well and starts the process of making them randomly dissapear
    $("#timer").css("visibility", "visible");
    addImage();
    hideImage();
}

function timerCountDown() { //Important function
    if (timer > 0) {
        t = setTimeout("timerCountDown()", 1000); //Counts down by one second
        timer = timer - 1;
        $("#timer").html(`${timer} seconds left`);//Updates the timer
    } else {
        $("div#gamespace img").hide(); //When the game ends all the images become hidden, therefore ending the game
        clearTimeout(imageSpeed); //These three lines are to stop all the functions from repeating themselves when the timer ends
        clearTimeout(t);
        clearTimeout(hidingSpeed);
        alert(`Congrats! You got ${score} points`); //Alert to let user know the score at the end of the game
        location.reload(); //Refreshes the page to restart the game
    }
}

let idCount = 1;
function addImage() { 
    let randomY = randomHeightFunction(); //Allows image to be randomly placed
    let randomX = randomWidthFunction();
    $("#gamespace").prepend(`<img class="alien" id="alien${idCount}" src="img/galagaAlien.png"/ style="left: ${randomX}px; top: ${randomY}px;">`); // Puts alien image in the gamespace
    idCount++; //Changes id so it is different each time 
    imageSpeed = setTimeout("addImage()", Math.random() * 2001); //Images appear randomly for any amount of time below 2 seconds
}

function hideImage() { //Randomly hides images, uses random math to set a random timer and randomly chooses a id number of the alien
    hidingSpeed = setTimeout("hideImage()", Math.random() * 3500);
    idDissapear = Math.ceil(Math.random() * idCount); // Make array of ids that have already dissapeared, if the id picked appears in that array then add 1 to idDissapear until we reach an id that hasn't been picked yet.
    usedNumbers.push(idDissapear);
    console.log(usedNumbers);
    $(`#alien${idDissapear}`).hide();
}
