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
      <td><button type="button" class="btn btn-danger" id="remove-button">Remove</button> </td>
      <td> ${product.prices[0].currency} ${product.prices[0].original_price}</td>

      
    </tr>
   


 `)
    
    }
    
    $('#total-menu').append(/* html */` 
    <label>Total</label>
    <div  id="cart-total">${calculateTotal()} </div>
      
    
        
        <button class="btn btn-primary checkout">Checkout</button>
      `)
    

    $('#minusButton').click(function() {
      $('#counter').val(parseInt($('#counter').val()) - 1);
    });
    
    $('#plusButton').click(function() {
      $('#counter').val(parseInt($('#counter').val()) + 1);
    });
    $('#remove-button').click(function () {
      console.log("remove");
      removeItem(this);
      
    // $('#myTable').on('click', buttonSelector, function(){
    //   $(this).closest ('tr').remove ();
  });
});
function calculateTotal(){
  loadCart();
 let total =0;
 let currency = "";
  for(let product of cart){
    
    total += product.count * product.prices[0].original_price;
    currency = product.prices[0].currency;
  }
  console.log(total);
  return currency,total;
}

function removeItem(removeButton){
   /* Remove row from DOM and recalc cart total */
   let productRow = $(removeButton).parent().parent();
   console.log(productRow)
   productRow.slideUp( function() {
     productRow.remove();

     //recalculateCart();
   });
}