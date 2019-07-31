$(document).ready(function() {
    loadCart();
    for (let product of cart) {
        $('#cart-items').append(/* html */`
            ${product.title}, ${product.count}
        `)
    }
});