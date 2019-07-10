let colorArray = [];
let optionCount = 0;
let priceCount = 0;

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
              <div class="col"> <input type="number" id="normal-price-${id}" class="form-control" placeholder="Normal Fiyat" step="0.01"></div>
              <div class="col"> <input type="number" id="discounted-price-${id}" class="form-control" placeholder="İndirimli Fiyat" step="0.01"></div>
            </div> 
            <div class="row mt-4">
              <div class="w-100"></div>
              <div class="col"> <input type="number" class="form-control" placeholder="İndirim Oranı" id="discount-rate-${id}"></div>
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
}

function addOption(id) {
  optionCount++;
  $('#dynamic-field').append(newForm(id));
  //console.log(id)
  $(`#form-${id}`).change(function(event) {
    let element = event.target;
    //console.log(element)
    let selectedOption = element.options[element.selectedIndex].value;

    if (selectedOption === 'Renk') {
      $(`#other-${id}`).remove();
      console.log('renk seçildi');
      $(`#option-details-${id}`)
        .append(`<div id="pickr-${id}" class="input-group-sm  d-inline-flex" ><div class="pickr-${id}"> </div>

      <input type="text" class="form-control ml-2" id="color-name-${id}" placeholder="Renk Adı" aria-label="Username" aria-describedby="basic-addon1">
    </div>`);
      const pickr = Pickr.create({
        el: `.pickr-${id}`,

        swatches: [
          'rgba(244, 67, 54, 1)',
          'rgba(233, 30, 99, 0.95)',
          'rgba(156, 39, 176, 0.9)',
          'rgba(103, 58, 183, 0.85)',
          'rgba(63, 81, 181, 0.8)',
          'rgba(33, 150, 243, 0.75)',
          'rgba(3, 169, 244, 0.7)',
          'rgba(0, 188, 212, 0.7)',
          'rgba(0, 150, 136, 0.75)',
          'rgba(76, 175, 80, 0.8)',
          'rgba(139, 195, 74, 0.85)',
          'rgba(205, 220, 57, 0.9)',
          'rgba(255, 235, 59, 0.95)',
          'rgba(255, 193, 7, 1)',
        ],

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
      });
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
  $(
    `#option-details-0`
  ).append(`<div id="pickr-0" class="input-group-sm  d-inline-flex" ><div class="pickr-0"> </div>

      <input type="text" class="form-control ml-2" id="color-name-0" placeholder="Renk Adı" aria-label="Username" aria-describedby="basic-addon1">
    </div>`);
  const pickr = Pickr.create({
    el: `.pickr-0`,

    swatches: [
      'rgba(244, 67, 54, 1)',
      'rgba(233, 30, 99, 0.95)',
      'rgba(156, 39, 176, 0.9)',
      'rgba(103, 58, 183, 0.85)',
      'rgba(63, 81, 181, 0.8)',
      'rgba(33, 150, 243, 0.75)',
      'rgba(3, 169, 244, 0.7)',
      'rgba(0, 188, 212, 0.7)',
      'rgba(0, 150, 136, 0.75)',
      'rgba(76, 175, 80, 0.8)',
      'rgba(139, 195, 74, 0.85)',
      'rgba(205, 220, 57, 0.9)',
      'rgba(255, 235, 59, 0.95)',
      'rgba(255, 193, 7, 1)',
    ],

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
  });
  addPrice(0);
});
