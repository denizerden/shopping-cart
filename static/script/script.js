function addToDatabase(addItem) {
    // const product = {
    //     title: "POST Product",
    //     description: "This product was created to test POST requests.",
    //     price: 123
    // }

    const url = document.URL;
    const tokens = url.split('/');
    const product_id = tokens[tokens.length - 1];

    const product_query = {
        id: product_id
    }

    $.post(url, product_query, function(result) {
        console.log(result);
    });
}