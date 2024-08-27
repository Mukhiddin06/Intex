let elTitle1 = document.querySelector(".k-title")
let elTitle2 = document.querySelector(".n-title")
let elUser = document.querySelector(".user")
const data = JSON.parse(localStorage.getItem("loginData"))
console.log(data);

elTitle1.addEventListener("click", () => {
    elTitle1.className = "k-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#009398] border-[#009398]"
    elTitle2.className = "n-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#A6A6A6] border-transparent"
})
elTitle2.addEventListener("click", () => {
    elTitle2.className = "n-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#009398] border-[#009398]"
    elTitle1.className = "k-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#A6A6A6] border-transparent"
})


elUser.textContent = data.username