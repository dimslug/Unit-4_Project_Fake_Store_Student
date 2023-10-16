
//! Global variables
const apiURL = 'https://fakestoreapi.com/'
const electronics = document.getElementById('electronics');
const jewelery = document.getElementById('jewelery');
const mensClothing = document.getElementById('mensClothing');
const womensClothing = document.getElementById('womensClothing');
const display = document.getElementById('display');
const cartTable = document.getElementById("cartTable");
const cartBody = document.getElementById("cartBody");
const clearCart = document.getElementById("clearCart");
const purchaseBtn = document.getElementById("purchaseBtn");
showCart = document.getElementById("showCart");

const subtotalCost = document.getElementById("subtotalCost");
const taxCost = document.getElementById("taxCost");
const shipCost = document.getElementById("shipCost");
const totalCost = document.getElementById("totalCost");
var subtotal = 0.0;
const salesTax = 0.06;
const shipUpcharge = 0.1;
var grandTotal = 0.0;


let cart = [];


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
    while (element.firstChild) {
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
    cartButton.onclick = () => {
        {
            console.log(obj.id);

            let cartItem = {
                id: obj.id,
                title: obj.title,
                cost: obj.price,
                quantity: 1,
            };
            console.log(cartItem);

            submitToCart(cartItem);
            console.log(cart);
        };
    };

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

function submitToCart(item) {

    const cartItem = cart.find((cartItem) => cartItem.id === item.id);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push(item);
    }
}

const displayCart = function () {
    subtotal = 0;
    grandTotal = 0;
    removeElements(cartBody);
    cart.map((obj) => {

        //create
        let tableRow = document.createElement("tr");
        let tableQty = document.createElement("td");
        let tableTitle = document.createElement("td");
        let tableCost = document.createElement("td");

        //attributes
        tableRow.className = "tableRow";
        tableQty.className = "qty";
        tableQty.textContent = `${obj.quantity}`;
        tableTitle.className = "title";
        tableTitle.textContent = `${obj.title}`;
        tableCost.className = "cost";
        tableCost.textContent = `$${(Math.floor(obj.cost * 100) / 100).toFixed(
            2
        )} ea`;

        //append
        tableRow.appendChild(tableQty);
        tableRow.appendChild(tableTitle);
        tableRow.appendChild(tableCost);

        cartBody.appendChild(tableRow);
        subtotal = subtotal + (obj.cost * obj.quantity * 100) / 100;
    });

    grandTotal = (
        (subtotal * 100) / 100 +
        (subtotal * salesTax * 100) / 100 +
        (subtotal * shipUpcharge * 100) / 100
    ).toFixed(2);
    subtotalCost.textContent = `$${subtotal}`;
    taxCost.textContent = `$${(
        ((Math.floor(subtotal * 100) / 100) * Math.floor(salesTax * 100)) /
        100
    ).toFixed(2)}`;
    shipCost.textContent = `$${(
        ((Math.floor(subtotal * 100) / 100) * Math.floor(shipUpcharge * 100)) /
        100
    ).toFixed(2)}`;
    totalCost.textContent = `$${grandTotal}`;
    purchaseBtn.textContent = `Purchase for $${grandTotal}`;
};

const clearCartFunc = function () {
    cart = [];
    removeElements(cartBody);
    subtotal = 0;
    grandTotal = 0;
    subtotalCost.textContent = "$0.00";
    taxCost.textContent = "$0.00";
    shipCost.textContent = "$0.00";
    totalCost.textContent = "$0.00";
    purchaseBtn.textContent = "Empty Cart";
};




//! Event Listeners
electronics.addEventListener('click', (event) => {
    removeElements(display)
    fakeStore(elEndpoint);
});
showCart.addEventListener("click", (event) => {
    displayCart();
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

purchaseBtn.addEventListener("click", (event) => {
    alert("Thank you for your Purchase!");
    clearCartFunc();
});

clearCart.addEventListener("click", (event) => {
    clearCartFunc();
});

console.log(document.getElementsByClassName('card'));

//! fakeStore function

//! Onload
window.onload = fakeStore("products?sort=asc");
// window.onload = fakeStore(elEndpoint);

//[ "electronics", "jewelery", "men's clothing", "women's clothing" ]
