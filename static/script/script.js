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
    let product_id = getQueryVariable("id");
    let count = parseInt($("#counter").val());
    addItem(new Item(product_id, count));
    loadCart();
  });

  $("#minusButton").click(function() {
    $("#counter").val(parseInt($("#counter").val()) - 1);
  });

  $("#plusButton").click(function() {
    $("#counter").val(parseInt($("#counter").val()) + 1);
  });
});

class Item {
  constructor(id, count) {
    this.id = id;
    this.count = count;
  }
}

function saveCart() {
  setCookie(JSON.stringify(cart));
}

function loadCart() {
  cart = JSON.parse(getCookie("cart"));
  let url = `http://${window.location.hostname}:5000/product`;
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify(cart),
    contentType: "application/json",
    success: result => {
      let products = JSON.parse(result);
      let total = 0;
      $("#items").html("");
      for (let p of products) {
        $("#items").html(
          $("#items").html() +
            '<li class="clearfix">\n' +
            `<img src=\" ${p.image_file} \" alt=\"item1\" />\n` +
            '                        <span class="item-name">' +
            p.title +
            " </span>\n" +
            '                        <span class="item-price"> $' +
            p.price +
            " </span>\n" +
            '                        <span class="item-quantity">Quantity: ' +
            p.count +
            " </span>\n" +
            "                    </li>"
        );
        total += parseFloat(p.price) * parseInt(p.count);
      }
      $("#total").html(" $ " + total);
    },
    error: result => {}
  });
}

$(document).ready(function() {
  // loadCart();
});

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

function setCookie(item) {
  document.cookie = "cart = " + item;
}
function getCookie(item) {
  let name = item + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

(function() {
  $("#cart").on("click", function() {
    $(".shopping-cart").fadeToggle("fast");
  });
})();
