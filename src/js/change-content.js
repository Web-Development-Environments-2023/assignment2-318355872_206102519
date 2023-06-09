let section = document.getElementById('active_section');
let Menu = document.getElementById('Menu');
let AllPages = section.querySelectorAll('div');
let RegisterPage = document.getElementById("RegisterPage");
let WelcomePage = document.getElementById("WelcomePage");
let ConfigurationPage = document.getElementById("Configuration");
let LoginPage = document.getElementById("LoginPage");
let GamePage = document.getElementById("GameScreen");
let About_dialog = document.getElementById('AboutDialog')
let EndDiv = document.getElementById("EndGame");
let GameSoundTrack = document.getElementById("Game_sound");

function Show_WelcomePage_From_AnyWhere() {
    close_open_divs()
    WelcomePage.classList.add('reveal');
    WelcomePage.style.display = 'block';
}
function Show_RegisterPage_From_AnyWhere() {
    close_open_divs()
    RegisterPage.classList.add('reveal');
    RegisterPage.style.display = 'block';
}
function Show_LoginPage_From_AnyWhere() {
    close_open_divs()
    LoginPage.classList.add('reveal');
    LoginPage.style.display = 'block';

}
function show_configuration_From_AnyWhere() {
    close_open_divs()
    if(typeof intervalTimer !== 'undefined'){
        if (intervalTimer){clearInterval(intervalTimer);}
    }
    if(typeof interval_count !== 'undefined'){
        if (interval_count){clearInterval(interval_count);}

    }
    ConfigurationPage.classList.add('reveal');
    ConfigurationPage.style.display = 'block';
    document.getElementById("time").selectedIndex = 0;

}

function Show_dialog() {
    section.classList.add('freeze')
    Menu.classList.add('freeze')
    About_dialog.classList.add('reveal');
    About_dialog.style.display = 'block';
    document.addEventListener('keydown', close_dialog_by_click_esc);
    event.stopPropagation();
    document.addEventListener('click', Close_dialog_by_click_outside);
}
function Close_dialog_by_click_outside() {
    if(!About_dialog.contains(event.target)){close_dialog()}

}
function close_dialog_by_click_esc() {
    if(event.keyCode === 27){close_dialog()}
}

function close_dialog() {
    section.classList.remove('freeze')
    Menu.classList.remove('freeze')
    About_dialog.classList.add('hidden');
    About_dialog.style.display = 'none'
    document.removeEventListener('keydown', close_dialog_by_click_esc);
    // document.removeEventListener('click', Close_dialog_by_click_outside);
}

// func that show the Configuration page from the Welcome page

// func that reveal the game screen from the configuration screen
function show_game_screen() {
    ConfigurationPage.classList.add('hidden');
    ConfigurationPage.style.display = 'none';
    GamePage.classList.add('reveal');
    GamePage.style.display = 'block';
    GameSoundTrack.currentTime =0;
    GameSoundTrack.play()
    start_game_after_config()
}

function show_end_game_screen() {
    EndDiv.classList.add('reveal');
    EndDiv.style.display = 'block';
}

function hide_end_game_screen() {
    EndDiv.classList.add('hidden');
    EndDiv.style.display = 'none';
}

// func that create error message on the page with Back button
// get String of the error message like "Not correct Password"
function show_error_in_div(error_message) {
    let div_error = document.createElement('div');
    div_error.classList.add('Error');
    let message = document.createTextNode(error_message);
    div_error.appendChild(message);
    let error_button = document.createElement('button');
    let error_button_text = document.createTextNode('Back');
    error_button.classList.add('Error_button');
    error_button.appendChild(error_button_text);
    error_button.addEventListener('click', function () {
        section.classList.remove('freeze')
        Menu.classList.remove('freeze')
        div_error.classList.add('hidden');
        div_error.remove();
    });
    div_error.appendChild(error_button);
    document.body.appendChild(div_error)
    section.classList.add('freeze')
    Menu.classList.add('freeze')
}
// pop up div for get key code of the fire key
function Show_select_fire_key(){
    let div_chose_key = document.createElement('div_key');
    div_chose_key.classList.add('chose_key');
    let message = document.createTextNode("Click On Fire Key");
    div_chose_key.appendChild(message);
    document.body.appendChild(div_chose_key)
    div_chose_key.id = 'key_div'
    let div_catch = document.getElementById('key_div')
    document.addEventListener('keydown', key_down_for_fire);
    ConfigurationPage.classList.add('freeze')

    function key_down_for_fire() {
        if ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode === 32)
        {
            div_catch.classList.add('hidden');
            div_catch.remove();
            FireKey = event.keyCode;
            document.removeEventListener('keydown', key_down_for_fire);
            ConfigurationPage.classList.remove('freeze');
            // if the player chose space it will activate the button again the prevention will prevent to do it
            event.preventDefault();
        }
        else {
            show_error_in_div("You Can't Use this key")
        }

    }
}
function close_open_divs() {
    GameSoundTrack.pause()
    document.getElementById('LoginForm').reset()
    document.getElementById('RegisterForm').reset()
    for (let i=0 ; i <AllPages.length ; i++){
        if(AllPages[i].style.display !== 'none')
        {
            AllPages[i].classList.add('hidden');
            AllPages[i].style.display = 'none'
        }
    }
}

