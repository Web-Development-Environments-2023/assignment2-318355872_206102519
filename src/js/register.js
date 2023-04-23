//dict for save all users
User_DB = {};
User_DB['p'] = {
    "User_name": 'p',
    "Password": 'testuser',
    "First_name": 'tester',
    "Last_name": 'tester',
    "Email": 'tester@tester.com',
    "Birthday": null,
};
// validation of the inputs
function valid_parameters(){
    event.preventDefault()
    User_name = document.getElementById("User_name");
    Password = document.getElementById("Password");
    Re_Password = document.getElementById("Re-Password");
    First_name = document.getElementById("First_name");
    Last_name = document.getElementById("Last_name");
    Email = document.getElementById("Email");
    Birthday = document.getElementById("Birthday");
    RegisterSubmit = document.getElementById("Submit_Register");
    if(Password.value.length < 8){
        show_error_in_div("The Password need to be a least with 8 chars");
        return false;
    }
    if(Password.value !== Re_Password.value){
        show_error_in_div("The Passwords is not the same");
        return false;
    }

    if(!isNaN(Password.value)){
        show_error_in_div("The Password must include Char");
        return false;
    }
    if(!(/^[a-zA-Z]+$/.test(First_name.value)))
    {
        show_error_in_div("The First name can't contain numbers");
        return false;
    }
    if(!(/^[a-zA-Z]+$/.test(Last_name.value)))
    {
        show_error_in_div("The Last name can't contain numbers");
        return false;
    }
    // check if we have already user with the same user name
    if(User_DB.hasOwnProperty(User_name.value))
    {
        show_error_in_div("The User name is already exist");
        return false;
    }
    dict_user = {
        "User_name": User_name.value,
        "Password": Password.value,
        "First_name": First_name.value,
        "Last_name": Last_name.value,
        "Email": Email.value,
        "Birthday": Birthday.value,
    };
    // add the need user to the DB
    User_DB[User_name.value] = dict_user;
    show_error_in_div("The User has created")
    Show_LoginPage_From_AnyWhere()
    form_register = document.getElementById("RegisterForm")
    form_register.reset()
}



