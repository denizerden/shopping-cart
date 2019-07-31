$(document).ready(function() {
    loadCart();
    // $('#myTable tbody').append(/* html */` 
    // <tr>
    //   <th scope="row">${product.img_url}</th>
    //   <td>${product.title}</td>
    //   <td>${product.img_url}</td>
      
    // </tr>
    // <tr>
    //   <th scope="row">2</th>
    //   <td>Jacob</td>
    //   <td>Thornton</td>
    //   <td>@fat</td>
    // </tr>
    // <tr>
    //   <th scope="row">3</th>
    //   <td>Larry</td>
    //   <td>the Bird</td>
    //   <td>@twitter</td>
//     </tr>


//  `)
    for (let product of cart) {
        // $('#cart-items').append(/* html */`
        //     ${product.title}, ${product.count}
        // `)
        $('#myTable tbody').append(/* html */` 
    <tr>
      <th scope="row"><img src="${product.image_url}"></img></th>
      <td>${product.title}</td>
      <td>${product.description}</td>
      <td> <span class="input-group" style="padding-left:0px ; width:60%">
      <div class="input-group-btn">
          <button class="btn" type="button" id="minusButton">-</button>
      </div>
      <input type="text" class="form-control no-padding add-color text-center height-25" maxlength="3" 
          id="counter" value="${product.count}">
      <div class="input-group-btn">
          <button class="btn mr-1" type="button" id="plusButton">+</button>
      </div>
  </span></td>
      <td>${product.prices[0].original_price} ${product.prices[0].currency}</td>

      
    </tr>
   


 `)
    
    }

    $('#minusButton').click(function() {
      $('#counter').val(parseInt($('#counter').val()) - 1);
    });
    
    $('#plusButton').click(function() {
      $('#counter').val(parseInt($('#counter').val()) + 1);
    });
});

