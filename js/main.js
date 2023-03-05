// dark , light 
const logo = document.querySelector(".header-logo");
const input = document.querySelector("header__form__search")
var icon = document.getElementById("icon");


icon.onclick = function(){
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        icon.src = "./images/home-light.svg";
        logo.src = "./images/login-icon.png";
        input.classList.toggle("border-light")
    }else{
        icon.src = "./images/home-dark.svg";
        logo.src = "./images/home-logo.svg";
    }
}
// dark , light end
