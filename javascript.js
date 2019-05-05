
var users = []; // arrays of registers users

// game's buttons
var upButton;
var leftButton;
var rightButton;
var downButton;

// game's configuration
var ballsAmount;
var ghostAmount;
var time;
var fivePointColor;
var fifteenPointColor;
var twentyfivePointColor;

//
var context = canvas.getContext("2d");
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var fivePointsFood;
var fifteenPointsFood;
var twentyfivePointsFood;
var countFive = 0;
var countFifteen = 0;
var countTwentyfive = 0;

var direction = "RIGHT";

var music = new Audio('PacManOriginalTheme.mp3');

//ghosts
var positionGhost1 = new Object();
var positionGhost2 = new Object();
var positionGhost3 = new Object();
var savePosition;

var numberOfLives = 3;

// bonus
var bonus = new Object();
var lastBonusId = 1;
var bonusRecieve = false;

// heart
var heart = new Object();
var lastHeartId = 1;
var heartRecieve = false;

var isLost = false;

var map = [
    [7,0,0,0,0,0,0,0,0,0,0,0,0,7.2],
    [0,10,10,10,0,0,0,1,1,1,1,1,1,0],
    [0,10,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,10,10,0,0,0,0,0,0,0,1,1,1,0],
    [0,10,0,0,0,10,10,10,0,0,0,0,0,0],
    [0,10,10,10,0,10,10,10,10,0,0,1,1,0],
    [0,0,0,0,0,0,10,10,10,10,0,0,1,0],
    [0,0,0,0,0,10,10,10,10,0,0,0,1,0],
    [0,1,1,0,0,10,10,10,0,0,1,1,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,0,0,0,10,10,10,0,0],
    [0,1,0,0,0,1,0,0,0,0,0,10,10,10],
    [0,1,1,0,1,1,0,0,0,10,10,10,0,0],
    [7.1,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

function load(){
    var user = new User("a","a","a","a","a@a","4");
    users.push(user);
    showDiv('Welcome');
}



function showDiv(id){
    //clearInterval(interval);
    if (id !== 'startGame') {
        music.pause();
        clearInterval(interval);
        bonusRecieve = false;
        heartRecieve = false;

    }
    document.getElementById('Welcome').style.display = 'none';
    document.getElementById('Register').style.display = 'none';
    document.getElementById('Login').style.display = 'none';
    document.getElementById('Settings').style.display = 'none';
    document.getElementById('startGame').style.display = 'none';
    document.getElementById(id).style.display = 'block';
    if (id !== 'startGame') {
        if (id !== 'Settings') {
            $("input").val('');
            $("#userNameRequired").css("display", "none");
            $("#passwordRequired").css("display", "none");
            $("#firstNameRequired").css("display", "none");
            $("#lastNameRequired").css("display", "none");
            $("#emailRequired").css("display", "none");
            $("#userName").css("border", "0px white");
            $("#password").css("border", "0px white");
            $("#firstName").css("border", "0px white");
            $("#lastName").css("border", "0px white");
            $("#email").css("border", "0px white");
            $("#userRequired").css("display", "none");
            $("#userNameCheck").css("border", "0px white");
            $("#passRequired").css("display", "none");
            $("#PasswordCheck").css("border", "0px white");
        } else {
            $("#ballsAmount").val('50');
            $("#ghostAmount").val('1');
            $("#gameTime").val('60');
            $("#5Points").val("#FAEBD7");
            $("#15Points").val("#7FFFD4");
            $("#25Points").val("#BA55D3");
            $("#up").val('');
            $("#down").val('');
            $("#left").val('');
            $("#right").val('');
            leftButton = undefined;
            rightButton = undefined;
            upButton = undefined;
            downButton = undefined;
            countFive = 0;
            countFifteen = 0;
            countTwentyfive = 0;
            numberOfLives = 3;
            $("#live1").css("display", "inline-block");
            $("#live2").css("display", "inline-block");
            $("#live3").css("display", "inline-block");
        }
    }

}

$("#submit").click(function () {
    var isValid = true;
    var userName = $("#userName").val();
    var password = $("#password").val();
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();
    var day = $("#day").val();
    var month = $("#month").val();
    var year = $("#year").val();

    if (userName.length === 0) {
        $("#userNameRequired").css("display", "inline-block");
        $("#userName").css("border","2px solid red");
        isValid = false;
    }
    if (password.length === 0) {
        $("#passwordRequired").css("display", "inline-block");
        $("#password").css("border","2px solid red");
        isValid = false;
    }
    if (firstName.length === 0) {
        $("#firstNameRequired").css("display", "inline-block");
        $("#firstName").css("border","2px solid red");
        isValid = false;
    }
    if (lastName.length === 0) {
        $("#lastNameRequired").css("display", "inline-block");
        $("#lastName").css("border","2px solid red");
        isValid = false;
    }
    if (email.length === 0) {
        $("#emailRequired").css("display", "inline-block");
        $("#email").css("border","2px solid red");
        isValid = false;
    }


    if (isValid){

        $("#userNameRequired").css("display", "none");
        $("#passwordRequired").css("display", "none");
        $("#firstNameRequired").css("display", "none");
        $("#lastNameRequired").css("display", "none");
        $("#emailRequired").css("display", "none");

        var isVerified = true;

        if (!firstName.match(/^[A-Za-z]+$/)){
            $("#firstNameRequired").text('Numbers or characters are not allowed here').css("display","inline-block");
            isVerified = false;
        }
        if (!lastName.match(/^[A-Za-z]+$/)){
            $("#lastNameRequired").text('Numbers or characters are not allowed here').css("display","inline-block");
            isVerified = false;
        }

        if (!password.match(/^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?).{8,}$/)){
            $("#passwordRequired").text('Password should be at least 8 characters and a combination of letters and numbers').css("display","inline-block");
            isVerified = false;
        }
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            $("#emailRequired").text('Email should be in the format of username@domain.com/.il').css("display", "inline-block");
            isVerified = false;
        }

        if (isVerified){
            var isExist = false;
            for (i = 0; i < users.length; i++) {
                if (users[i].userName === userName) {
                    isExist = true;
                }
            }
            if (!isExist){
                var user = new User(userName,password,firstName,lastName,email,day + "/" + month + "/" + year);
                users.push(user);
                alert("The registration was successful");
                showDiv('Welcome');
            }
            else{
                $("#userNameRequired").text("This user name already exist, please choose another one").css("display", "inline-block");
            }
        }

    }
});


function User (userName, password, firstName, lastName, email, birthday){
    this.userName = userName;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthday = birthday;

}



function checkUser() {
    var passwordToCheck = $("#PasswordCheck").val();
    var userToCheck = $("#userNameCheck").val();

    if (passwordToCheck.length === 0 || userToCheck.length === 0) {
        //yuval - add 7 -start
        if (userToCheck.length === 0) {
            $("#userRequired").css("display", "inline-block");
            $("#userNameCheck").css("border", "2px solid red");

        }
        if (passwordToCheck.length === 0) {
            $("#passRequired").css("display", "inline-block");
            $("#PasswordCheck").css("border", "2px solid red");
        }
    }else {

        for (var i = 0; i < users.length; i++) {
            if (users[i].userName === userToCheck && users[i].password === passwordToCheck) {
                window.alert("Another moment and we start playing...");
                document.getElementById('Login').style.display = 'none';
                //document.getElementById('Settings').style.display = 'block';
                showDiv('Settings');
                return;
            }
        }
        window.alert("There is mistake");
    }

}

function showAboutDialog() {
    document.getElementById("aboutDialog").showModal();
}


function closeAboutDialog() {
    var dialog = document.getElementById("aboutDialog");
    dialog.close();
}

function closeAboutDialogWithClick(){
    var dialog = document.getElementById("aboutDialog");
    window.onclick = function(event) {
        if (event.target == dialog) {
            dialog.close();
        }
    }
}

// get up button
$("#up").keydown(function (event) {
    upButton = String.fromCharCode(event.which);
    $("#up").text('');
    if (upButton === "&"){
        $("#up").val("Arrow UP was chosen");
        return;
    }
    if (upButton === "'"){
        $("#up").val("Arrow RIGHT was chosen");
        return;
    }
    if (upButton === "("){
        $("#up").val("Arrow DOWN was chosen");
        return;
    }
    if (upButton === "%"){
        $("#up").val("Arrow LEFT was chosen");
        return;
    }
    $("#up").val(upButton + " was chosen");
    //upButton = event.code;
});

//get left button
$("#left").keydown(function (event) {
    leftButton = String.fromCharCode(event.which);
    $("#left").text('');
    if (leftButton === "&"){
        $("#left").val("Arrow UP was chosen");
        return;
    }
    if (leftButton === "'"){
        $("#left").val("Arrow RIGHT was chosen");
        return;
    }
    if (leftButton === "("){
        $("#left").val("Arrow DOWN was chosen");
        return;
    }
    if (leftButton === "%"){
        $("#left").val("Arrow LEFT was chosen");
        return;
    }
    $("#left").val(leftButton + " was chosen");
    //leftButton = event.code;
});

// get right button
$("#right").keydown(function (event) {
    rightButton = String.fromCharCode(event.which);
    $("#right").text('');
    if (rightButton === "&"){
        $("#right").val("Arrow UP was chosen");
        return;
    }
    if (rightButton === "'"){
        $("#right").val("Arrow RIGHT was chosen");
        return;
    }
    if (rightButton === "("){
        $("#right").val("Arrow DOWN was chosen");
        return;
    }
    if (rightButton === "%"){
        $("#right").val("Arrow LEFT was chosen");
        return;
    }
    $("#right").val(rightButton + " was chosen");
    //rightButton = event.code;
    //alert(rightButton);
});

// get down button
$("#down").keydown(function (event) {
    downButton = String.fromCharCode(event.which);
    $("#down").text('');
    if (downButton === "&"){
        $("#down").val("Arrow UP was chosen");
        return;
    }
    if (downButton === "'"){
        $("#down").val("Arrow RIGHT was chosen");
        return;
    }
    if (downButton === "("){
        $("#down").val("Arrow DOWN was chosen");
        return;
    }
    if (downButton === "%"){
        $("#down").val("Arrow LEFT was chosen");
        return;
    }
    $("#down").val(downButton + " was chosen");
    //downButton = event.code;
});



$("#start").click(function () {
    $("#left").css("border","");
    $("#up").css("border","");
    $("#right").css("border","");
    $("#down").css("border","");
    var isValid = true;
    ballsAmount = $("#ballsAmount").val();
    ghostAmount = $("#ghostAmount").val();
    time = $("#gameTime").val();
    fivePointColor = $("#5Points").val();
    fifteenPointColor = $("#15Points").val();
    twentyfivePointColor = $("#25Points").val();
    if (leftButton === undefined){
        $("#left").css("border","2px solid red");
        isValid = false;
    }
    if (downButton === undefined ){
        $("#down").css("border","2px solid red");
        isValid = false;
    }
    if(rightButton === undefined){
        $("#right").css("border","2px solid red");
        isValid = false;
    }
    if (upButton === undefined){
        $("#up").css("border","2px solid red");
        isValid = false;
    }
    if (ballsAmount !== '' && (ballsAmount < 50 || ballsAmount > 90)){
        isValid = false;
    }
    if (ghostAmount !== '' && (ghostAmount < 1 || ghostAmount > 3)){
        isValid = false;
    }
    if (time !== '' && time < 60){
        isValid = false;
    }


    if (isValid) {
        fivePointsFood = Math.ceil(ballsAmount * 60 / 100);
        fifteenPointsFood = Math.floor(ballsAmount * 30 / 100);
        twentyfivePointsFood = Math.floor(ballsAmount * 10 / 100);
        setGameParameters();
        StartGame();
        showDiv('startGame');
        music.loop = true;
        music.play();
    }
});

$("#random").click(function () {
    $("#ghostAmount").val(Math.floor( Math.random() * (4-1) + 1));
    $("#ballsAmount").val(Math.floor(Math.random() * (91 - 50) + 50));
    $("#gameTime").val(Math.floor(Math.random() * (600 - 60) + 60));
    $("#left").val("Arrow LEFT was chosen");
    $("#up").val("Arrow UP was chosen");
    $("#down").val("Arrow DOWN was chosen");
    $("#right").val("Arrow RIGHT was chosen");
    leftButton = 'ArrowLeft';
    upButton = 'ArrowUp';
    rightButton = 'ArrowRight';
    downButton = 'ArrowDown';
    while (true) {
        var color5Point = getRandomColor();
        var color15Point = getRandomColor();
        var color25Point = getRandomColor();
        if (color5Point !== color15Point || color5Point !== color25Point || color15Point !== color5Point) {
            $("#5Points").val(color5Point);
            $("#15Points").val(color15Point);
            $("#25Points").val(color25Point);
            break;
        }
    }

});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setGameParameters() {

    var c = document.getElementById("first");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(25, 15, 5, 0, 2 * Math.PI);
    ctx.fillStyle = fivePointColor;
    ctx.fill();
    ctx.stroke();
    c = document.getElementById("second");
    ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(18, 15, 5, 0, 2 * Math.PI);
    ctx.fillStyle = fifteenPointColor;
    ctx.fill();
    ctx.stroke();
    c = document.getElementById("third");
    ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(18, 15, 5, 0, 2 * Math.PI);
    ctx.fillStyle = twentyfivePointColor;
    ctx.fill();
    ctx.stroke();
}




function StartGame() {
    // clearInterval(interval);
    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = 196;
    var food_remain = ballsAmount;
    var pacman_remain = 1;
    start_time = new Date();

    savePosition = new Array();
    for (var i = 0; i < 3; i++) {
        savePosition[i] = new Array();
    }

    for (var i = 0; i < 14; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 14; j++) {

            if(map[i][j] === 7){
                board[i][j] = 7;
                positionGhost1.i = i;
                positionGhost1.j = j;
                continue;
            }

            if(ghostAmount === "2" && map[i][j] === 7.1){
                board[i][j] = 7.1;
                positionGhost2.i = i;
                positionGhost2.j = j;
                continue;
            }

            if((map[i][j] === 7.2  || map[i][j] === 7.1) && ghostAmount === "3"){
                board[i][j] = map[i][j];
                //board[13][0] = 7.1;
                positionGhost3.i = 0;
                positionGhost3.j = 13;
                positionGhost2.i = 13;
                positionGhost2.j = 0;
                continue;
            }

            if (map[i][j] === 1 || map[i][j] === 10) {
                board[i][j] = 4;
            } else {
                var randomNum = Math.random();
                if (randomNum <= 1.0 * food_remain / cnt) {
                    food_remain--;
                    board[i][j] = 1;
                } else if (i !== 0 && j !== 0 && i !== 13 && j !== 13  && pacman_remain > 0/*&& randomNum < 1.0 * (pacman_remain + food_remain) / cnt*/) {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    board[i][j] = 2;
                } else {
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }
    while (food_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_remain--;
    }
    if (!bonusRecieve) {
        emptyCell = findRandomCellForExtra(board);
        board[emptyCell[0]][emptyCell[1]] = 6; // bonus
        bonus.i = emptyCell[0];
        bonus.j = emptyCell[1];
    }

    if (!heartRecieve && numberOfLives !== 3){
        emptyCell = findRandomCellForExtra(board);
        board[emptyCell[0]][emptyCell[1]] = 8; // heart
        heart.i = emptyCell[0];
        heart.j = emptyCell[1];
    }


    keysDown = {};
    setColors();
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);
    interval = setInterval(UpdatePosition, 250);
    //intervalBonus = setInterval(moveBonus,250);
}


function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * 13) + 1);
    var j = Math.floor((Math.random() * 13) + 1);
    while (board[i][j] !== 0) {
        i = Math.floor((Math.random() * 13) + 1);
        j = Math.floor((Math.random() * 13) + 1);
    }
    return [i, j];
}

function findRandomCellForExtra(board) {
    var i = Math.floor((Math.random() * 13) + 1);
    var j = Math.floor((Math.random() * 13) + 1);
    while (board[i][j] !== 1) {
        i = Math.floor((Math.random() * 13) + 1);
        j = Math.floor((Math.random() * 13) + 1);
    }
    return [i, j];
}

/**
 * @return {number}
 */
function GetKeyPressed() {
    if (keysDown['ArrowUp']) {
        return 1;
    }
    if (keysDown['ArrowDown']) {
        return 2;
    }
    if (keysDown['ArrowLeft']) {
        return 3;
    }
    if (keysDown['ArrowRight']) {
        return 4;
    }
}

function drawPacmanPosition(x,y,radius,startAngle,endAngle,eyeX,eyeY){
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle); // half circle
    context.lineTo(x, y);
    context.fillStyle = pac_color;
    context.fill();
    context.arc(x, y, radius, startAngle, endAngle); // half circle
    context.fillStyle = "black";
    context.lineWidth = 1;
    context.stroke();
    context.beginPath();
    context.arc(eyeX, eyeY, 1, 0, 2 * Math.PI); // circle
    context.fillStyle = "black"; //color
    context.fill();
}

function drawGhost(x, y, radius, color) {
    context.beginPath();
    context.arc(x, y, 8, Math.PI, 0, false);
    context.moveTo(x - 8, y);
    context.lineTo(x-radius, y+radius-radius/4);
    context.lineTo(x-radius+radius/3, y+radius);
    context.lineTo(x-radius+radius/3*2, y+radius-radius/4);
    context.lineTo(x, y+radius);
    context.lineTo(x+radius/3, y+radius-radius/4);
    context.lineTo(x+radius/3*2, y+radius);
    context.lineTo(x+radius, y+radius-radius/4);
    context.lineTo(x+radius, y);
    context.lineTo(x+8, y+8);
    context.lineTo(x+8, y);
    context.fillStyle = color;
    context.fill();

    context.fillStyle = "white"; //left eye
    context.beginPath();
    context.arc(x-8/2.5, y-8/5, 8/4, 0, Math.PI*2, true); // white
    context.fill();

    context.fillStyle = "white"; //right eye
    context.beginPath();
    context.arc(x+8/2.5, y-8/5, 8/4, 0, Math.PI*2, true); // white
    context.fill();

    context.fillStyle="black"; //left eyeball
    context.beginPath();
    context.arc(x-8/3+8/15, y-8/5, 8/6, 0, Math.PI*2, true); //black
    context.fill();

    context.fillStyle="black"; //right eyeball
    context.beginPath();
    context.arc(x+8/3+8/5, y-8/5, 8/6, 0, Math.PI*2, true); //black
    context.fill();

}

function drawLife() {
    if (numberOfLives === 3){
        $("#live1").css("display","inline-block");
        $("#live2").css("display","inline-block");
        $("#live3").css("display","inline-block");
    }
    if (numberOfLives === 2){
        $("#live1").css("display","inline-block");
        $("#live2").css("display","inline-block");
        $("#live3").css("display","none");
    }
    if (numberOfLives === 1){
        $("#live1").css("display","inline-block");
        $("#live2").css("display","none");
        $("#live3").css("display","none");

    }

}

function Draw(key) {
    drawLife();
    context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    $("#score").text(score);
    $("#remainingTime").text(time_elapsed);
    for (var i = 0; i < 14; i++) {
        for (var j = 0; j < 14; j++) {
            var center = new Object();
            center.x = i * 27 + 10;
            center.y = j * 27 + 10;
            if (board[i][j] === 2) {
                if (key === "RIGHT") { // right
                    drawPacmanPosition(center.x,center.y,8,0.15 * Math.PI, 1.85 * Math.PI,center.x - 3, center.y - 2);
                }
                else if (key === "DOWN"){ //down
                    drawPacmanPosition(center.x,center.y,8,0.65 * Math.PI,2.35 * Math.PI, center.x - 3 , center.y - 2);
                }
                else if (key === "LEFT"){ //left
                    drawPacmanPosition(center.x,center.y,8,-0.85 * Math.PI, 0.85 * Math.PI, center.x + 2, center.y - 3);
                }
                else if (key === "UP"){ //up
                    drawPacmanPosition(center.x,center.y,8,-0.35 * Math.PI, 1.35 * Math.PI,center.x + 3,center.y + 2);
                }

            } else if (board[i][j] === 5 || board[i][j] === 15 || board[i][j] === 25) {
                var color;
                if (board[i][j] === 5){
                    color = fivePointColor;
                }
                if (board[i][j] === 15){
                    color = fifteenPointColor;
                }
                if (board[i][j] === 25){
                    color = twentyfivePointColor;
                }
                context.beginPath();
                context.arc(center.x + 1, center.y + 1, 3, 0, 2 * Math.PI); // circle
                context.fillStyle = color; //color
                context.fill();
            } else if (board[i][j] === 4 && map[i][j] === 10){
                context.beginPath();
                context.rect(center.x - 10, center.y  - 10, 20, 20);
                context.fillStyle = "rgb(115,115,115)"; //color
                context.fill();
            }
            else if (board[i][j] === 4) {
                context.beginPath();
                context.rect(center.x - 10, center.y  - 10, 20, 20);
                context.fillStyle = "rgb(179,179,179)"; //color
                context.fill();
                //context.stroke();
            }
            // draw monster
            else if (board[i][j] === 7 || board[i][j] === 7.1 || board[i][j] === 7.2) {//draw ghost 1 - yuval
                //context.drawImage(ghost1, center.x - 8, center.y - 8, 18, 23);
                var color;
                if (board[i][j] === 7){
                    color = "red";
                }
                if(board[i][j] === 7.1){
                    color = "blue";
                }
                if(board[i][j] === 7.2){
                    color = "green";
                }
                var radius = 8;
                drawGhost(center.x,center.y,8,color);
            }
            else if(board[i][j] === 6){ // bonus
                var image = new Image();
                image.src = "hamburger.png";
                context.drawImage(image,center.x - 2,center.y,13,13);
            }
            else if(board[i][j] === 8 && numberOfLives !== 3){ // heard
                image = new Image();
                image.src = "heart.png";
                context.drawImage(image,center.x - 2,center.y,13,13);
            }




        }
    }
    //drawWalls();

}

function isMonsterPosition(i,j) {
    if (i === positionGhost1.i && j === positionGhost1.j) {
        return true;
    }
    if (ghostAmount >=2 && i === positionGhost2.i && j === positionGhost2.j) {
        return true;
    }
    return (ghostAmount ===3 && i === positionGhost3.i && j === positionGhost3.j);

}

function getMonsterIndex(i, j) {
    if (i === positionGhost1.i && j === positionGhost1.j){
        return 7;
    }
    if (ghostAmount >=2 && i === positionGhost2.i && j === positionGhost2.j){
        return 7.1;
    }
    return 7.2;
}

function UpdatePosition() {
    if (!isLost) {
        board[shape.i][shape.j] = 0;
    }
    updateGhostLocation(positionGhost1, 7 , 0);
    if(ghostAmount >= 2) {
        updateGhostLocation(positionGhost2, 7.1, 1);
    }
    if(ghostAmount === 3) {
        updateGhostLocation(positionGhost3, 7.2, 2);
    }

    if (isLost){
        board[shape.i][shape.j] = getMonsterIndex(shape.i,shape.j);
        Draw(direction);
        if (numberOfLives === 1){
            window.alert("Game Over");
            music.pause();
            showDiv('Settings');
            clearInterval();
        }
        else{
            alert("You lost");
            clearInterval(interval);
        }
    }
    if (!bonusRecieve) {
        moveExtra(bonus, 6,true, lastBonusId);
    }

    if (!heartRecieve && numberOfLives !== 3){
        moveExtra(heart, 8,false, lastHeartId);
    }

    var x = GetKeyPressed();
    if (x === 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4 ) {
            shape.j--;
        }
        direction = "UP";
    }
    if (x === 2) {
        if (shape.j < 13 && board[shape.i][shape.j + 1] !== 4 ) {
            shape.j++;
        }
        direction = "DOWN";
    }
    if (x === 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4  ) {
            shape.i--;
        }
        direction = "LEFT";
    }
    if (x === 4) {
        if (shape.i < 13 && board[shape.i + 1][shape.j] !== 4) {
            shape.i++;
        }
        direction = "RIGHT";
    }
    if (board[shape.i][shape.j] === 5) {
        score+=5;
        fivePointsFood--;
    }
    if (board[shape.i][shape.j] === 15) {
        score+=15;
        fifteenPointsFood--;
    }
    if (board[shape.i][shape.j] === 25) {
        score+=25;
        twentyfivePointsFood--;
    }
    if (shape.i === bonus.i && shape.j === bonus.j && board[shape.i][shape.j] === 50){
        score +=50;
        board[bonus.i][bonus.j] = 2;
        bonusRecieve = true;
        // board[bonus.i][bonus.j] = lastBonusId;

    }
    if (shape.i === heart.i && shape.j === heart.j){
        numberOfLives++;
        board[heart.i][heart.j] = 2;
        heartRecieve = true;
        // board[bonus.i][bonus.j] = lastBonusId;

    }
    if (isMonsterPosition(shape.i,shape.j)){
        board[shape.i][shape.j] = getMonsterIndex(shape.i,shape.j);
        Draw(direction);
        if (numberOfLives === 1){
            window.alert("Game Over");
            music.pause();
            showDiv('Settings');
            clearInterval();
        }
        else{
            alert("You lost");
            clearInterval(interval);
        }
    }
    else {
        board[shape.i][shape.j] = 2;
        var currentTime = new Date();
        time_elapsed = Math.floor((currentTime - start_time) / 1000);
        if (score === (5 * countFive + 15 * countFifteen + 25 * countTwentyfive)) {
            window.clearInterval(interval);
            window.alert("Game completed");
            music.pause();
            showDiv('Settings');
        }
        if (time_elapsed === time) {
            window.clearInterval(interval);
            window("Game Over...");
            music.pause();
        } else {
            Draw(direction);
        }
    }

}

function setColors(){
    for (let i = 0; i < 14; i++) {
        for (let j = 0; j < 14; j++) {
            if (board[i][j] === 1) {
                while(true) {
                    if (countFive > fivePointsFood && countFifteen > fifteenPointsFood && countTwentyfive > twentyfivePointsFood) {
                        break;
                    }
                    var ran = Math.floor((Math.random() * 3) + 1);
                    if (ran === 1 && countFive <= fivePointsFood) {
                        board[i][j] = 5; // for five point food
                        countFive++;
                        break;
                    }
                    if (ran === 2 && countFifteen <= fifteenPointsFood) {
                        board[i][j] = 15; // for fifteen point food
                        countFifteen++;
                        break;
                    }
                    if (ran === 3 && countTwentyfive <= twentyfivePointsFood) {
                        board[i][j] = 25; // for twenty five point food
                        countTwentyfive++;
                        break;
                    }
                }
            }
        }
    }
}


function isLegalPosition(x, y, isBonus) {
    if (x > - 1 && x < 14 && y > -1 && y < 14) {
        var isLegal = isBonus && board[x][y] !== 8; // the shape is bonus and the new location isn't heart
        if (!isBonus) {
            isLegal = board[x][y] !== 6; // the shape is heart and the new location isn't bonus
        }
        return isLegal && board[x][y] !== 4 && board[x][y] !== 7 && board[x][y] !== 7.1 && board[x][y] !== 7.2;
    }
    return false;
}

function moveExtra(shape,index, isBonus, id){
    var rand = Math.random();
    // while (true) {
        if (rand < 0.5) {
            if (isLegalPosition(shape.i + 1, shape.j, isBonus)) {
                board[shape.i][shape.j] = id;
                shape.i++;
                if (board[shape.i][shape.j] !== 2) {
                    id = board[shape.i][shape.j];
                }
                board[shape.i][shape.j] = index;
                // break;
            }
            if (isLegalPosition(shape.i - 1, shape.j, isBonus)) {
                board[shape.i][shape.j] = id;
                bonus.i--;
                if (board[shape.i][shape.j] !== 2) {
                    id = board[shape.i][shape.j];
                }
                board[shape.i][shape.j] = index;
                // break;
            }
        }
        else {
            if (isLegalPosition(shape.i, shape.j + 1, isBonus)) {
                board[shape.i][shape.j] = id;
                shape.j++;
                if (board[shape.i][shape.j] !== 2) {
                    id = board[shape.i][shape.j];
                }
                board[shape.i][shape.j] = index;
                // break;
            }

            if (isLegalPosition(shape.i, shape.j - 1, isBonus)) {
                board[shape.i][shape.j] = id;
                shape.j--;
                if (board[shape.i][shape.j] !== 2) {
                    id = board[shape.i][shape.j];
                }
                board[shape.i][shape.j] = index;
                // break;
            }
        }
        // rand = Math.random();
    // }
}

function isPossibleMoveForGhost(i, j) {
    if (i >= 0 && i < 14 && j >= 0 && j < 14){
        return board[i][j] !== 4 && board[i][j] !== 7 && board[i][j] !== 7.1 && board[i][j] !== 7.2 &&
            board[i][j] !== 6 && board[i][j] !== 8;
    }
    return false;

}

function updateGhostLocation(positionGhost, IdGhost ,typeGhost ) {
    var ran = Math.random();
    // var isMoved = moveGhost(positionGhost,IdGhost, typeGhost);
    var isMoved = false;
    // while (true) {
    if (ran < 0.5) {
        if (shape.j > positionGhost.j) {
            if (shape.i === positionGhost.i) {
                if (isPossibleMoveForGhost(positionGhost.i, positionGhost.j + 1)) {
                    board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                    positionGhost.j++;
                    isMoved = true;
                    // break;
                } else if (rand < 0.25 && isPossibleMoveForGhost(positionGhost.i + 1, positionGhost.j)) {
                    board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                    positionGhost.i++;
                    isMoved = true;
                    // break;
                } else if (isPossibleMoveForGhost(positionGhost.i - 1, positionGhost.j)) {
                    board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                    positionGhost.i--;
                    isMoved = true;
                    // break;
                }
            } else if (isPossibleMoveForGhost(positionGhost.i, positionGhost.j + 1)) {
                board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                positionGhost.j++;
                isMoved = true;
                // break;
            }
            else if (shape.i > positionGhost.i && isPossibleMoveForGhost(positionGhost.i + 1, positionGhost.j)){
                board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                positionGhost.i++;
                isMoved = true;
            }
            else if (shape.i < positionGhost.i && isPossibleMoveForGhost(positionGhost.i - 1, positionGhost.j)){
                board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                positionGhost.i--;
                isMoved = true;
            }
        } else if (shape.j < positionGhost.j) {
            if (shape.i === positionGhost.i) {
                if (isPossibleMoveForGhost(positionGhost.i, positionGhost.j - 1)) {
                    board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                    positionGhost.j++;
                    isMoved = true;
                    // break;
                } else if (rand < 0.25 && isPossibleMoveForGhost(positionGhost.i + 1, positionGhost.j)) {
                    board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                    positionGhost.i++;
                    isMoved = true;
                    // break;
                } else if (isPossibleMoveForGhost(positionGhost.i - 1, positionGhost.j)) {
                    board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                    positionGhost.i--;
                    isMoved = true;
                    // break;
                }
            } else if (isPossibleMoveForGhost(positionGhost.i, positionGhost.j - 1)) {
                board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                positionGhost.j--;
                isMoved = true;
                // break;
            }
            else if (shape.i > positionGhost.i && isPossibleMoveForGhost(positionGhost.i + 1, positionGhost.j)){
                board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                positionGhost.i++;
                isMoved = true;
            }
            else if (shape.i < positionGhost.i && isPossibleMoveForGhost(positionGhost.i - 1, positionGhost.j)){
                board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                positionGhost.i--;
                isMoved = true;
            }
        }
        else if (isPossibleMoveForGhost(positionGhost.i , positionGhost.j - 1)){
            board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
            positionGhost.j--;
        }
    } else {
        if (shape.i > positionGhost.i) {
            if (shape.j === positionGhost.j){
                if (isPossibleMoveForGhost(positionGhost.i + 1, positionGhost.j)){
                    board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                    positionGhost.i++;
                    isMoved = true;
                    // break;
                }
                else if (rand < 0.25 && isPossibleMoveForGhost(positionGhost.i , positionGhost.j + 1)){
                    board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                    positionGhost.j++;
                    isMoved = true;
                    // break;
                    isMoved = true;
                    // break;
                }
            } else if (isPossibleMoveForGhost(positionGhost.i + 1, positionGhost,j)){
                board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                positionGhost.i++;
                isMoved = true;
                // break;
            }
            else if (shape.j > positionGhost.j && isPossibleMoveForGhost(positionGhost.i, positionGhost.j + 1)){
                board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                positionGhost.j++;
                isMoved = true;
            }
            else if (shape.j < positionGhost.j && isPossibleMoveForGhost(positionGhost.i, positionGhost.j - 1)){
                board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                positionGhost.j--;
                isMoved = true;
            }
        } else if (shape.i < positionGhost.i) {
            if (shape.j === positionGhost.j){
                if (isPossibleMoveForGhost(positionGhost.i - 1, positionGhost.j)){
                    board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                    positionGhost.i--;
                    isMoved = true;
                    // break;
                }
                else if (rand < 0.25 && isPossibleMoveForGhost(positionGhost.i, positionGhost.j + 1)){
                    board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                    positionGhost.j++;
                    isMoved = true;
                    // break;
                }
                else if (isPossibleMoveForGhost(positionGhost.i, positionGhost.j - 1)){
                    board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                    positionGhost.j--;
                    isMoved = true;
                    // break;
                }
            } else if (isPossibleMoveForGhost(positionGhost.i - 1, positionGhost.j)){
                board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                positionGhost.i--;
                isMoved = true;
                // break;
            }
            else if (shape.j > positionGhost.j && isPossibleMoveForGhost(positionGhost.i, positionGhost.j + 1)){
                board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                positionGhost.j++;
                isMoved = true;
            }
            else if (shape.j < positionGhost.j && isPossibleMoveForGhost(positionGhost.i, positionGhost.j - 1)){
                board[positionGhost.i][positionGhost.j] = savePosition[typeGhost][2]; //save position of ghost
                positionGhost.j--;
                isMoved = true;
            }
        }

        }
    //     ran = Math.random();
    // }

    if (isMoved){
        savePositionOfFoodGhost(positionGhost, typeGhost);
        if (board[positionGhost.i][positionGhost.j] === 2) {
            isLost = true;
        }
        board[positionGhost.i][positionGhost.j] = IdGhost;
    }
}


function savePositionOfFoodGhost( positionGhost , typeGhost) {
    savePosition[typeGhost][0] = positionGhost.i;
    savePosition[typeGhost][1] = positionGhost.j;
    savePosition[typeGhost][2] = board[positionGhost.i][positionGhost.j];
}

function startNewGame(){
    showDiv('Settings');
}

function startAgain(){
    //board[shape.i][shape.j] = 7;
    numberOfLives--;
    bonusRecieve = false;
    clearInterval(interval);
    countFive = 0;
    countFifteen = 0;
    countTwentyfive = 0;
    score = 0;
    time_elapsed = 0;
    direction = "RIGHT";
    StartGame();
    showDiv('startGame');

}