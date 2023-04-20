<<<<<<< HEAD
// // login function
// function valid_login() {
//     event.preventDefault()

//     User_login = document.getElementById("User_name_login")
//     Password_login = document.getElementById("Password_login")
//     if(!User_DB.hasOwnProperty(User_login.value))
//     {
//         show_error_in_div("The User is not exist");
//         return false;
//     }
//     // get the password from the database
//     password_data = User_DB[User_login.value]['Password']
//     if (password_data !== Password_login.value)
//     {
//         show_error_in_div("The Password is not corrected");
//         return false;
//     }
//     // make the login and move to the game screen
=======
// login function
User_score_list = []
function valid_login() {
    event.preventDefault()
    // if there is user before we need to delete is game history
    User_score_list = []
    User_login = document.getElementById("User_name_login")
    Password_login = document.getElementById("Password_login")
    if(!User_DB.hasOwnProperty(User_login.value))
    {
        show_error_in_div("The User is not exist");
        return false;
    }
    // get the password from the database
    password_data = User_DB[User_login.value]['Password']
    if (password_data !== Password_login.value)
    {
        show_error_in_div("The Password is not corrected");
        return false;
    }
    // make the login and move to the game screen
>>>>>>> main
    show_configuration()
//     form_login = document.getElementById("LoginForm")
//     form_login.reset()

// }
