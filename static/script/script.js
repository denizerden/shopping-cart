let cart = {};

function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
}

$(document).ready(() => {
    $("#addToCartBtn").click(function() {
        let product_id = getQueryVariable('id');
        let count = parseInt($('#counter').val());
        addItem(new Item(product_id, count));
    });

    $('#minusButton').click(function() {
        $('#counter').val(parseInt($('#counter').val()) - 1);
    })

    $('#plusButton').click(function() {
        $('#counter').val(parseInt($('#counter').val()) + 1);
    })
});


class Item {
    constructor(id, count) {
        this.id = id;
        this.count = count;
    }
}

function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    $.ajax({
        type: 'POST',
        url: '/saveCart',
        data: JSON.stringify(cart),
        contentType: 'application/json',
        success: result => {
            console.log(result);
        },
        error: result => {
            // TODO
        }
    });
}

function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart')) || {};
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