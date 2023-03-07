// scrol 

window.addEventListener("scroll", function () {
    var scroll = document.querySelector(".scroltop");
    scroll.classList.toggle("active", window.scrollY > 500)
})

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

// scrol end 
// dark , light 
const logo = document.querySelector(".header-logo");
const input = document.querySelector("header__form__search")

var icon = document.getElementById("icon");


icon.onclick = function () {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        icon.src = "./images/home-light.svg";
        logo.src = "./images/login-icon.png";
        input.classList.toggle("border-light")
    } else {
        icon.src = "./images/home-dark.svg";
        logo.src = "./images/home-logo.svg";
    }
}
// dark , light end


// Api star 

// const elTopList = findElement("#products__top");
// const elTopTemplate = findElement("#product-template")

// console.log(products);

// products.slice(0, 20).forEach((products) => {
//     const newProduct = elTopTemplate.content.cloneNode(true);
//     // console.log(products);

//     const elTitle = findElement("#title", newProduct);
//     const elauthor = findElement("#author", newProduct);
//     const elyear = findElement("#year", newProduct);


//     elTitle.textContent = products.title;
//     elauthor.textContent = products.authorsv;
//     elyear.textContent = products.publishedDate;



//     elTopList.appendChild(newProduct);
// })

let listItem = document.querySelector("#products__top")
let bookItem = document.querySelector("#listItem")


async function getData() {
    let data = await fetch("https://www.googleapis.com/books/v1/volumes?q=python&startIndex=0&maxResults=10")
    let resData = await data.json()
    renderData(resData)

    return resData
}


function renderData(data) {
    listItem.innerHTML = ""

    data.items.forEach((item) => {
        // console.log(item);
        listItem.innerHTML += `
        <li class="about__product__item__list flex-column">
        <div class="about__product__item__list__img">
            <img src="${item.volumeInfo.imageLinks.smallThumbnail}" height="290" alt="">
        </div>
        <div class="about__product__item__list__theme">
            <h3 class="about__product__item__list__theme__name" id="title">${item.volumeInfo.title}</h3>
            <p class="about__product__item__list__theme__author" id="author">${item.volumeInfo.authors}</p>
            <p class="about__product__item__list__theme__year" id="year">${item.volumeInfo.publishedDate}</p>
        </div>
        <div class="about__product__item__list__bottom">
            <button onclick="saveBook(${item.volumeInfo.pageCount})" class="about__product__item__list__bottom__storage">Bookmark</button>
            <button class="about__product__item__list__bottom__modal" href="#">More Info</button>
        </div>
        <a class="about__product__item__list__btn" href="#">Read</a>
    </li>
        `
    });


}
let arr = []
let itemId = []
function saveBook(id) {
    if(itemId.includes(id)){
        return
    }
    else{
        itemId.push(id)
        getData().then(item => {
            let dataItem = item.items.find(el => el.volumeInfo.pageCount === id)
            arr.push(dataItem)
            renderItem(arr)
        })
    }

}

function renderItem(data) {
    bookItem.innerHTML = null
    data?.forEach(item => {
        bookItem.innerHTML += `
        <li class="about__left__item__list">
        <div class="about__left__item__list_about">
            <h4 class="about__left__item__list_about_theme">${item.volumeInfo.title}</h4>
            <p class="about__left__item__list_about_text">${item.volumeInfo.authors}</p>
        </div>
        <div class="about__left__item__list__right">
            <img class="about__left__item__list__right__img1" src="./images/about-link.svg" alt="">
            <img onclick="deleteItem(${item.volumeInfo.pageCount})" class="about__left__item__list__right__img2" src="./images/about-delete.svg"
                alt="">
        </div>
    </li>
        `
    })
}

function deleteItem(id){
    arr = arr.filter(item => item.volumeInfo.pageCount !== id)
    itemId = itemId.filter(el => el !== id)
    renderItem(arr)
}
getData()