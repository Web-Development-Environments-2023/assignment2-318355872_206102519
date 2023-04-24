// get the select ship
let space_ship = document.querySelectorAll('.Spaceship_select');
let active_spaceship = null;
let FireKey = 32;

// event listener to the select of one ship
space_ship.forEach((ship) =>{
    ship.addEventListener('click', function () {
        if (active_spaceship){
            active_spaceship.classList.remove('SpaceShip_chosen');
        }
        ship.classList.add('SpaceShip_chosen');
        active_spaceship = ship;
    });
});

function selected_key() {
    Show_select_fire_key();

}
// func to get the right img of the spaceship that selected
function get_spaceship() {
    if (active_spaceship === null){
        return null
    }
    if (active_spaceship.id === "Spaceship_1"){
        return "Resource/imgs/spaceship/spaceship_1.png"
    }
    if (active_spaceship.id === "Spaceship_2"){
        return "Resource/imgs/spaceship/spaceship_2.png"
    }
    if (active_spaceship.id === "Spaceship_3"){
        return "Resource/imgs/spaceship/spaceship_3.png"
    }
    if (active_spaceship.id === "Spaceship_4"){
        return "Resource/imgs/spaceship/spaceship_4.png"
    }

}

function startgame() {
    if (FireKey === undefined)
    {
        show_error_in_div("Need to chose FireKey");
        return;
    }
    if (get_spaceship() === null){
        show_error_in_div("Need to chose SpaceShip");
        return;
    }
    active_spaceship.classList.remove('SpaceShip_chosen');
    show_game_screen()
}