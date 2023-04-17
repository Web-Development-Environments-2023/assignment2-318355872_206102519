//variable for the Image of the spaceships and the laser beam
space_ship_img = new Image()
enemy_space_ship_img =new Image()
space_ship_fire = new Image()
enemy_space_ship_fire = new Image()
let TIME_INTERVAL=25;//screen refresh interval in milliseconds
var canvasWidth; // width of the canvas
var canvasHeight; // height of the canvas

// section for creating matrix of enemy spaces
enemy_spaceship_2d_array = new Array(4);
for (let i = 0; i < enemy_spaceship_2d_array.length; i++) {
    enemy_spaceship_2d_array[i] = new Array(5);
}
  
  
// Loop to initialize 2D array elements.
for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 5; j++) {
        enemy_spaceship_2d_array[i][j] = 1;
    }
}







//random location for the spaceship
location_x_player = Math.floor(Math.random() * 400) + 100;
//first y location for the spaceship
location_y_player = 410;

canvas_size_for_13_inch = {x:725,y:420}
shot_laser = false;
player_area = 1 - 0.4;
//laser parameters for the player spaceship
var player_laser_param = {x:-1,y:-1,w:40,h:40}
var canvas;
var context;
var enemy_state;


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
function startTimer()
{
//    canvas.addEventListener( "click", fireCannonball, false );
   intervalTimer = window.setInterval( updatePositions, TIME_INTERVAL);
} // end function startTimer
function updatePositions()
{
    // update the Enemy's position
   var targetUpdate = TIME_INTERVAL / 1000.0 * target_velocity;
   enemy_state.start += targetUpdate;

   if (enemy_state.start < 0 || enemy_state.start+5*70 > canvas.width){
    target_velocity *= -1;
   }

//    target.end.y += targetUpdate;
    draw();
}

function draw_enemy(img_enemy){
      
    // Loop to display the elements of 2D array. 
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 5; j++)    {
            if(enemy_spaceship_2d_array[i][j]==1){
            contex.drawImage(img_enemy,enemy_state.start+70*j ,0+70*i ,70,70);
            }
        }
    } 

}

//func that do the draw on the game screen
// IMPORTANT for add enemy and other drawing , need to add them to the func
function draw() {
    // draw the spae ship
    contex.clearRect(0,0,canvas.width,canvas.height)
    contex.drawImage(space_ship_img, location_x_player, location_y_player,70,70)
    draw_enemy(enemy_space_ship_img);
    // contex.drawImage(enemy_space_ship_img, canvas.width*5/8, canvas.height/8,70,70);


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
// func for the laser beam of the player
function player_fire() {
    shot_laser = true
    requestAnimationFrame(draw)
}

// func for the start of the game and add event listener for the keyboard
function start_game_after_config() {
    enemy_state= new Object();
    enemy_state.start=0;
    space_ship_fire.src = "Resource/imgs/effects/laser.png"
    enemy_space_ship_fire.src = "Resource/imgs/effects/laser_enemy.png"
    enemy_space_ship_img.src = "Resource/imgs/spaceship/enemy_spaceship.png"
    laser = new Object();
    space_ship_img.src = get_spaceship()
    canvas = document.getElementById("Game");
    var w= canvas.width;
    var h= canvas.height;
    canvasWidth = w; // store the width
    canvasHeight = h; // store the height
    
    initialTargetVelocity = -h / 4; // initial target speed multiplier
    contex = canvas.getContext("2d");
    // reset_elements();
    contex.drawImage(space_ship_img, location_x_player, location_y_player,70,70);
    draw_enemy(enemy_space_ship_img);
    target_velocity=initialTargetVelocity;
    startTimer();
    
    

    document.addEventListener('keydown' ,function () {
        key = event.keyCode;
        switch (key) {
            case 32:
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

}