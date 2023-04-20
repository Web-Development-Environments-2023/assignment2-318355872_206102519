//variable for the Image of the spaceships and the laser beam
space_ship_img = new Image()
enemy_space_ship_img =new Image()
space_ship_fire = new Image()
enemy_space_ship_fire = new Image()
let TIME_INTERVAL=30;//screen refresh interval in milliseconds
var canvasWidth; // width of the canvas
var canvasHeight; // height of the canvas
let dict_position_enemy;
let enemy_spaceship_2d_array;
var canvas;
var context;
var enemy_state;
let fire_array;
let original_x;
let original_y; 
let reset= false;
// let screen_fire_alert= 315;

// section for creating matrix of enemy spaces
function create_Enemy_Array(){
 enemy_spaceship_2d_array= new Array(4);
for (let i = 0; i < enemy_spaceship_2d_array.length; i++) {
    enemy_spaceship_2d_array[i] = new Array(5);
}
  

// Loop to initialize 2D array elements.
for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 5; j++) {
        enemy_spaceship_2d_array[i][j] = 1;
    }
}
}

//initialize function for enemy fire 2d
function create_array_enemy_fire(){
    fire_array=new Array();
    // for(let i=0;i<fire_array.length;i++){
    //     fire_array[i]=new Array(3);
    // }
}






//random location for the spaceship
location_x_player = Math.floor(Math.random() * 400) + 100;
//first y location for the spaceship
location_y_player = 410;
original_x=location_x_player;
original_y=410;

canvas_size_for_13_inch = {x:725,y:420}
shot_laser = false;
player_area = 1 - 0.4;
//laser parameters for the player spaceship
var player_laser_param = {x:-1,y:-1,w:40,h:40}
let enemy_laser_param= {x:0,y:0,w:40,h:40}


// func for checking if the enemy spaceship already shot
function check_if_enemyspaceship_shot(row,col){
for(let enemy_spaceship in fire_array){
    if(enemy_spaceship[3]==row&&enemy_spaceship[4]==col&&enemy_spaceship[2]){
        return true;
    }
}
return false;
}
//func for checking if the fire from the enemy croos 3/4 fro the screen
function check_if_fire_cross_three_quarters(){
    if(fire_array.length==0){
        return true;
    }
    else{
    for(let i=0;i<fire_array.length;i++){
        if(fire_array[i][2]&&fire_array[i][1]<315){
            return false;
        }
    }
    return true;
}
}
//func that the fire lazer of the enemy to be false
function set_fire_enemy_false(){
    for(let i=0;i<fire_array.length;i++){
        fire_array[i][2]=false;
    }
}
//func that check is apaceship fire is already in the array
function check_if_spaceship_in_the_array(row,col){
    if(fire_array.length==0){
        return false;
    }
    else{
    for(let i=0;i<fire_array.length;i++){
        if(fire_array[i][3]==row&&fire_array[i][4]==col){
            return true;
        }
    }
    return false;
}
    }
    // func that set the fire to be true and the new cordinate
    function set_new_fire_position(row,col,x,y){
        for(let i=0;i<fire_array.length;i++){
            if(fire_array[i][3]==row&&fire_array[i][4]==col){
                fire_array[i][2]=true;
                fire_array[i][0]=x;
                fire_array[i][1]=y;
                return;
            }
        }
    }
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
   interval_enemy_fire= window.setInterval(enemy_fire,TIME_INTERVAL);
} // end function startTimer

function enemy_fire(){
    // let length_dict= Object.keys(dict_position_enemy).length;
    let row = Math.floor(Math.random() *4) ;
    let col = Math.floor(Math.random() *5) ;
    if(enemy_spaceship_2d_array[row][col]==1&&!check_if_enemyspaceship_shot(row,col)&&
    check_if_fire_cross_three_quarters())
    {
        enemy_laser_param.x=enemy_state.start+70*col+15;
        enemy_laser_param.y=70*row +30;
        let x_h=enemy_laser_param.x;
        let y_h=enemy_laser_param.y;
        //check if spaceship is already in the array
        if(check_if_spaceship_in_the_array(row,col)){
            set_new_fire_position(row,col,x_h,y_h);
        }
        else{
            fire_array.push([x_h,y_h,true,row,col]);
        }
        contex.drawImage(enemy_space_ship_fire,x_h,y_h,40,40);
        // alert("hi")
    }
    //update opsition of the fires
    if(fire_array.length!=0){
        for(let i=0;i<fire_array.length; i++){
            if(fire_array[i][2]){
                let temp= fire_array[i][1]+5;
                fire_array[i][1]=temp;
                // if the fire cross the wall remove it from screen
                if(fire_array[i][1]>=500){
                    fire_array[i][2]=false;
                    return;
                }
                //collison between enemy's fire to good spaceship's fire
                else if(fire_array[i][0]>=location_x_player-15 && fire_array[i][0]<location_x_player+70&& fire_array[i][1]>=location_y_player-30 && 
                    fire_array[i][1]<=location_y_player+70){
                        location_x_player=original_x;
                        location_y_player=original_y;
                        // remove all fires laser that had been shot
                        set_fire_enemy_false();
                        return;
                    }
                    else{
                contex.drawImage(enemy_space_ship_fire,fire_array[i][0],temp,40,40);
                    }
            }
        }
    
        }
}

    




function updatePositions()
{
    // update the Enemy's position
//    var targetUpdate = TIME_INTERVAL / 1000.0 * target_velocity;
//    enemy_state.start += targetUpdate;
//     // check the state of the enemy is out side of the canvas
//    if (enemy_state.start < 0 || enemy_state.start+5*70 > canvas.width){
//     target_velocity *= -1;
//    }
//    draw the laser
    if (shot_laser)
    {
        // if this the first shoot
        if (player_laser_param.x < 0){
            player_laser_param.x = location_x_player + 15;
            player_laser_param.y = location_y_player - 30
        }
        // contex.drawImage(space_ship_fire, player_laser_param.x ,player_laser_param.y,40,40);
        player_laser_param.y -= 5;
        
        if (player_laser_param.y < 20){
            shot_laser = false
            player_laser_param.x = -1
        }
        //collison between enemy from the good spaceship's fire
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 5; j++)    {
                
                    if(player_laser_param.x>=enemy_state.start+70*j && player_laser_param.x<enemy_state.start+70*j +70   && player_laser_param.y>70*i+5 && 
                        player_laser_param.y<=70*i +70-5&&enemy_spaceship_2d_array[i][j]==1){
                        shot_laser=false;
                        player_laser_param.x = -1
                        enemy_spaceship_2d_array[i][j]=0;
                    }
            }
        }

    }
    draw();
}

function draw_enemy(img_enemy){
    // Loop to display the elements of 2D array. 
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 5; j++)    {
            if(enemy_spaceship_2d_array[i][j]==1){
                // let enemy_on_canvas= new Object();
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
    if(shot_laser){
    contex.drawImage(space_ship_fire, player_laser_param.x ,player_laser_param.y,40,40);
    }
   
}
// func for the laser beam of the player
function player_fire() {
    shot_laser = true
    requestAnimationFrame(draw)
}

// func for the start of the game and add event listener for the keyboard
function start_game_after_config() {
    create_Enemy_Array();
    create_array_enemy_fire();
    enemy_state= new Object();
    dict_position_enemy= {};
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