// Script for add to cart function
// Checks if the HTML page is still loading
if (document.readyState == "loading") {
    // Waits until the HTML has finished loading before running ready()
    document.addEventListener('DOMContentLoaded', ready)
} else{
    // Runs ready() if the page has already loaded
    ready()
}
// Sets up the buttons and inputs used on the page
function ready() {
    // Finds all remove item buttons
    var removeCartItemButton = document.getElementsByClassName('remove-btn')
    // Adds a click event to each remove item button
    for (var i = 0; i < removeCartItemButton.length; i++) {
        var button = removeCartItemButton[i]
        button.addEventListener('click', function(event) {
            // Gets the button that was clicked
            var buttonClicked = event.target
            // Removes the cart row containing the clicked button
            buttonClicked.parentElement.parentElement.remove()
            // Updates the total price
            updateCartTotal()
        })
    }
    // Finds all quantity input boxes
    var quantityInputs = document.getElementsByClassName('cart-qty')
    // Adds a change event to each quantity input
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        // Runs quantityChanged when the quantity is changed
        input.addEventListener('change', quantityChanged)
    }
    // Finds all add to cart buttons
    var addToCartButton = document.getElementsByClassName('cart-button')
    // Adds a click event to each add to cart button
    for (var i = 0; i < addToCartButton.length; i++) {
        var button = addToCartButton[i]
        // Runs addToCartClicked when the button is clicked
        button.addEventListener('click', addToCartClicked)
    }
    // Adds a click event to checkout button
    document.getElementsByClassName('checkout-btn')[0].addEventListener('click', checkoutClicked)
}
// Runs when the Checkout button is clicked
function checkoutClicked() {
    // Shows a thank-you message
    alert('Thank you for purchasing!')
    // Finds the container holding all cart items
    var cartItems = document.getElementsByClassName('cart-container')[0]
    // Removes all items from the cart
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    // Updates the total price
    updateCartTotal()
}
// Runs when the quantity of a cart item is changed
function quantityChanged(event) {
    // Gets the quantity input that was changed
    var input = event.target
    // Checks if the quantity is not a number or is less than or equal to zero
    if (isNaN(input.value) || input.value <= 0) {
        // Changes the quantity back to 1
        input.value = 1
    }
    // Updates the total price
    updateCartTotal()
}
// Runs when an add to cart button is clicked
function addToCartClicked(event) {
    // Gets the button that was clicked
    var button = event.target
    // Gets the product containing the button
    var shopItem = button.parentElement
    // Gets the product name
    var title = shopItem.getElementsByClassName('product-title')[0].innerText
    // Gets the product price
    var price = shopItem.getElementsByClassName('product-price')[0].innerText
    // Gets the product image
    var imageSrc = shopItem.getElementsByClassName('product-img')[0].src
    // Adds the product information to the cart
    addItemToCart(title, price, imageSrc)
    // Updates the total price
    updateCartTotal()
}
// Creates a new item in the cart
function addItemToCart(title, price, imageSrc) {
    // Creates a new div for the cart row
    var cartRowCreate = document.createElement('div')
    // Gives the new div the cart-row class
    cartRowCreate.classList.add('cart-row')
    // Finds the container where cart items are stored
    var cartItems = document.getElementsByClassName('cart-container')[0]
    // Finds the names of products already in the cart
    var cartItemNames = cartItems.getElementsByClassName('cart-product-title')
    // Checks each product already in the cart
    for (var i = 0; i < cartItemNames.length; i++) {
        // Checks if the product is already in the cart
        if (cartItemNames[i].innerText == title) {
            // Shows message if the product is already added
            alert('This product is already added to the cart')
            // Stops the function from adding the product again
            return
        }
    }
    // Creates the HTML for the new cart item
    var cartRowContents = `
        <img class="cart-img" src="${imageSrc}">
        <h3 class="cart-product-title">${title}</h3>
        <p class="cart-price">${price}</p>
        <input class="cart-qty" type="number" value="1">
        <button class="remove-btn">Remove Item</button>`
    // Adds the cart item HTML to the new row
    cartRowCreate.innerHTML = cartRowContents
    // Adds new row to the cart
    cartItems.append(cartRowCreate)
    // Adds remove item event to the created button
    cartRowCreate.getElementsByClassName('remove-btn')[0].addEventListener('click', function(event) {
        // Gets the button that was clicked
        var buttonClicked = event.target
        // Removes the cart row
        buttonClicked.parentElement.remove()
        // Updates the total price
        updateCartTotal()
    })
    cartRowCreate.getElementsByClassName('cart-qty')[0].addEventListener('change', quantityChanged)
}
// Calculates and updates the total cart price
function updateCartTotal() {
    // Finds the cart container
    var cartItemContainer = document.getElementsByClassName('cart-container')[0]
    // Finds all cart rows
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    // Starts the total price at zero
    var total = 0
    // Goes through each cart item
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        // Gets the price of the product
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        // Gets the quantity of the product
        var quantityElement = cartRow.getElementsByClassName('cart-qty')[0]
        // Converts the price from text into a number
        var price = parseFloat(priceElement.innerText.replace('NZ$', ''))
        var quantity = quantityElement.value
        // Adds price multiplied by quantity to the total
        total = total + (price * quantity)
    }
    // Rouds the price
    total = Math.round(total * 100) / 100
    // Displays total price
    document.getElementsByClassName('cart-price-total')[0].innerText = 'NZ$' + total
}