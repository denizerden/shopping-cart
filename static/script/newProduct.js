
let colorArray = [];
let optionCount = 0;

function newForm(id) {
  return `

  <tr>
                            <td><select class="form-control" id="form-${id}">
                                <option>Renk</option>
                                <option>2</option>     
                            </select></td>
                            <td id="option-details-${id}"><button class="btn btn-primary float-right" type="button" id="add-new-option-${id}">Seçenek Ekle</button></td>
                        </tr>
`;
}
function addOption (id) {
  optionCount++;
  $('#dynamic-field').append(newForm(id));
  //console.log(id)
  $(`#form-${id}`).change(function(event){
    let element = event.target;
    //console.log(element)
    let selectedOption = element.options[element.selectedIndex].value;
  
    if(selectedOption==="Renk"){
      console.log("renk seçildi");
      $(`#option-details-${id}`).append(`<div id="pickr-${id}"><div class="pickr-${id}"> </div></div>`)
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
                'rgba(255, 193, 7, 1)'
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
                    save: true
                }
            }
        });
        
        pickr.on('save', (color, instance) => {
         
          colorArray.push(color);
          console.log(colorArray);
        });
        
    }
    else if(selectedOption==="2"){
      $(`#pickr-${id}`).remove();
        }
  });
  $(`#add-new-option-${id}`).click(event => {
    console.log("test");
    addOption(`${optionCount}`);
    
  });
}
$(document).ready(function() {
  addOption(0)
  $("#product-form").submit(function(event) {
    event.preventDefault();
    data = {
      lorem: "ipsum",
      dolor: "sit",
      amet: 1299
    };
    fetch(document.URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  });
//   const pickr = Pickr.create({
//     el: '.pickr',
    
//     swatches: [
//         'rgba(244, 67, 54, 1)',
//         'rgba(233, 30, 99, 0.95)',
//         'rgba(156, 39, 176, 0.9)',
//         'rgba(103, 58, 183, 0.85)',
//         'rgba(63, 81, 181, 0.8)',
//         'rgba(33, 150, 243, 0.75)',
//         'rgba(3, 169, 244, 0.7)',
//         'rgba(0, 188, 212, 0.7)',
//         'rgba(0, 150, 136, 0.75)',
//         'rgba(76, 175, 80, 0.8)',
//         'rgba(139, 195, 74, 0.85)',
//         'rgba(205, 220, 57, 0.9)',
//         'rgba(255, 235, 59, 0.95)',
//         'rgba(255, 193, 7, 1)'
//     ],

//     components: {

//         // Main components
//         preview: true,
//         opacity: true,
//         hue: true,

//         // Input / output Options
//         interaction: {
//             hex: true,
//             rgba: true,
//             hsla: true,
//             hsva: true,
//             cmyk: true,
//             input: true,
//             clear: true,
//             save: true
//         }
//     }
// });

// pickr.on('save', (color, instance) => {
 
//   colorArray.push(color);
//   console.log(colorArray);
// });
// Add new option
let i =1;
// $(`#add-new-option-0`).click(event => {
//   //console.log("test");
//   addOption(`${optionCount}`);
  
// });


});

