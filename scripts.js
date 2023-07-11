
//! Global variables
const apiURL = 'https://fakestoreapi.com/'
const electronics = document.getElementById('electronics');
const jewelery = document.getElementById('jewelery');
const mensClothing = document.getElementById('mensClothing');
const womensClothing = document.getElementById('womensClothing');
const display = document.getElementById('display');


//! Category Endpoints
//[ "electronics", "jewelery", "men's clothing", "women's clothing" ] - Categories array for reference
const elEndpoint = "products/category/electronics?sort=asc?limit=8";
const jEndpoint = "products/category/jewelery?sort=asc?limit=8";
const mEndpoint = "products/category/men's clothing?sort=asc?limit=8";
const wEndpoint = "products/category/women's clothing?sort=asc?limit=8";
/* const elEndpoint = "electronics";
const jEndpoint = "jewelery";
const mEndpoint = "men's clothing";
const wEndpoint = "women's clothing";
 */

const removeElements = element => {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

const fakeStore = async (endpoint) => {
    await fetch(apiURL + endpoint)
        .then((res) => res.json())
        .then((data) => { 
            console.log(data)
                let product = data[0]
                console.log(data);
                console.log(product.id);
            let obj = {
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                image: product.image,
            } 
            console.log(obj)
            data.forEach(obj => displayCards(obj));
        })
        .catch((err) => console.error(err))
};


const displayCards = function (obj) {

    /*  json of returned object for reference
    {
    "id": 9,
    "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    "price": 64,
    "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    "rating": {
        "rate": 3.3,
    "count": 203
    }
}
    */


    //* Create
    //let rowCols = document.createElement('div');
    let col = document.createElement('div');
    let card = document.createElement('div');
    let img = document.createElement('img');
    let cardBody = document.createElement('div');
    let cardTitle = document.createElement('h5');

    let accordion = document.createElement('div');
    let accItem = document.createElement('div');
    let accHeader = document.createElement('h2');
    let accBtn = document.createElement('button');
    let collapseOne = document.createElement('div');
    let prodDesc = document.createElement('div');

    let accordionTwo = document.createElement('div');
    let accItemTwo = document.createElement('div');
    let accHeaderTwo = document.createElement('div');
    let accBtnTwo = document.createElement('button');
    let collapseTwo = document.createElement('div')
    let prodPrice = document.createElement('div');

    let cartButton = document.createElement('a')

    //* Attributes
        //* BS grid col
    col.className = 'cols';
        //* card
    card.className = 'card h-100';
    card.style = ` width: 18rem`;
    card.dataset.bsTheme = 'dark';
        //* img
    img.src = obj.image
    img.className = 'card-img-top img-thumbnail';
    img.alt = `An image of ${obj.title}`;
        //* card body and title
    cardBody.className = 'card-body';
    cardTitle.className = 'card-title';
    cardTitle.textContent = obj.title;
        //*  accordion for description
    accordion.className = 'accordion';
    accordion.id = `accordion${obj.id}`
        //* accordion item
    accItem.className = 'accordion-item';
        //* accordion header
    accHeader.className = 'accordion-header';
        //* accordion collapse button
    accBtn.className = 'accordion-button collapsed'
    accBtn.type = 'button';
    accBtn.textContent = 'Description';
    accBtn.dataset.bsToggle = 'collapse';
    accBtn.dataset.bsTarget = `#collapse${obj.id}One`;
    accBtn.ariaExpanded = 'false';
    accBtn.ariaControls = `collapse${obj.id}One`;
        //* BS collapse thing?
    collapseOne.id = `collapse${obj.id}One`;
    collapseOne.className = 'accordion-collapse collapse';
    collapseOne.dataset.bsParent = `accordion${obj.id}`;
        //* text to display product description
    prodDesc.className = 'accordion-body';
    prodDesc.textContent = obj.description;
        //* second accordion for price
    accordionTwo.className = 'accordion';
    accordionTwo.id = `accordion${obj.id}`;
        //* second accordion item
    accItemTwo.className = 'accordion-item';
        //* second accordion header
    accHeaderTwo.className = 'accordion-header';
        //* second accordion collapse button
    accBtnTwo.className = 'accordion-button collapsed'
    accBtnTwo.type = 'button';
    accBtnTwo.textContent = 'Price';
    accBtnTwo.dataset.bsToggle = 'collapse';
    accBtnTwo.dataset.bsTarget = `#collapse${obj.id}Two`;
    accBtnTwo.ariaExpanded = 'false';
    accBtnTwo.ariaControls = 'collapseTwo';
        //* second BS collapse thing
    collapseTwo.id = `collapse${obj.id}Two`;
    collapseTwo.className = 'accordion-collapse collapse';
    collapseTwo.dataset.bsParent = `#collapse${obj.id}Two`;
        //* accordion body to display product price
    prodPrice.className = 'accordion-body';
    prodPrice.textContent = `$${obj.price}`;
        //* add to cart button
    cartButton.href = '#';
    cartButton.className = 'btn btn-primary add-cart';
    cartButton.textContent = 'Add to Cart';
    // cartButton.onclick = () => {};

    //* Attach

    display.appendChild(col);
        col.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBody);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(accordion);
                accordion.appendChild(accItem);
                accItem.appendChild(accHeader);
                    accHeader.appendChild(accBtn);
                accItem.appendChild(collapseOne);
                    collapseOne.appendChild(prodDesc);
            cardBody.appendChild(accordionTwo);
                accordionTwo.appendChild(accItemTwo);
                    accItemTwo.appendChild(accHeaderTwo);
                        accHeaderTwo.appendChild(accBtnTwo);
                    accItemTwo.appendChild(collapseTwo);
                    collapseTwo.appendChild(prodPrice);
                    accordionTwo.appendChild(cartButton);




}


//! Event Listeners
electronics.addEventListener('click', (event) => {
    removeElements(display)
    fakeStore(elEndpoint);
});

jewelery.addEventListener('click', (event) => {
    removeElements(display)
    fakeStore(jEndpoint);
});
mensClothing.addEventListener('click', (event) => {
    removeElements(display)
    fakeStore(mEndpoint);
});
womensClothing.addEventListener('click', (event) => {
    removeElements(display)
    fakeStore(wEndpoint);
});

console.log(document.getElementsByClassName('card'));

//! fakeStore function

//! Onload
window.onload = fakeStore("products?sort=asc");
// window.onload = fakeStore(elEndpoint);

//[ "electronics", "jewelery", "men's clothing", "women's clothing" ]
