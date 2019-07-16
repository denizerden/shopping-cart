let colorArray = [];
let optionCount = 0;
let priceCount = 0;
let productCount = 0;
let colorObject = {};

function calc(id) {
  let lastTwo = $(`#price-form-${id}`).data('lastTwo');
  let types = lastTwo.map(el => {
    return el.id
      .split('-')
      .splice(0, 2)
      .join('-');
  });
  console.log(types);
  let np = $(`#normal-price-${id}`).val();
  let dp = $(`#discounted-price-${id}`).val();
  let dr = $(`#discount-rate-${id}`).val();
  if (types.includes('normal-price') && types.includes('discounted-price')) {
    let discountRate = ((np - dp) / np) * 100;
    $(`#discount-rate-${id}`).val(discountRate);
  } else if (
    types.includes('normal-price') &&
    types.includes('discount-rate')
  ) {
    let discountedPrice = np - (np * dr) / 100;
    $(`#discounted-price-${id}`).val(discountedPrice);
  }
}

function newForm(id) {
  return `

  <tr>
                            <td><select class="form-control" id="form-${id}">
                                <option>Renk</option>
                                <option>Diğer</option>     
                            </select></td>
                            <td id="option-details-${id}"><button class="btn btn-primary float-right" type="button" id="add-new-option-${id}">Seçenek Ekle</button></td>
                        </tr>
`;
}
function newProductForm(id) {
  return `
  <div class="card-body" id="new-product-form-${id}">
  <div class="container">
  
    <div class="row mt">
    <div class="w-100"></div>
    <div class="col"><input name="formTitle" class="form-control" type="text" id="title-${id}"  placeholder="Ürün Adı" data-language="en"></div>
     
    </div>
    <div class="row mt-4">
    <div class="w-100"></div>
    <div class="col"><input  name="formDescription"  class="form-control" type="text" id="description-${id}"  placeholder="Ürün Açıklaması" data-language="en"></div>
   
  </div>  
    <div class="row mt-4">
      <div class="w-100"></div>
      <div class="col"> <input  name="formImg"  class="form-control" type="text" id="img-url-${id}"  placeholder="Ürün Fotoğrafı Url" data-language="en"></div>
  
    </div> 
    
   
  </div>
</div> 
  `;
}

function newPrice(id) {
  return `
  <div class="card-body" id="price-form-${id}">
  <div class="container">
    <div class="row mt">
      <div class="col"><input  name="formStartDate"  type="text" id="date-from-${id}" class="datepicker-here form-control" placeholder="Başlangıç Tarihi" data-language="en"></div>
      <div class="col"><input  name="formEndDate"  type="text" id="date-to-${id}" class="datepicker-here form-control" placeholder="Bitiş Tarihi" data-language="en"></div>
    </div>
    <div class="row mt-4">
    <div class="w-100"></div>
    <div class="col"><input type="text"  name="formCurrency"  id="currency-${id}" class=" form-control" placeholder="Currency" data-language="en"></div>
    <div class="col"> <input type="number"  name="formNormalPrice"  id="normal-price-${id}" data-changed="false" class="form-control price-calc-${id}" placeholder="Normal Fiyat" step="0.01"></div>
  </div>  
    <div class="row mt-4">
      <div class="w-100"></div>
      <div class="col"> <input type="number"  name="formDiscountedPrice"  id="discounted-price-${id}" data-changed="false" class="form-control price-calc-${id}" placeholder="İndirimli Fiyat" step="0.01"></div>
      <div class="col"><input type="number"  name="formDiscountRatio"  class="form-control price-calc-${id}" data-changed="false" placeholder="İndirim Oranı" id="discount-rate-${id}"></div>
    </div> 
    <div class="row mt-4">
      <div class="w-100"></div>
      <div class="col d-flex" id="color-options-${id}"></div>
      <div class="col"> </div>
    </div> 
   
    <div class="row mt-4">
      <div class="w-100"></div>
      <div class="col"><button type="button" id="remove-button-${id}" class="btn btn-outline-danger">Fiyatları Sıfırla</button></div>
      <div class="col"></div>
    </div> 
      
  </div>
</div>
  `;
}

function addPrice(id) {
  priceCount++;
  $('#collapseTwo').append(newPrice(id));
  $(`#date-from-${id}`).datepicker({
    language: 'en',
  });
  $(`#date-to-${id}`).datepicker({
    language: 'en',
  });
  $(`#price-form-${id}`).data('lastTwo', []);
  $(`.price-calc-${id}`).focusin(function() {
    let lastTwo = $(`#price-form-${id}`).data('lastTwo');

    if (!lastTwo.includes(this)) {
      lastTwo.push(this);
      if (lastTwo.length > 2) {
        let removedElement = lastTwo[0];
        $(`#${removedElement.id}`).css('background-color', 'white');
        lastTwo = lastTwo.splice(1);
      }
      $(`#price-form-${id}`).data('lastTwo', lastTwo);
      console.log($(`#price-form-${id}`).data('lastTwo'));
    }
    lastTwo.forEach(el => {
      $(`#${el.id}`).css('background-color', 'lightblue');
    });
  });

  $(`.price-calc-${id}`).keyup(function() {
    calc(id);
  });

  $(`#remove-button-${id}`).click(function() {
    $(`.price-calc-${id}`).data('lastTwo', []);
    $(`.price-calc-${id}`).val('');
    $(`.price-calc-${id}`).css('background-color', 'white');
  });
}

function addColorSelect(id) {
  $(`#option-details-${id}`)
    .append(`<div id="pickr-${id}" class="input-group-sm  d-inline-flex" ><div class="pickr-${id}"> </div>

      <input type="text" name="formColor" class="form-control ml-2" id="color-name-${id}" placeholder="Renk Adı" aria-label="Username" aria-describedby="basic-addon1">
      <button type="button" id="save-color-button-${id}" class="btn btn-sm btn-outline-primary ml-2">Kaydet</button>
    </div>`);
  const pickr = Pickr.create({
    el: `.pickr-${id}`,

    components: {
      // Main components
      preview: true,
      opacity: true,
      hue: true,

      // Input / output Options
      interaction: {
        hex: true,
        rgba: true,
        hsla: true,
        hsva: true,
        cmyk: true,
        input: true,
        clear: true,
        save: true,
      },
    },
  });

  pickr.on('save', (color, instance) => {
    // colorArray.push(color);
    console.log(colorArray);
    $(`#color-options-0`)
      .append(`<div class="btn-group-toggle" data-toggle="buttons">
    <label class="btn btn-secondary color-checkbox" style="background-color: ${color
      .toRGBA()
      .toString()};">
      <input  name="formCheckbox"  type="checkbox" autocomplete="off">
    </label>
  </div>
   `);
  });
}
function addNewProduct(id) {
  productCount++;
  $('#dynamic-field-2').append(newProductForm(id));

  //console.log(id)
}

function addOption(id) {
  optionCount++;
  $('#dynamic-field').append(newForm(id));
  addColorSelect(id);
  //console.log(id)
  $(`#form-${id}`).change(function(event) {
    let element = event.target;
    //console.log(element)
    let selectedOption = element.options[element.selectedIndex].value;

    if (selectedOption === 'Renk') {
      $(`#other-${id}`).remove();
      console.log('renk seçildi');
      addColorSelect(id);
    } else if (selectedOption === 'Diğer') {
      $(`#pickr-${id}`).remove();
      $(`#option-details-${id}`)
        .append(`<div id="other-${id}" class="input-group-inline  d-inline-flex" >

      <input type="text"  name="formOption"  class="form-control ml-2" id="other-option-${id}" placeholder="Seçenek"  aria-describedby="basic-addon1">
    </div>`);
    }
  });
  $(`#add-new-option-${id}`).click(event => {
    console.log('test');
    addOption(`${optionCount}`);
  });
  $(`#save-color-button-${id}`).click(event => {
    console.log('color saved');
    colorObject = {
      "colorName" : $(`#color-name-${id}`).val(),
      "colorCode" : $(`#pickr-${id} > .pickr > button`).css('color')
    };
    colorArray[''+id]= colorObject;
    console.log(colorArray);
  });
  
}



$('#submit-button').click(event => {
  // console.log($('#title-0').val());
  data.options = options
  const data = {
    title: $('[name="formTitle"]').val(),
    description: $('[name="formDescription"]').val(),
    imageURL: $('[name="formImg"]').val(),
    options: {
      color1: {
        type: 'color',
        text: colorArray[0].toString(),
        value: colorArray[0].toString(),
      },
      color2: {
        type: 'color',
        text: 'rgba(0, 128, 128, 1)',
        value: 'rgba(0, 128, 128, 1)',
      },
      size1: {
        type: 'size',
        text: 'S',
        value: 's',
      },
    },
    prices: [
      {
        validFrom: $('[name="formStartDate"]').val(),
        validTo: $('[name="formEndDate"]').val(),
        currency: $('[name="formCurrency"]').val(),
        originalPrice: $('[name="formNormalPrice"]').val(),
        discountedPrice: $('[name="formDiscountedPrice"]').val(),
        discountRate: $('[name="formDiscountRatio"]').val(),
        // stock: '10',
        // isActive: 'true',
        options: ['color1', 'size1'],
      },
    ],
  };
  console.log(data);
  fetch('http://localhost:5000/newproduct', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Request succeeded with JSON response', data);
    })
    .catch(error => {
      console.log('Request failed', error);
    });
});
$(document).ready(function() {
  addNewProduct(0);
  addOption(0);
  addPrice(0);

  async function test() {
    return 'hello';
  }
});
