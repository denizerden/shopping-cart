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

    $("#check-color").change(function () {
      if (this.checked == true) {
        $("#color-selection").html('<input type=\'text\' id="custom" /> <input type=\'text\' id="color-name" placeholder="Color Name" /><input type=\'number\' id="color-price" placeholder="Price" step="0.1" /> <button>+</button>');
        $("#custom").spectrum({
          color: "#f00"
        });
        $
      }
    });
    $("#check-size").change(function () {
      if (this.checked == true) {
        alert("checked")
      } else {
        console.log($("#custom").spectrum("get"));
      }
    });
  });




});
