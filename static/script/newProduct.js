
let colorArray = [];
let optionCount = 0;
{/* <div class="form-group mb-2 d-none " id="color-picker-${id}">
                <div class="pickr"></div>
  </div>  */}
function newForm(id) {
  return `

  <tr>
                            <td><select class="form-control">
                                <option>Renk</option>
                                <option>2</option>     
                            </select></td>
                            <td><button class="btn btn-primary" type="submit" id="add-new-option">Seçenek Ekle</button></td>
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
     
    }
    else if(selectedOption==="2"){
      //$("#color-picker").addClass("d-none");
    }
  });
 
}
$(document).ready(function() {
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
$('#add-new-option').click(event => {
  //console.log("test");
  addOption(`option-${optionCount}`);
  
});

});

