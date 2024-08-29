let elProductRenderList = document.querySelector(".render-product-here")
let elTitle1 = document.querySelector(".k-title")
let elTitle2 = document.querySelector(".n-title")
let elUser = document.querySelector(".user")

let elSearchInput = document.querySelector(".search-input")
let elPopapList = document.querySelector(".popap-list")


const data = JSON.parse(localStorage.getItem("loginData"))


let products = JSON.parse(localStorage.getItem("products")) || []


elTitle1.addEventListener("click", () => {
    elTitle1.className = "k-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#009398] border-[#009398]"
    elTitle2.className = "n-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#A6A6A6] border-transparent"
    renderProducts(products, "1")
})
elTitle2.addEventListener("click", () => {
    elTitle2.className = "n-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#009398] border-[#009398]"
    elTitle1.className = "k-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#A6A6A6] border-transparent"
    renderProducts(products, "2")
})


elUser.textContent = data.username




// Modal start

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")

elModalWrapper.addEventListener("click", function(e){
    if(e.target.id == "modal-wrapper") elModalWrapper.classList.add("scale-0")
})




function handleAddProductBtnClick(){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML =`
    <form class="add-product-form">
        <div class="relative">
            <img src="./Images/Close.svg" alt="close" width="30" height="30" class="close-btn absolute top-0 right-0"/>
            <label>
                <input class="choosed-input hidden" type="file"/>
                <img src="./Images/Empty.png" alt="Choose Img" width="80%" class="choosed-img mx-auto"/>
            </label>
            <div class="px-[40px] flex justify-between mt-[33px]">
                 <div class="w-[49%] space-y-4">
                    <label class="flex flex-col relative px-[45px]">
                        <img src="./Images/Kat.svg" alt="Kat" width="28" height="27.5" class="absolute left-0 top-8"/>
                        <span class="text-[15px] text-[#898989]">Категории</span>
                        <select class="p-2 mt-[2px] border-b-[1px] border-b-[#545454] bg-transparent  outline-none focus:shadow" name="productCategory">
                            <option value="1">Каркасные</option>
                            <option value="2">Надувные</option>
                        </select>
                    </label>
                    <label class="flex flex-col relative px-[45px]">
                        <img src="./Images/Sum.svg" alt="Sum" width="28" height="27.5" class="absolute left-0 top-8"/>
                        <span class="text-[15px] text-[#898989]">Стартая цена (сум)</span>
                        <input type="number" class="p-2 rounded-t-md border-b-[1px] border-b-[#545454] mt-[2px] outline-none focus:shadow"  name="productOldPrice" autocomplete="off" required/>
                    </label>
                    <label class="flex flex-col relative px-[45px]">
                        <img src="./Images/Ram.svg" alt="Ram" width="28" height="27" class="absolute left-0 top-8"/>
                        <span class="text-[15px] text-[#898989]">Рамка</span>
                        <select class="p-2 mt-[2px] border-b-[1px] border-b-[#545454] bg-transparent  outline-none focus:shadow" name="productFrame">
                            <option value="1">Металлический</option>
                            <option value="2">Прямоугольная</option>
                            <option value="3">Рамка призмы</option>
                        </select>
                    </label>
                 </div>
                 <div class="w-[49%] space-y-4">
                    <label class="flex flex-col relative px-[45px]">
                        <img src="./Images/Kol.svg" alt="Kol" width="28" height="27.5" class="absolute left-0 top-8"/>
                        <span class="text-[15px] text-[#898989]">Количество</span>
                        <input type="number" class="p-2 rounded-t-md border-b-[1px] border-b-[#545454] mt-[2px] outline-none focus:shadow" name="productAmount" autocomplete="off" required/>
                    </label>
                    <label class="flex flex-col relative px-[45px]">
                        <img src="./Images/Sum.svg" alt="Sum" width="28" height="27.5" class="absolute left-0 top-8"/>
                        <span class="text-[15px] text-[#898989]">Цена со скидкой (сум) </span>
                        <input type="number" class="p-2 rounded-t-md border-b-[1px] border-b-[#545454] mt-[2px] outline-none focus:shadow" name="productNewPrice" autocomplete="off" required/>
                    </label>
                 </div>
            </div>
            <div class="flex justify-center mt-[35px] pb-[10px]">
                <button class="add-btn px-[15px] py-[6px] w-[237.5px] bg-[#009398] rounded-[25px] text-white font-trebuchet">Добавить</button>
            </div>
        </div>
    </form>
    `
    let elCloseBtn = document.querySelector(".close-btn")
    elCloseBtn.addEventListener("click", function(){
        elModalWrapper.classList.add("scale-0")
    })

    let elAddBtn = document.querySelector(".add-btn")

    let elAddProductForm = document.querySelector(".add-product-form")


    let elChoosedInput = document.querySelector(".choosed-input")
    let elChoosedImg = document.querySelector(".choosed-img")

    elChoosedInput.addEventListener("change", function(e){
    elChoosedImg.src = URL.createObjectURL(e.target.files[0])
    elChoosedImg.classList.add("bg-white border-[1px] border-dashed rounded-[21px] border-[#3A3A3A]")
    })

    elAddProductForm.addEventListener("submit", function(e){
        e.preventDefault()
        const data = {
            id:products.length ? products[products.length - 1].id +1 : 1,
            categoryId: e.target.productCategory.value,
            oldPrice: e.target.productOldPrice.value,
            frame: e.target.productFrame.value,
            newPrice: e.target.productNewPrice.value,
            amount: e.target.productAmount.value,
            img: elChoosedImg.src
        }
        products.push(data)
        elAddBtn.innerHTML = `
        <img class="mx-auto scale-[1.2]" src="./Images/loading-2.png" alt="Loading" width="40"/>
        `
        setTimeout(()=>{
            elModalWrapper.classList.add("scale-0")
            if(data.categoryId == "1"){
                elTitle1.className = "k-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#009398] border-[#009398]"
                elTitle2.className = "n-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#A6A6A6] border-transparent"
            }else{
                elTitle2.className = "n-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#009398] border-[#009398]"
                elTitle1.className = "k-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#A6A6A6] border-transparent" 
            }
            renderProducts(products, data.categoryId)
        },1000)
    })
}

// Modal end


// Render Function start

function renderProducts(arr, categoryId){
    elProductRenderList.innerHTML = null
    const productDataFiltered = arr.filter(item => item.categoryId == categoryId)
    productDataFiltered.forEach(item => {
        let elProductRow = document.createElement("tr")
        elProductRow.className = "bg-white"
        elProductRow.innerHTML = `
        <td class="rounded-l-[30px]">
            <img class="m-auto" src=${item.img} alt="Pool" width="97" height="55">
        </td>
        <td>
            <span class="text-[12px] relative before:absolute before:w-[100%] before:h-[1px] before:bg-red-500 before:top-0 before:bottom-0 before:my-auto before:rotate-[5deg]">${item.oldPrice} сум</span>
            <br>
            <span class="font-bold text-[20px]">${item.newPrice} сум</span>
        </td>
        <td class="text-[20px]">${item.amount}</td>
        <td class="text-[20px]">
        ${item.frame == "1" ? "Металлический" : ""}
        ${item.frame == "2" ? "Прямоугольная" : ""}
        ${item.frame == "3" ? "Рамка призмы" : ""}
        </td>
        <td class="rounded-r-[30px] space-x-[18px]">
            <button class="hover:scale-[1.3] duration-300">
            <img src="./Images/Edit.svg" alt="Edit" width="18" height="18">
            </button>
            <button onclick="handleDeleteProduct(${item.id})" class="hover:scale-[1.3] duration-300">
            <img src="./Images/Trash.svg" alt="Edit" width="16" height="16">
            </button>
        </td>
    `
    elProductRenderList.appendChild(elProductRow)
    });
    localStorage.setItem("products", JSON.stringify(products))
}
renderProducts(products, "1")


// Render Function end


// Delete Product start

function handleDeleteProduct(id){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML = `
    <div>
        <h2 class="text-center text-[30px] font-semibold font-trebuchet text-[#009398] mt-5 ">Вы хотите удалить</h2>
        <div class="flex justify-between mt-10 mb-5">
            <button onclick="cancelDeleteModal()" class="add-btn px-[15px] py-[6px] w-[49%] bg-[#009398] rounded-[25px] text-white font-trebuchet">Отмена</button>
            <button onclick="sureDeleteModal(${id})" class="add-btn px-[15px] py-[6px] w-[49%] bg-red-500 rounded-[25px] text-white font-trebuchet">Да</button>
        </div>
    </div>
    `
}


function cancelDeleteModal(){
    elModalWrapper.classList.add("scale-0")
}

function sureDeleteModal(id){
    const findedIndexToDelete = products.findIndex(item => item.id === id)
    const findedObjToDelete = products.find(item => item.id === id)
    products.splice(findedIndexToDelete, 1)
    elModalWrapper.classList.add("scale-0")
    renderProducts([...products], findedObjToDelete.categoryId)
    localStorage.setItem("products", JSON.stringify(products))
}

// Delete Product end

//Search Product start

elSearchInput.addEventListener("input", function(e){
    elPopapList.innerHTML = null
    const filteredList = products.filter(item => item.newPrice.includes(e.target.value))
    if( e.target.value && filteredList.length){
        elPopapList.classList.remove("h-0")
        elPopapList.classList.remove("p-0")
        elPopapList.classList.add("p-2")
        filteredList.forEach((item, index) =>{
            let elPopapItem = document.createElement("li")
            elPopapItem.id = item.id
            elPopapItem.className = "py-2 px-3 flex font-bold cursor-pointer text-white rounded-md hover:bg-white hover:text-[#009398]"
            elPopapItem.innerHTML = `
            <span id=${item.id}>${index + 1}</span>
            <strong id=${item.id}>${item.categoryId == "1" ? "Каркасные" : "Надувные"}</strong>
            <p id=${item.id}>${item.newPrice}</p>
            `
            elPopapList.appendChild(elPopapItem)
            elPopapItem.addEventListener("click", function(){
                const filterdProduct = products.filter(item => item.id == e.target.id)
                renderProducts(filterdProduct, filterdProduct[0].categoryId)
                if(filterdProduct[0].categoryId == "1"){
                    elTitle1.className = "k-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#009398] border-[#009398]"
                    elTitle2.className = "n-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#A6A6A6] border-transparent"
                }else{
                    elTitle2.className = "n-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#009398] border-[#009398]"
                    elTitle1.className = "k-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#A6A6A6] border-transparent" 
                }
            })
        })
    }
    else{
    elPopapList.classList.add("h-0")
    elPopapList.classList.remove("p-2")
    elPopapList.classList.add("p-0")
    renderProducts(products, "1")
    elTitle1.className = "k-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#009398] border-[#009398]"
    elTitle2.className = "n-title font-bold cursor-pointer font-trebuchet text-[35px] pb-[8px] leading-[40px] border-b-[2px] text-[#A6A6A6] border-transparent"
    }
})


elSearchInput.addEventListener("blur", function(){
    setTimeout(()=> {
        elPopapList.classList.add("h-0")
        elPopapList.classList.remove("p-2")
        elPopapList.classList.add("p-0")
    },300)
})

//Search Product end


elUser.addEventListener("click", () =>{
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML = `
    <div>
        <h2 class="text-center text-[30px] font-semibold font-trebuchet text-[#009398] mt-5 ">Ты хочешь выйти?</h2>
        <div class="flex justify-between mt-10 mb-5">
            <button onclick="cancelUser()" class="add-btn px-[15px] py-[6px] w-[49%] bg-[#009398] rounded-[25px] text-white font-trebuchet">Отмена</button>
            <button onclick="sureUser()" class="add-btn px-[15px] py-[6px] w-[49%] bg-red-500 rounded-[25px] text-white font-trebuchet">Да</button>
        </div>
    </div>
    `
})

function cancelUser(){
    elModalWrapper.classList.add("scale-0")
}

function sureUser(){
    window.localStorage.clear()
    window.location.pathname = "/"
}