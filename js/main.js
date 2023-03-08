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

let searchInp = document.querySelector("#searchInp")
searchInp.addEventListener("input", function(){
    getData().then(item => {
        let dataItem = item.items.filter(el => el.volumeInfo.title.toLowerCase().includes(searchInp.value.trim().toLowerCase()))
        // console.log(dataItem);
        renderData(dataItem)
        return
    })
})


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



let listItem = document.querySelector("#products__top")
let bookItem = document.querySelector("#listItem")
let modalBookItem = document.querySelector("#modalBookItem")



async function getData() {
    let data = await fetch("https://www.googleapis.com/books/v1/volumes?q=python&startIndex=0&maxResults=10")
    let resData = await data.json()
    renderData(resData.items)

    return resData
}

getData()

function renderData(data) {
    listItem.innerHTML = ""
    console.log(data);
    data?.forEach((item) => {
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
            <button onclick="modalBook(${item.volumeInfo.pageCount})" class="about__product__item__list__bottom__modal" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" >More Info</button>
        </div>
        <a class="about__product__item__list__btn" href="https://hackr.io/blog/best-python-books-for-beginners-and-advanced-programmers">Read</a>
    </li>
        `
    });


}

let arr = []
let itemId = []
console.log(arr);
function modalBook(id) {
    getData().then(item => {
        let dataItem = item.items.find(el => el.volumeInfo.pageCount === id)
        modalBookItem.innerHTML = null
        modalBookItem.innerHTML += ` <div class="modal__theme">
            <h1 class="modal__teme__text">${dataItem.volumeInfo.title}</h1>
        </div>
        <div class="modal__img"><img class="modal__img__src" src="${dataItem.volumeInfo.imageLinks.smallThumbnail}" alt=""></div>
        <p class="modal__text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit nulla quae
            hic illo qui quaerat animi, ab iusto ducimus id aut obcaecati accusantium, dolor voluptatem
            adipisci ut magnam vel. Placeat molestiae exercitationem dolor libero nesciunt! Saepe rem porro
            veritatis beatae. Sunt, deserunt exercitationem voluptatibus praesentium aspernatur excepturi
            quae aperiam? Repellendus.</p>
        
        <ul class="modal__list flex-column">
            <li class="modal__list__item">
                <p class="modal__list__item__Autor">Author : </p>
                <p class="modal__list__item__name">${dataItem.volumeInfo.authors}</p>
            </li>
            <li class="modal__list__item">
                <p class="modal__list__item__Autor">Published : </p>
                <p class="modal__list__item__name">${dataItem.volumeInfo.publishedDate}</p>
            </li>
        
            <li class="modal__list__item">
                <p class="modal__list__item__Autor">Publishers :</p>
                <p class="modal__list__item__name">Hollman</p>
            </li>
        
        
            <li class="modal__list__item">
                <p class="modal__list__item__Autor">Categories:</p>
                <p class="modal__list__item__name">Computers</p>
            </li>
        
            <li class="modal__list__item">
                <p class="modal__list__item__Autor">Pages Count:</p>
                <p class="modal__list__item__name">346</p>
            </li>
        </ul>`
    })
}

function saveBook(id) {
    if (itemId.includes(id)) {
        return
    }
    else {
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
            <h4 class="about__left__item__list_about_theme"><b>${item.volumeInfo.title}</b></h4>
            <p class="about__left__item__list_about_text">${item.volumeInfo.authors}</p>
        </div>
        <div class="about__left__item__list__right">
        <a class="about__left__item__list__right__link" href="https://realpython.com/best-python-books/"><img class="about__left__item__list__right__link__img1" src="./images/about-link.svg" alt=""></a>
            <img onclick="deleteItem(${item.volumeInfo.pageCount})" class="about__left__item__list__right__img2" src="./images/about-delete.svg"
                alt="">
        </div>
    </li>
        `
    })
}

function deleteItem(id) {
    arr = arr.filter(item => item.volumeInfo.pageCount !== id)
    itemId = itemId.filter(el => el !== id)
    renderItem(arr)
}

