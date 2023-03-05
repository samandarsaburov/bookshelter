 const userInp = document.querySelector("#loginUser")
 const passwordInp = document.querySelector("#loginPassword")
 const loginForm = document.querySelector("#loginForm")

//  let user = []

 loginForm.addEventListener("submit" , async function(e){
    e.preventDefault()

    // user.push({"email": userInp.value, "password": passwordInp.value})
    await fetch("https://reqres.in/api/login", {
        body: {"email": userInp.value, "password": passwordInp.value},
        headers: {
            "Content-type": "application/json"
        },
        method: "POST",
    }) 
    // console.log(user);
 })
