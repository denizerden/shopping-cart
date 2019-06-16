let json;
function addToDatabase(addItem) {
    // const product = {
    //     title: "POST Product",
    //     description: "This product was created to test POST requests.",
    //     price: 123
    // }

    const url = document.URL;
    const tokens = url.split('/');
    const product_id = tokens[tokens.length - 1];

    const product_query = {
        id: product_id
    }

    $.post(url, product_query, function(result) {
        console.log(result);

    });
}


let shoppingCart = (function () {

    const url = document.URL;
    const tokens = url.split('/');
    const product_id = tokens[tokens.length - 1];

    const product_query = {
        id: product_id
    }

    $.post(url, product_query, function(result) {

        json = JSON.parse(result);
        console.log(json.title);

    });

    let cart = [];

    //constructor
    function Item(name,price,count) {
        this.name = json.title;
        this.price = json.price;
        this.count = count ;
    }

    function saveCart(){
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    function loadCart(){
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));

    }

    if (sessionStorage.getItem("shoppingCart")!= null){
        loadCart()
    }

    let obj = {};

    obj.addItemToCart = function (name,price,count) {
        for (let item in cart){
            if (cart[item].name === name) {
                cart[item].count ++;
                saveCart();
                return;
            }
        }
        let item = new Item(name,price,count);
        cart.push(item);
        saveCart();
    }

    //set count
    obj.setCountForItem = function (name,count) {
        for (let i in cart){
            if(cart[i].name === name){
                cart[i].count = count;
                break;
            }
        }
    };

    obj.removeItemFromCart = function (name) {
        for (let item in cart){
            if (cart[item].name === name){
                cart[item].count --;
                if (cart[item] === 0){
                    cart.splice(item,1)
                }
                break;
            }
        }
        saveCart();
    }

    obj.totalCount = function () {
        let totalCount = 0;
        for (let item in cart){
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    obj.totalCart = function () {
        let totalCart =0;
        for (let item in cart){
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }




return obj;
})();

$('.add-to-cart').click(function(event) {
    event.preventDefault();
    let name = $(this).data('name');
    let price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name);
    displayCart();
});
function displayCart(){



    console.log(json);
    let output = "";

        output += "<tr>"
            + "<td>" + cartArray[i].name + "</td>"
            + "<td>(" + cartArray[i].price + ")</td>"
            + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + json.title + ">-</button>"
            + "<input type='number' class='item-count form-control' data-name='" + json.title + "' value='" + cartArray[i].count + "'>"
            + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + json.title + ">+</button></div></td>"
            + "<td><button class='delete-item btn btn-danger' data-name=" + json.title + ">X</button></td>"
            + " = "
            + "<td>" + json.price + "</td>"
            +  "</tr>";

    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

$('.show-cart').on("click",".minus-item",function (event) {
    let name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
})

$('.show-cart').on("click",".plus-item",function (event) {
    let name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

displayCart();

