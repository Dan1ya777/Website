if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', ready)
} else{
    ready()
}

function ready() {
    var removeCartItemButton = document.getElementsByClassName('remove-btn')
    for (var i = 0; i < removeCartItemButton.length; i++) {
        var button = removeCartItemButton[i]
        button.addEventListener('click', function(event) {
            var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            updateCartTotal()
        })
    }

    var quantityInputs = document.getElementsByClassName('cart-qty')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButton = document.getElementsByClassName('cart-button')
    for (var i = 0; i < addToCartButton.length; i++) {
        var button = addToCartButton[i]
        button.addEventListener('click', addToCartClicked)
    }
    
    document.getElementsByClassName('checkout-btn')[0].addEventListener('click', checkoutClicked)
}

function checkoutClicked() {
    alert('Thank you for purchasing!')
    var cartItems = document.getElementsByClassName('cart-container')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('product-title')[0].innerText
    var price = shopItem.getElementsByClassName('product-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('product-img')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRowCreate = document.createElement('div')
    cartRowCreate.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-container')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-product-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This product is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <img class="cart-img" src="${imageSrc}">
        <h3 class="cart-product-title">${title}</h3>
        <p class="cart-price">${price}</p>
        <input class="cart-qty" type="number" value="1">
        <button class="remove-btn">Remove Item</button>`
    cartRowCreate.innerHTML = cartRowContents
    cartItems.append(cartRowCreate)
    cartRowCreate.getElementsByClassName('remove-btn')[0].addEventListener('click', function(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.remove()
        updateCartTotal()
    })
    cartRowCreate.getElementsByClassName('cart-qty')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-container')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-qty')[0]
        var price = parseFloat(priceElement.innerText.replace('NZ$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-price-total')[0].innerText = 'NZ$' + total
}