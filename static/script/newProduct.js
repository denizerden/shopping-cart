let colorArray = [];
let optionCount = 0;
let priceCount = 0;

function calc(id) {
  let dpChanged = $(`#discounted-price-${id}`).data('changed');
  let npChanged = $(`#normal-price-${id}`).data('changed');
  let drChanged = $(`#discount-rate-${id}`).data('changed');
  let np = $(`#normal-price-${id}`).val();

  let dp = $(`#discounted-price-${id}`).val();
  let dr = $(`#discount-rate-${id}`).val();
  if (npChanged === 'true' && drChanged === 'true') {
    let y = np - (np * dr) / 100;
    $(`#discounted-price-${id}`).val(y);
  } else if (npChanged === 'true' && dpChanged === 'true') {
    let x = ((np - dp) / np) * 100;
    $(`#discount-rate-${id}`).val(x);
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

function newPrice(id) {
  return `
  <div class="card-body" id="price-form-${id}">
  <div class="container">
    <div class="row mt">
      <div class="col"><input type="text" id="date-from-${id}" class="datepicker-here form-control" placeholder="Başlangıç Tarihi" data-language="en"></div>
      <div class="col"><input type="text" id="date-to-${id}" class="datepicker-here form-control" placeholder="Bitiş Tarihi" data-language="en"></div>
    </div>
    <div class="row mt-4">
      <div class="w-100"></div>
      <div class="col"> <input type="number" id="normal-price-${id}" data-changed="false" class="form-control price-calc-${id}" placeholder="Normal Fiyat" step="0.01"></div>
      <div class="col"> <input type="number" id="discounted-price-${id}" data-changed="false" class="form-control price-calc-${id}" placeholder="İndirimli Fiyat" step="0.01"></div>
    </div> 
    <div class="row mt-4">
      <div class="w-100"></div>
      <div class="col"> <input type="number" class="form-control price-calc-${id}" data-changed="false" placeholder="İndirim Oranı" id="discount-rate-${id}"></div>
      <div class="col" id="color-options-${id}"></div>
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
  $(`.price-calc-${id}`).keyup(function() {
    console.log($(this).data('changed'));
    $(this).data('changed', 'true');
    calc(id);
  });
  $(`#remove-button-${id}`).click(function() {
    $(`.price-calc-${id}`).data('changed', 'false');
    $(`.price-calc-${id}`).val('');
  });
}

function addColorSelect(id) {
  $(`#option-details-${id}`)
    .append(`<div id="pickr-${id}" class="input-group-sm  d-inline-flex" ><div class="pickr-${id}"> </div>

      <input type="text" class="form-control ml-2" id="color-name-${id}" placeholder="Renk Adı" aria-label="Username" aria-describedby="basic-addon1">
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
    colorArray.push(color);
    console.log(colorArray);
    $(`#color-options-0`).append(`<input type="checkbox" id="checkbox" class="round" style="background-color: ${color.toRGBA().toString()};"></input>`);
  });
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

      <input type="text" class="form-control ml-2" id="other-option-${id}" placeholder="Seçenek" aria-label="Username" aria-describedby="basic-addon1">
    </div>`);
    }
  });
  $(`#add-new-option-${id}`).click(event => {
    console.log('test');
    addOption(`${optionCount}`);
  });
}
$(document).ready(function() {
  addOption(0);
  addPrice(0);
});
