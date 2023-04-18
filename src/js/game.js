//variable for the Image of the spaceships and the laser beam
space_ship_img = new Image()
enemy_space_ship_img =new Image()
space_ship_fire = new Image()
enemy_space_ship_fire = new Image()

//random location for the spaceship
location_x_player = Math.floor(Math.random() * 400) + 100;
//first y location for the spaceship
location_y_player = 410;

original_x_location = location_x_player
original_y_location = location_y_player

canvas_size_for_13_inch = {x:725,y:420}
shot_laser = false;
player_area = 1 - 0.4;
//laser parameters for the player spaceship
var player_laser_param = {x:-1,y:-1,w:40,h:40}
var canvas;
var context;

// 2 var for the countdown
var countDownDate;
var interval_count;
var GameOver = false;
var first_game = true;


// player score and life
player_score = 0
player_life = 0
//func for moving the space ship
function move_space_left() {
    // TODO need to add check that the player is not leving the map
    if (location_x_player - 20 > 0)
    {
        location_x_player -= 20
        requestAnimationFrame(draw)
    }
}
//func for moving the space ship

function move_space_up() {
    // TODO need to add check that the player is not leving the map
    if (location_y_player - 20 > canvas_size_for_13_inch.y*player_area){
        location_y_player -= 20
        requestAnimationFrame(draw)
    }
}
//func for moving the space ship

function move_space_right() {
    // TODO need to add check that the player is not leving the map
    if (location_x_player + 20 < canvas_size_for_13_inch.x)
    {
        location_x_player += 20
        requestAnimationFrame(draw)
    }
}
//func for moving the space ship

function move_space_down() {
    // TODO need to add check that the player is not leving the map
    if (location_y_player + 20 < canvas_size_for_13_inch.y)
    {
        location_y_player += 20
        requestAnimationFrame(draw)
    }
}
//func that do the draw on the game screen
// IMPORTANT for add enemy and other drawing , need to add them to the func
function draw() {
    if (!GameOver){
        // draw the spae ship
        contex.clearRect(0,0,canvas.width,canvas.height)
        contex.drawImage(space_ship_img, location_x_player, location_y_player,70,70)

        // requestAnimationFrame(move)
        // draw the laser
        if (shot_laser)
        {
            // if this the first shoot
            if (player_laser_param.x < 0){
                player_laser_param.x = location_x_player + 15;
                player_laser_param.y = location_y_player - 30
            }
            contex.drawImage(space_ship_fire, player_laser_param.x ,player_laser_param.y,40,40);
            player_laser_param.y -= 5;
            if (player_laser_param.y < 20){
                shot_laser = false
                player_laser_param.x = -1
            }
            requestAnimationFrame(draw)
        }
    }

}
// func for the laser beam of the player
function player_fire() {
    shot_laser = true
    requestAnimationFrame(draw)
}

function create_count_down() {
    timer_limit = document.getElementById("time").value
    countDownDate = new Date().getTime() + parseInt(timer_limit) * 1000;
    interval_count = setInterval(update_timer, 1000);
}
function update_timer() {
  correct = new Date().getTime();
  dis = countDownDate - correct;
  min = Math.floor((dis % (1000 * 60 * 60)) / (1000 * 60));
  sec = Math.floor((dis % (1000 * 60)) / 1000);
  timer_div = document.getElementById("GameTimer");
  if (timer_div.style.display === 'none') {
      timer_div.classList.add('reveal');
      timer_div.style.display = 'block';
  }
  if (dis > 0){
      timer_div.innerHTML = "Timer:   " + min + ":" + (sec < 10 ? "0" : "") + sec + "<br>Score: " + player_score + "<br>Life: " + player_life;
  }
  if (dis < 0){
      clearInterval(interval_count);
      GameOver = true;
  }
  if(GameOver)
  {
      end_game();
      return;
  }
}

function end_game() {
    show_end_game_screen();
    string_to_show = ""
    surfix = "<br>Your Score: " + player_score + "<h1>Top Scores:";
    if(player_life === 0)
    {
        string_to_show = "You Lost"
    }
    else {
        // the game end because the time over
        // TODO : need to understand that that not impact chamipons
        if (GameOver){
            if(player_score < 100){
                string_to_show = "You can do better"
            }
            else {
                string_to_show = "Winner!"
            }
        }
        else
        {
            string_to_show = "Champion!"
        }
    }
    string_to_show += surfix;
    User_score_list.sort(function(a, b) {
        return b - a;
    });
    already_shown = false;
    for(i=0; i < User_score_list.length ; i++){
        string_to_show += "<br>" + (i+1) + ".&nbsp;&nbsp;" + User_score_list[i] + " points"
        if(player_score === User_score_list[i] && !already_shown)
        {
            string_to_show += "&nbsp;&nbsp; - Your location";
            already_shown = true;
        }
    }
    string_to_show += "</h1>"
    EndDiv.innerHTML = string_to_show
}


// func for the start of the game and add event listener for the keyboard
function start_game_after_config() {
    // not able to use space for the New game button
    if (first_game)
    {
        document.getElementById("NewGameButton").addEventListener("keydown",function (
            ) {
                event.preventDefault()
            }
        )
    }
    // check if the end screen is showen
    if(EndDiv.style.display === 'block')
    {
        EndDiv.innerHTML = ""
        hide_end_game_screen();
        clearInterval(interval_count);

    }
    // added for the reset button
    location_x_player = original_x_location;
    location_y_player = original_y_location;
    GameOver = false
    space_ship_fire.src = "Resource/imgs/effects/laser.png"
    enemy_space_ship_fire.src = "Resource/imgs/effects/laser_enemy.png"
    enemy_space_ship_img.src = "Resource/imgs/spaceship/enemy_spaceship.png"
    player_life = 3;
    player_score = 40;
    laser = new Object();
    space_ship_img.src = get_spaceship()
    canvas = document.getElementById("Game");
    contex = canvas.getContext("2d");
    draw()
    create_count_down()
    if (first_game)
    {
        document.addEventListener('keydown' ,function () {
            key = event.keyCode;
            switch (key) {
                case FireKey:
                    player_fire()
                    break;
                case 37: // Left arrow
                    move_space_left();
                    // Move player left
                    break;
                case 38: // Up arrow
                    move_space_up();
                    break;
                case 39: // Right arrow
                    move_space_right();
                    break;
                case 40: // Down arrow
                    move_space_down();
                    break;
                default:
                    break;
            }

        })
        first_game = false
    }


}