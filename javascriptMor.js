
var users = []; // arrays of registers users

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
    document.getElementById(id).style.display = 'block';
}

function login(){
    document.getElementById('Welcome').style.display = 'none';
    document.getElementById('Register').style.display = 'none';
    document.getElementById('Settings').style.display = 'none';
    document.getElementById('Login').style.display = 'block';

}

function register(){
    document.getElementById('Welcome').style.display = 'none';
    document.getElementById('Login').style.display = 'none';
    document.getElementById('Settings').style.display = 'none';
    document.getElementById('Register').style.display = 'block';

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
        isValid = false;
    }
    if (password.length === 0) {
        $("#passwordRequired").css("display", "inline-block");
        isValid = false;
    }
    if (firstName.length === 0) {
        $("#firstNameRequired").css("display", "inline-block");
        isValid = false;
    }
    if (lastName.length === 0) {
        $("#lastNameRequired").css("display", "inline-block");
        isValid = false;
    }
    if (email.length === 0) {
        $("#emailRequired").css("display", "inline-block");
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
