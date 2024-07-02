document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Eliminar</button></td>
            `;
            cartItemsElement.appendChild(row);
        });
        cartTotalElement.innerText = total.toFixed(2);
        cartCountElement.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCart();
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCart();
        });
    });

    const cartIcon = document.getElementById('cart-icon');
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));

    cartIcon.addEventListener('click', function() {
        cartModal.show();
    });

    // Cargar el carrito desde localStorage al cargar la página
    updateCart();
});
