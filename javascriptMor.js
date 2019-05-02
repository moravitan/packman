
var users = []; // arrays of registers users

// game's buttons
var upButton;
var leftButton;
var rightButton;
var downButton;

// game's configuration
var ballsAmount;
var monsterAmount;
var time;
var fivePointColor;
var fifteenPointColor;
var twentyfivePointColor;



function start(){
    var user = new User("a","a","a","a","a@a","4");
    users.push(user);
    showDiv('Welcome');
}


function showDiv(id){

    document.getElementById('Welcome').style.display = 'none';
    document.getElementById('Register').style.display = 'none';
    document.getElementById('Login').style.display = 'none';
    document.getElementById('Settings').style.display = 'none';
    document.getElementById('startGame').style.display = 'none';
    document.getElementById(id).style.display = 'block';
    if (id !== 'Settings'){
        $("input").val('');
    }
    else{
        $("#ballsAmount").val('50');
        $("#monsterAmount").val('1');
        $("#gameTime").val('60');
        $("#5Points").val("#FAEBD7");
        $("#15Points").val("#7FFFD4");
        $("#25Points").val("#BA55D3");
    }
}

$("#submit").click(function () {
    var isValid = true;

    var userName = $("#userName").val();
    var password = $("#password").val();
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();

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
                var user = new User(userName,password,firstName,lastName,email,"birthday");
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
    var passwordToCheck = document.getElementById("PasswordCheck").value;
    var userToCheck = document.getElementById("userNameCheck").value;
    for (var i = 0; i < users.length; i++) {
        if (users[i].userName === userToCheck && users[i].password === passwordToCheck) {
            window.alert("Another moment and we start playing...");
            document.getElementById('Login').style.display = 'none';
            document.getElementById('Settings').style.display = 'block';
            return;
        }
    }
    window.alert("There is mistake");

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
});



$("#start").click(function () {
    $("#left").css("border","");
    $("#up").css("border","");
    $("#right").css("border","");
    $("#down").css("border","");
    var isValid = true;
    // checkArrowsPressed();
    ballsAmount = $("#ballsAmount").val();
    monsterAmount = $("#monsterAmount").val();
    time = $("#gameTime").val();
    fivePointColor = $("#5Points");
    fifteenPointColor = $("#15Points");
    twentyfivePointColor = $("#25Points");
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
        $("#balls").css("display","inline-block").css("color","red").css("font-weight","bold");
    }
    if (monsterAmount !== '' && (monsterAmount < 1 || monsterAmount > 3)){
        isValid = false;
        $("#monster").css("display","inline-block").css("color","red").css("font-weight","bold");
    }
    if (time !== '' && time < 60){
        isValid = false;
        $("#time").css("display","inline-block").css("color","red").css("font-weight","bold");
    }

    if (isValid) {
        showDiv('startGame')
    }
});

$("#random").click(function () {
    $("#monsterAmount").val(Math.floor( Math.random() * (4-1) + 1));
    $("#ballsAmount").val(Math.floor(Math.random() * (91 - 50) + 50));
    $("#gameTime").val(Math.floor(Math.random() * (600 - 60) + 60));
    $("#left").val("Arrow LEFT was chosen");
    $("#up").val("Arrow UP was chosen");
    $("#down").val("Arrow DOWN was chosen");
    $("#right").val("Arrow RIGHT was chosen");
    leftButton = "%";
    upButton = "&";
    rightButton = "'";
    downButton = "(";
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



/*
var context = canvas.getContext("2d");
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

Start();

function Start() {
    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = 100;
    var food_remain = 50;
    var pacman_remain = 1;
    start_time = new Date();
    for (var i = 0; i < 10; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 10; j++) {
            if ((i === 3 && j === 3) || (i === 3 && j === 4) || (i === 3 && j === 5) || (i === 6 && j === 1) || (i === 6 && j === 2)) {
                board[i][j] = 4;
            } else {
                var randomNum = Math.random();
                if (randomNum <= 1.0 * food_remain / cnt) {
                    food_remain--;
                    board[i][j] = 1;
                } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
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
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);
    interval = setInterval(UpdatePosition, 250);
}


function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * 9) + 1);
    var j = Math.floor((Math.random() * 9) + 1);
    while (board[i][j] !== 0) {
        i = Math.floor((Math.random() * 9) + 1);
        j = Math.floor((Math.random() * 9) + 1);
    }
    return [i, j];
}

/!**
 * @return {number}
 *!/
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

function Draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] === 2) {
                context.beginPath();
                context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] === 1) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] === 4) {
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey"; //color
                context.fill();
            }
        }
    }


}

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x === 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
            shape.j--;
        }
    }
    if (x === 2) {
        if (shape.j < 9 && board[shape.i][shape.j + 1] !== 4) {
            shape.j++;
        }
    }
    if (x === 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
            shape.i--;
        }
    }
    if (x === 4) {
        if (shape.i < 9 && board[shape.i + 1][shape.j] !== 4) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] === 1) {
        score++;
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (score >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    if (score === 50) {
        window.clearInterval(interval);
        window.alert("Game completed");
    } else {
        Draw();
    }
}*/
