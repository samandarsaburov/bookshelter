const userInp = document.querySelector("#loginUser")
const passwordInp = document.querySelector("#loginPassword")
const loginForm = document.querySelector("#loginForm")
const formBtn = document.querySelector("#formBtn")

//  let user = []

formBtn.addEventListener("click", async function () {
    // e.preventDefault()

    // user.push({"email": userInp.value, "password": passwordInp.value})
    let postLogin = await fetch("https://reqres.in/api/login  ",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ "email": userInp.value, "password": passwordInp.value })
        })
    if (postLogin.status === 200) {
        formBtn.setAttribute("href", "./home.html")
    }
    console.log(postLogin.status);

    // .catch(error => formBtn.setAttribute("href", "./index.html"))
    // console.log("success");
    // formBtn.setAttribute("disabled")
    // console.log("error");
})
