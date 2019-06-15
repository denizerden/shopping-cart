function addToDatabase(addItem) {
    const product = {
        title: "POST Product",
        description: "This product was created to test POST requests.",
        price: 123
    }
    const url = document.URL;
    $.post(url, product, function(result) {
        console.log(result);
    });
}