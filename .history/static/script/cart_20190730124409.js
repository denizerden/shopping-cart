$(document).ready(function() {
    loadCart();
    for (let product of cart) {
        // $('#cart-items').append(/* html */`
        //     ${product.title}, ${product.count}
        // `)
         $('#shopping-cart').append(/* html */`
         
         <div class="item">
         <span class="input-group">
         <div class="input-group-btn">
             <button class="btn" type="button" id="minusButton">-</button>
         </div>
         <input type="text" class="form-control no-padding add-color text-center height-25" maxlength="3" value="1"
             id="counter">
         <div class="input-group-btn">
             <button class="btn mr-1" type="button" id="plusButton">+</button>
         </div>
     </span>
      
         <div class="image">
           <!-- <img src="item-1.png" alt="" /> -->
         </div>
      
         <div class="description">
           <span> ${product.title}</span>
           <span>${product.description}</span>
          
         </div>
      
         <div class="quantity">
           <button class="plus-btn" type="button" name="button">
             <!-- <img src="plus.svg" alt="" /> -->
           </button>
           <input type="text" name="name" value="1">
           <button class="minus-btn" type="button" name="button">
             <!-- <img src="minus.svg" alt="" /> -->
           </button>
         </div>
      
         <div class="total-price">$549</div>
       </div>
          
        `)
    }
});