let cart = {};

function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
        let pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
}

$("#addToCartBtn").click(function() {
    let product_id = getQueryVariable('id');
    let count = parseInt($('#counter').val());
    addItem(new Item(product_id, count));
});


class Item {
    constructor(id, count) {
        this.id = id;
        this.count = count;
    }
}

function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    $.post('/saveCart', JSON.stringify(cart), result => {
        if (result === 'success') {
            console.log('Cart updated');
        } else {
            console.log('An error occured while updating the cart');
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

$('.btn-minuse').on('click', function(){            $(this).parent().siblings('input').val(parseInt($(this).parent().siblings('input').val()) - 1)
})

$('.btn-pluss').on('click', function(){            $(this).parent().siblings('input').val(parseInt($(this).parent().siblings('input').val()) + 1)
})
