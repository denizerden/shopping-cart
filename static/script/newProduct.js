const PRODUCT_TYPES = {
  generic: {
    name: "Generic Product",
    properties: ["color", "size"]
  },
  flight: {
    name: "Flight",
    properties: ["date", "class"]
  }
};

$(document).ready(function() {
  $("#product_type").append(
    `<option disabled="true" selected value="default">Select product type</option>`
  );
  for (const [type, props] of Object.entries(PRODUCT_TYPES)) {
    $("#product_type").append(
      `<option value="${type}">${PRODUCT_TYPES[type].name}</option>`
    );
  }

    $("#product_type").change(function(event) {
        let type = this.value;
        $("#product_properties_group").removeClass("d-none");
        $("#product_properties").html(``);
        for (prop of PRODUCT_TYPES[type].properties) {
          $("#product_properties").append(
            `<div class="form-check">
              <input class="form-check-input" type="checkbox" value="${prop}" id="check-${prop}">
              <label class="form-check-label" for="check-${prop}">${prop.toUpperCase()}</label>
            </div>
            `
          );
        }
      let i;
        $("#check-color").change(function () {

          if (this.checked == true) {
            $("#product_price").addClass("d-none");
            $("#product_price_label").addClass("d-none");
            i=0;
            $("#add-new-color").removeClass("d-none");
            /*$("#color-selection").prepend(`<div id="color-selection-${i}" class="mt-1" ><input type=\'text\' id="custom" /> <input class="form-control" type=\'text\' id="color-name" placeholder="Color Name" /><input class="form-control" type=\'number\' id="color-price" placeholder="Price" step="0.1" /> </div> `);
            $("#custom").spectrum({
              color: "#f00",
              replacerClassName:'form-control'
            });*/

          }
          else{
            //$("#color-selection").html('');
            if ($("#check-color").checked == false) {
              $("#product_price").removeClass("d-none");
              $("#product_price_label").removeClass("d-none");
            }
              $(`.color-select`).remove();
            i=0;
            $("#add-new-color").addClass("d-none");
          }
        });
        $("#add-new-color").click(function (event) {
          event.preventDefault();
          i++;
          $("#color-selection").prepend(`<div class="color-select mt-1"> <input type=\'text\' id="custom-${i}" /> <input class="form-control" type=\'text\' id="color-name" placeholder="Color Name" /><input class="form-control" type=\'number\' id="color-price" placeholder="Price" step="0.1" /> </div>`);
          $(`#custom-${i}`).spectrum({
            color: "#f00",
            replacerClassName:'form-control'
          });

        });
        $("#check-size").change(function () {
          if (this.checked == true) {
            $("#product_price").addClass("d-none");
            $("#product_price_label").addClass("d-none");
            $("#size-selection").append("<select class=\"form-control dropdown-info btn-sm\" id='size-options'>\n"  +
                "  <option selected>Open this select menu</option>\n" +
                "  <option value=\"number\">Number</option>\n" +
                "  <option value=\"2\">Two</option>\n" +
                "  <option value=\"3\">Three</option>\n" +
                "</select>")
          } else {
            if ($("#check-color").checked == false) {
              $("#product_price").removeClass("d-none");
              $("#product_price_label").removeClass("d-none");
            }
           $("#size-options").remove();
          }
        });

        $("#size-options").change(function () {
          let selectedItem = $(this).val();
          if(selectedItem === 'number'){
            $("#size-options").append("<div class=\"form-control form-control-lg is-invalid \", id=\"product-size-number\")");
          }
        });

    });




});
