let cart = [];
let product;

function getQueryVariable(variable) {
  let query = window.location.search.substring(1);
  let vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=');
    if (pair[0] == variable) {
      return pair[1];
    }
  }
}

$(document).ready(() => {
  loadCart();
  $.ajax({
    type: 'post',
    url: document.URL,
    contentType: 'application/json',
    success: function(result) {
      product = JSON.parse(result);
      console.log(product);
      options();
    },
  });
  $('#addToCartBtn').click(function() {
    let product_id = getQueryVariable('id');
    let count = parseInt($('#counter').val());
    addToCart(product_id, count);
  });

  $('#minusButton').click(function() {
    $('#counter').val(parseInt($('#counter').val()) - 1);
  });

  $('#plusButton').click(function() {
    $('#counter').val(parseInt($('#counter').val()) + 1);
  });

  let selectedValue = $('#select-list option:selected').text();
  $('#price').text();
});

function options() {
  let colorOptions = [{}];
  console.log(product.options);
  for (option_id in product.options) {
    const option = product.options[option_id];
    console.log(option);
    if (option.type === 'color') {
      // colorOptions = ( {
      //   text : "mavi",
      //   value : "rgb(13, 30, 220)"
      // });
      // console.log(colorOptions);

      let select = document.getElementById('select-list');

      select.options[select.options.length] = new Option(
        option.text,
        product.options[option_id].option_id
      );
      console.log($('#select-list option:selected').val());
    }
  }
  // console.log(colorOptions);
}

class Item {
  constructor(id, count) {
    this.id = id;
    this.count = count;
  }
}

function saveCart() {
  setCookie(JSON.stringify(cart));
}

function getProductCount(id) {
  if (cart === undefined || cart.length === 0) {
    return -1;
  }
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    if (product['id'] === id) {
      return i;
    }
  }
  return -1;
}

function addToCart(id, count) {
  let found = false;
  let data = {};
  let index = getProductCount(id);
  if (index !== -1) {
    data[id] = cart[index].count + count;
  } else {
    data[id] = count;
  }
  let url = `http://${window.location.hostname}:5000/cart`;
  $.ajax({
    type: 'POST',
    url,
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: result => {
      let product = JSON.parse(result);
      let index = getProductCount(id);
      if (index !== -1) {
        cart[index] = product;
      } else {
        cart.push(product);
      }
      setCookie(JSON.stringify(cart));
    },
    error: err => {
      // TODO
    },
  });
}

function loadCart() {
  let cookie = getCookie('cart');
  if (cookie === '') {
    cart = [];
  } else {
    cart = JSON.parse(cookie);
  }
}

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
  document.cookie = 'cart = ' + item;
}
function getCookie(item) {
  let name = item + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

(function() {
  $('#cart').on('click', function() {
    $('.shopping-cart').fadeToggle('fast');
  });
})();
