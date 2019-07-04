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
});
