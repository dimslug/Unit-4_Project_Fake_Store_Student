//! Global variables
const apiURL = 'https://fakestoreapi.com/'
const electronics = document.getElementById('electronics');
const jewelery = document.getElementById('jewelery');
const mensClothing = document.getElementById('mensClothing');
const womensClothing = document.getElementById('womensClothing');
const display = document.getElementById('display');


//! Category Endpoints
//[ "electronics", "jewelery", "men's clothing", "women's clothing" ]
const elEndpoint = "products/category/electronics";
const jEndpoint = "products/category/jewelery";
const mEndpoint = "products/category/men's clothing";
const wEndpoint = "products/category/women's clothing";

//! fakeStore function
const fakeStore = async (endpoint) => {
    await fetch(apiURL + endpoint)
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
        };

//! Event Listeners
electronics.addEventListener('click', (event) => {
    fakeStore(elEndpoint);
});

jewelery.addEventListener('click',(event) => {
    fakeStore(jEndpoint);
});
mensClothing.addEventListener('click', (event) => {
    fakeStore(mEndpoint);
});
womensClothing.addEventListener('click', (event) => {
    fakeStore(wEndpoint);
});


//! Onload
window.onload = fakeStore("products?sort=asc");

//[ "electronics", "jewelery", "men's clothing", "women's clothing" ]