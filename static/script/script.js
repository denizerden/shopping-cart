let cart = {};

$("#addToCartBtn").click(function() {
    const url = document.URL;
    const tokens = url.split('/');
    const product_id = tokens[tokens.length - 1];

    addItem(new Item(product_id, 1));
});


class Item {
    constructor(id, count) {
        this.id = id;
        this.count = count;
    }
}

function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart')) || {};
    console.log(cart);
}

$(document).ready(function() {
    loadCart();
})

function addItem(item) {
    if (cart[item.id]) {
        cart[item.id] += item.count;
    } else {
        cart[item.id] = item.count;
    }
    saveCart();
    console.log(cart);
}

function setCount(item, count) {
    if (cart[item.id]) {
        cart[item.id] = count;
    }
    saveCart();
}

function removeItem(item) {
    if (cart[item.id] >= 1) {
        cart[item.id]--;
    } else if (cart[item.id] == 1) {
        delete cart[item.id];
    }
    saveCart();
}