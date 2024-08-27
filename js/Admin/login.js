let elLoginForm = document.querySelector(".login-form");
const isRegistered = JSON.parse(localStorage.getItem("isRegistered"))

elLoginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = {
        username: e.target.username.value,
        password: e.target.password.value
    }
    if(isRegistered){
        if(data.username == isRegistered.newUsername && data.password == isRegistered.newPassword){
            elLoginForm.lastElementChild.innerHTML = `
            <img class="mx-auto scale-[1.3]" src="./Images/loading.png" alt="Loading" width="40"/>
            `
            localStorage.setItem("loginData", JSON.stringify(data))
            setTimeout(() => {
                location.pathname = "../../admin.html";
            }, 1000)
        }
        else{
            alert("Invalid username or password");
        }
    }
    else{
        if(data.username == "komiljon" && data.password == "123"){
            elLoginForm.lastElementChild.innerHTML = `
            <img class="mx-auto scale-[1.3]" src="./Images/loading.png" alt="Loading" width="40"/>
            `
            setTimeout(() => {
                location.pathname = "../../admin.html";
            }, 1000)
        }
        else{
            alert("Invalid username or password");
        }
    }
    
})