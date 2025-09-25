document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart();

    // Função para adicionar itens ao carrinho
    function addToCart(name, price) {
        const item = { name, price };
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    // Função para remover itens do carrinho
    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    // Atualizar a lista de itens no carrinho
    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - R$${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remover</button>`;
            cartItems.appendChild(li);
            total += parseFloat(item.price);
        });

        totalElement.innerText = total.toFixed(2);
    }

    // Adicionar itens ao carrinho ao clicar no botão
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(button => {
        button.addEventListener('click', function () {
            const item = this.closest('.item');
            const name = item.getAttribute('data-name');
            const price = parseFloat(item.getAttribute('data-price'));
            addToCart(name, price);
        });
    });

    // A função de remover é usada diretamente no botão de remover
    window.removeFromCart = removeFromCart;
});
