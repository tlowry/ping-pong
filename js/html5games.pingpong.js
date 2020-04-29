var KEY =
        {
            UP: 38,
            DOWN: 40,
            W: 87,
            S: 83
        };

//Object to hold global variables
var pingpong = {
    scoreA: 0,
    scoreB: 0,
    aiDirection: 'UP'
};

var soundRacketHit;

//array of keys
pingpong.pressedKeys = [];

pingpong.ball =
        {
            speed: 5,
            x: 150,
            y: 100,
            directionX: 1,
            directionY: 1
        };

$(function()
{


    pingpong.timer = setInterval(gameloop, 30);


    soundRacketHit = new Audio("audio/racketHit.ogg");
    soundRacketHit.looping = true;

    //mark down what key is down and up into an array called "pressedKeys" each time their status changes
    $(document).keydown(function(e)
    {
        pingpong.pressedKeys[e.which] = true;
    });

    $(document).keyup(function(e)
    {
        pingpong.pressedKeys[e.which] = false;
    });

});

function gameloop()
{
    movePaddles();
    aiPaddle();
    moveBall();
}

function movePaddles()
{
    if (pingpong.pressedKeys[KEY.UP])
    {
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top", top - 5);
    }
    ;
    if (pingpong.pressedKeys[KEY.DOWN])
    {
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top", top + 5);
    }
    ;

    if (pingpong.pressedKeys[KEY.W])
    {
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top", top - 5);
    }
    ;
    if (pingpong.pressedKeys[KEY.S])
    {
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top", top + 5);
    }
    ;

}

function aiPaddle()
{
    var ballPos = parseInt($("#ball").css("top"));

    var top = parseInt($("#paddleB").css("top"));
    var padSpeed = Math.floor(Math.random() * 10) + 1;

    if (ballPos > top)
    {
        pingpong.aiDirection = 'DOWN';
    }

    else if (ballPos < top)
    {
        pingpong.aiDirection = 'UP';
    }

    if (top <= 0)
    {
        pingpong.aiDirection = 'DOWN';
    }

    if (top > 140)
    {
        pingpong.aiDirection = 'UP';
    }

    if (pingpong.aiDirection === 'UP' && padSpeed > 0)
    {
        padSpeed = -padSpeed;
    }

    if (pingpong.aiDirection === 'DOWN' && padSpeed < 0)
    {
        padSpeed = -padSpeed;
    }

    $("#paddleB").css("top", top + padSpeed);
}

function moveBall()
{
    var playgroundHeight = parseInt($("#playground").css("height"));
    var playgroundWidth = parseInt($("#playground").css("width"));
    var ball = pingpong.ball;

    //Check the playground boundary
    //Check the bottom edge
    if (ball.y + ball.speed * ball.directionY > playgroundHeight)
    {
        ball.directionY = -1;
    }

    //top
    if (ball.y + ball.speed * ball.directionY < 0)
    {
        ball.directionY = 1;
    }

    //left
    if (ball.x + ball.speed * ball.directionX > playgroundWidth)
    {
        //player A wins
        if (pingpong.scoreA >= 3)
        {
            endGame();
        }
        else
        {
            pingpong.scoreA++;
            $("#scoreA").html(pingpong.scoreA);
            //GameSite.saveScore(10);
            GameSite.setItem("game-score", "10");
            GameSite.setItem("pika", "chu");
        }

        ball.x = 250;
        ball.y = 100;
        $("#ball").css(
                {
                    "left": ball.x,
                    "right": ball.y
                }
        );
        ball.directionX = -1;
    }
    ;

    if (ball.x + ball.speed * ball.directionX < 0)
    {
        //player B wins
        if (pingpong.scoreB >= 3)
        {
            endGame();
        }
        else
        {
            pingpong.scoreB++;
            $("#scoreB").html(pingpong.scoreB);
        }

        ball.x = 250;
        ball.y = 100;
        $("#ball").css(
                {
                    "left": ball.x,
                    "right": ball.y
                }
        );
        ball.directionX = 1;
    }

    //Check paddle collisions
    var paddleAX = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
    var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
    var paddleAYTop = parseInt($("#paddleA").css("top"));

    //Check if the ball has moved beyond the bounds of the left paddle
    if (ball.x + ball.speed * ball.directionX < paddleAX)
    {
        if (ball.y + ball.speed * ball.directionY <= paddleAYBottom && ball.y + ball.speed * ball.directionY >= paddleAYTop)
        {
            console.log("Left Collision");
            soundRacketHit.play();
            ball.directionX = 1;
        }
    }

    var ballWidth = parseInt($("#ball").css("width"));
    var paddleWidth = parseInt($("#paddleB").css("width"));
    var paddleBX = parseInt($("#paddleB").css("left")) + parseInt($("#paddleB").css("width"));
    var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
    var paddleBYTop = parseInt($("#paddleB").css("top"));

    //Check if the ball has moved beyond the bounds of the right paddle
    if (ballWidth + paddleWidth + ball.x + ball.speed * ball.directionX > paddleBX && paddleWidth + ball.x + ball.speed * ball.directionX < paddleBX)
    {
        if (ball.y + ball.speed * ball.directionY <= paddleBYBottom && ball.y + ball.speed * ball.directionY >= paddleBYTop)
        {
            console.log("Right Collision");
            soundRacketHit.play();
            ball.directionX = -1;
        }
    }


    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;


    $("#ball").css(
            {
                left: ball.x,
                top: ball.y
            }
    );
}
function endGame()
{
    var winner;
    if (pingpong.scoreA > pingpong.scoreB)
    {
        winner = "A";
    }

    else
    {
        winner = "B";
    }

    pingpong.scoreA = 0;
    pingpong.scoreB = 0;

    $("#scoreA").html(pingpong.scoreA);
    $("#scoreB").html(pingpong.scoreB);
    $("#info").html("Game Over " + winner + " is the winner");

}