"use strict";
var _a, _b, _c;
const WHATSAPP_NUMBER = '5541912345678'; // 55 41 9 1234 5678
let cart = [];
let orderNumber = Math.floor(Math.random() * 10000);
let notificationTimeout = null;
const pizzas = [
    // TRADICIONAIS
    {
        name: "Margherita",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
        description: "Molho de tomate fresco, mussarela especial, manjericão e azeite",
        prices: { Broto: 25, Média: 40, Grande: 50, Gigante: 65 },
        category: "Tradicionais"
    },
    {
        name: "Calabresa",
        image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?auto=format&fit=crop&w=800&q=80",
        description: "Calabresa fatiada, cebola e azeitonas",
        prices: { Broto: 28, Média: 45, Grande: 55, Gigante: 70 },
        category: "Tradicionais"
    },
    {
        name: "Portuguesa",
        image: "https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&w=800&q=80",
        description: "Presunto, ovos, cebola, pimentão e azeitonas",
        prices: { Broto: 30, Média: 48, Grande: 58 },
        category: "Tradicionais"
    },
    {
        name: "Quatro Queijos",
        image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=800&q=80",
        description: "Mussarela, provolone, parmesão e gorgonzola",
        prices: { Broto: 32, Média: 50, Grande: 60 },
        category: "Tradicionais"
    },
    {
        name: "Frango com Catupiry",
        image: "https://images.unsplash.com/photo-1593246049226-ded77bf90326?auto=format&fit=crop&w=800&q=80",
        description: "Frango desfiado e catupiry original",
        prices: { Broto: 30, Média: 48, Grande: 58 },
        category: "Tradicionais"
    },
    // ESPECIAIS
    {
        name: "Pepperoni Supreme",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
        description: "Pepperoni, mussarela especial e parmesão",
        prices: { Broto: 30, Média: 65, Grande: 85, Gigante: 105 },
        category: "Especiais"
    },
    {
        name: "Carne Seca com Cheddar",
        image: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=800&q=80",
        description: "Carne seca, cheddar cremoso e cebola caramelizada",
        prices: { Broto: 30, Média: 70, Grande: 90 },
        category: "Especiais"
    },
    {
        name: "Tropical",
        image: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?auto=format&fit=crop&w=800&q=80",
        description: "Presunto, abacaxi, mussarela e bacon",
        prices: { Broto: 30, Média: 68, Grande: 88 },
        category: "Especiais"
    },
    {
        name: "Vegetariana",
        image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
        description: "Mix de vegetais grelhados e queijo coalho",
        prices: { Broto: 35, Média: 62, Grande: 82 },
        category: "Especiais"
    },
    // DA CASA
    {
        name: "La Bella Supreme",
        image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?auto=format&fit=crop&w=800&q=80",
        description: "Carne moida, bacon, milho e cream cheese",
        prices: { Broto: 35, Média: 75, Grande: 95, Gigante: 115 },
        category: "Da Casa"
    },
    {
        name: "Costela Barbecue",
        image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80",
        description: "Costela desfiada, molho barbecue e cebola crispy",
        prices: { Broto: 35, Média: 78, Grande: 98 },
        category: "Da Casa"
    },
    {
        name: "Camarão Alho e Óleo",
        image: "https://images.unsplash.com/photo-1613564834361-9436948817d1?auto=format&fit=crop&w=800&q=80",
        description: "Camarões refogados no alho e óleo com parmesão",
        prices: { Broto: 45, Média: 85, Grande: 110 },
        category: "Da Casa"
    }
];
function renderMenu() {
    const container = document.getElementById('menu-container');
    if (container) {
        const categories = [...new Set(pizzas.map(pizza => pizza.category))];
        categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category-container';
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header';
            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = category;
            categoryHeader.appendChild(categoryTitle);
            categoryDiv.appendChild(categoryHeader);
            const pizzaGrid = document.createElement('div');
            pizzaGrid.className = 'pizza-grid';
            pizzas.filter(pizza => pizza.category === category)
                .forEach(pizza => {
                const card = document.createElement('div');
                card.className = 'pizza-card';
                // mostrar as pizzas, nome + desc
                card.innerHTML = `
                      <img src="${pizza.image}" alt="${pizza.name}" class="pizza-image">
                      <div class="pizza-info">
                          <h3 class="pizza-title">${pizza.name}</h3>
                          <p class="pizza-description">${pizza.description}</p>
                      </div>
                  `;
                pizzaGrid.appendChild(card);
            });
            categoryDiv.appendChild(pizzaGrid);
            container.appendChild(categoryDiv);
        });
    }
}
// func pra modificar o input do whats no contato
(_a = document.getElementById('phone')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function (e) {
    let value = this.value.replace(/\D/g, '').substring(0, 11);
    let formattedValue = '';
    if (value.length > 0) {
        formattedValue = '(' + value.substring(0, 2);
    }
    if (value.length > 2) {
        formattedValue += ') ' + value.substring(2, 3);
    }
    if (value.length > 3) {
        formattedValue += ' ' + value.substring(3, 7);
    }
    if (value.length > 7) {
        formattedValue += '-' + value.substring(7, 11);
    }
    this.value = formattedValue;
});
// abrir modal da pizza
function setupPizzaCards() {
    document.querySelectorAll('.pizza-card').forEach(card => {
        card.addEventListener('click', function () {
            var _a;
            const pizzaName = (_a = this.querySelector('.pizza-title')) === null || _a === void 0 ? void 0 : _a.textContent;
            const pizza = pizzas.find(p => p.name === pizzaName);
            if (pizza) {
                openPizzaModal(pizza);
            }
        });
    });
}
// modal da pizza com as infos pra add
function openPizzaModal(pizza) {
    var _a, _b, _c;
    const modal = document.getElementById('pizzaModal');
    const content = document.getElementById('modalPizzaContent');
    toggleModal(true);
    content.innerHTML = `
    <div class="modal-header">
      <h2 class="modal-title">${pizza.name}</h2>
      <span onclick="closePizzaModal()" class="close">&times;</span>
    </div>
    
    <div class="modal-body">
      <div class="pizza-image-container">
        <img src="${pizza.image}" alt="${pizza.name}" class="pizza-modal-image">
      </div>
      
      <p class="pizza-description">${pizza.description}</p>
      
      <div class="modal-controls">
        <div class="form-group size-selector">
          <label class="form-label">Tamanho</label>
          <div class="size-options">
            ${Object.entries(pizza.prices).map(([size, price]) => `
              <div class="size-option" data-size="${size}">
                <input type="radio" name="pizzaSize" id="size-${size}" value="${size}" 
                  ${size === 'Broto' ? 'checked' : ''}>
                <label for="size-${size}" class="size-label">
                  <span class="size-name">${size}</span>
                  <span class="size-price">R$ ${price.toFixed(2)}</span>
                </label>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="form-group quantity-selector">
          <label class="form-label">Quantidade</label>
          <div class="quantity-control">
            <button class="quantity-btn minus">−</button>
            <input type="number" id="pizzaQuantity" value="1" min="1" class="quantity-input">
            <button class="quantity-btn plus">+</button>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Observações</label>
          <textarea id="pizzaNotes" class="notes-input" 
            placeholder="Alguma observação especial?"></textarea>
        </div>
      </div>
    </div>

    <div class="modal-footer">
      <button id="addToCartBtn" class="add-to-cart-btn">
        <span class="btn-text">Adicionar</span>
        <span class="btn-price">R$ ${(pizza.prices.Broto * 1).toFixed(2)}</span>
      </button>
    </div>
  `;
    modal.style.display = 'block';
    const updatePrice = () => {
        var _a;
        const sizeInput = document.querySelector('input[name="pizzaSize"]:checked');
        const size = (sizeInput === null || sizeInput === void 0 ? void 0 : sizeInput.value) || 'Broto';
        const quantity = parseInt(document.getElementById('pizzaQuantity').value);
        const price = ((_a = pizza.prices[size]) !== null && _a !== void 0 ? _a : pizza.prices.Broto) * quantity;
        document.querySelector('.btn-price').textContent = `R$ ${price.toFixed(2)}`;
    };
    document.querySelectorAll('.size-option input').forEach(input => {
        input.addEventListener('change', updatePrice);
    });
    (_a = document.querySelector('.quantity-btn.plus')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        const input = document.getElementById('pizzaQuantity');
        input.value = (parseInt(input.value) + 1).toString();
        updatePrice();
    });
    (_b = document.querySelector('.quantity-btn.minus')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        const input = document.getElementById('pizzaQuantity');
        if (parseInt(input.value) > 1) {
            input.value = (parseInt(input.value) - 1).toString();
            updatePrice();
        }
    });
    (_c = document.getElementById('addToCartBtn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
        // pegar tamanho da pizza
        const sizeInput = document.querySelector('input[name="pizzaSize"]:checked');
        const size = (sizeInput === null || sizeInput === void 0 ? void 0 : sizeInput.value) || 'Média';
        // quantidade no input
        const quantityInput = document.getElementById('pizzaQuantity');
        const quantity = parseInt((quantityInput === null || quantityInput === void 0 ? void 0 : quantityInput.value) || '1');
        const notes = document.getElementById('pizzaNotes').value;
        for (let i = 0; i < quantity; i++) {
            cart.push(Object.assign(Object.assign({}, pizza), { selectedSize: size, selectedPrice: pizza.prices[size], notes }));
        }
        updateCart();
        modal.style.display = 'none';
        saveCartToStorage();
        showNotification(quantity > 1 ?
            `${quantity} pizzas de ${pizza.name} adicionadas` :
            `pizza de ${pizza.name} adicionada`, true);
        toggleModal(false);
    });
}
function closePizzaModal() {
    //console.log("Fechando modal da pizza");
    const modal = document.getElementById('pizzaModal');
    if (modal) {
        modal.style.display = 'none';
    }
    toggleModal(false);
}
function setupModalClosers() {
    // Mantenha apenas o clique fora do modal
    window.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('modal')) {
            target.style.display = 'none';
        }
        if (target.classList.contains('closepizza')) {
            target.style.display = 'none';
        }
    });
    toggleModal(false);
}
// atualizar carrinho / funções do Carrinho
function openCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'block';
    updateCart();
    toggleModal(true);
}
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
    toggleModal(false);
}
(_b = document.getElementById('cartIcon')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => openModal('cartModal'));
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function () {
        const modal = this.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
            toggleModal(false);
        }
    });
});
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
            toggleModal(false);
        });
    }
});
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    var cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    const checkoutBtn = document.getElementById('checkoutBtn');
    cartItems.innerHTML = '';
    const mobileBadge = document.getElementById('mobileCartBadge');
    if (mobileBadge) {
        if (cart.length > 0) {
            mobileBadge.textContent = cart.length.toString();
            mobileBadge.style.display = 'flex';
        }
        else {
            mobileBadge.style.display = 'none';
        }
    }
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Carrinho vazio</div>';
        checkoutBtn.style.display = 'none';
        cartTotal.textContent = `Total: R$ 0`;
    }
    else {
        checkoutBtn.style.display = 'block';
        const header = document.createElement('div');
        header.className = 'cart-header';
        header.innerHTML = `
        <div class="cart-cell name">Item</div>
        <div class="cart-cell price">Preço</div>
        <div class="cart-cell action"></div>
      `;
        cartItems.appendChild(header);
        // itens do carrinho
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
          <div class="cart-cell name">
            <strong>${item.name}</strong>
            <small>${item.selectedSize}</small>
            ${item.notes ? `<div class="notes">${item.notes}</div>` : ''}
          </div>
          <div class="cart-cell price">R$ ${item.selectedPrice.toFixed(2)}</div>
          <div class="cart-cell action">
            <button class="remove-item" data-index="${index}">×</button>
          </div>
        `;
            cartItems.appendChild(itemElement);
        });
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
                if (notificationTimeout) {
                    clearTimeout(notificationTimeout);
                    const notification = document.getElementById('notification');
                    notification.style.display = 'none';
                }
                showNotification('Item removido do carrinho', false);
                const total = cart.reduce((sum, item) => sum + item.selectedPrice, 0);
                cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
                cartCount.textContent = cart.length.toString();
            });
        });
        const total = cart.reduce((sum, item) => sum + item.selectedPrice, 0);
        cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
    cartCount.textContent = cart.length.toString();
    saveCartToStorage();
}
// func de tooltip
function showNotification(message, isSuccess = true) {
    const notification = document.getElementById('notification');
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
        notificationTimeout = null;
    }
    notification.style.display = 'none';
    notification.style.animation = '';
    void notification.offsetWidth;
    notification.textContent = message;
    notification.className = '';
    notification.classList.add(isSuccess ? 'success' : 'error');
    notification.style.display = 'block';
    notification.style.animation = 'slideIn 0.3s ease-out';
    notificationTimeout = window.setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        notificationTimeout = window.setTimeout(() => {
            notification.style.display = 'none';
            notificationTimeout = null;
        }, 300);
    }, 3000);
}
(_c = document.getElementById('cartLink')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
});
// func de finalizar pedido
function setupCheckout() {
    var _a, _b;
    (_a = document.getElementById('checkoutBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        closeAllModals();
        document.getElementById('checkoutModal').style.display = 'block';
    });
    (_b = document.getElementById('checkoutForm')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (e) {
        var _a;
        e.preventDefault();
        const name = document.getElementById('clientName').value;
        const address = document.getElementById('clientAddress').value;
        const payment = document.getElementById('paymentMethod').value;
        let total = cart.reduce((sum, item) => sum + item.selectedPrice, 0);
        let totalEntrega = total + 10;
        let message = `-------- ${(_a = document.querySelector('.logo')) === null || _a === void 0 ? void 0 : _a.textContent} --------\n`;
        message += `Pedido N°: ${orderNumber}\n`;
        message += `----------------------------------------\n`;
        cart.forEach(item => {
            message += `${item.name} (${item.selectedSize}) - R$ ${item.selectedPrice.toFixed(2)}\n`;
            if (item.notes)
                message += `Obs: *${item.notes}*\n`;
            message += `\n`;
        });
        message = message.trim();
        message += `\n----------------------------------------\n`;
        message += `Endereço: ${address}\n`;
        message += `Cliente: ${name}\n`;
        message += `Pagamento: ${payment}\n`;
        message += `------------------------------------------`;
        message += `\nTotal: R$ ${total.toFixed(2)}`;
        message += `\nEntrega: R$10.00\n`;
        message += `------------------------------------------`;
        message += `\nTotal: R$ ${totalEntrega.toFixed(2)}\n`;
        message += `------------------------------------------`;
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        cart = [];
        updateCart();
        closeAllModals();
        toggleModal(false);
    });
}
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}
//salvar tudo que foi escrito
function saveCartToStorage() {
    localStorage.setItem("cart", JSON.stringify({
        data: cart,
        expiration: new Date().getTime() + 3600000 // 1h em ms
    }));
}
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");
hamburger === null || hamburger === void 0 ? void 0 : hamburger.addEventListener("click", () => {
    navbar.classList.toggle("expanded");
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
});
// impedir o scroll da página quando modal aberto
function toggleModal(open) {
    document.body.style.overflow = open ? 'hidden' : '';
}
// func de smmoth scroll / by GPT
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        var _a;
        navbar.classList.remove("expanded");
        navLinks.classList.remove("active");
        hamburger === null || hamburger === void 0 ? void 0 : hamburger.classList.remove("active");
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#'))
            return;
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const navbarHeight = ((_a = document.querySelector('.navbar')) === null || _a === void 0 ? void 0 : _a.clientHeight) || 70;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            history.pushState(null, '', href);
        }
    });
});
// ao scrollar fechar a navbar mobile
window.addEventListener("scroll", () => {
    navbar.classList.remove("expanded");
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
});
// func principal de loading
document.addEventListener('DOMContentLoaded', function () {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        const { data, expiration } = JSON.parse(savedCart);
        // verifica se o storage do user ainda é valido
        if (new Date().getTime() < expiration) {
            cart = data;
            updateCart();
        }
        else {
            localStorage.removeItem("cart");
        }
    }
    renderMenu();
    setupPizzaCards();
    setupCheckout();
    setupModalClosers();
    setupCustomSelect();
    setInterval(() => {
        document.getElementById('cartCount').textContent = cart.length.toString();
    }, 100);
});
// func pra selecionar tipo de pagamento
function setupCustomSelect() {
    document.querySelectorAll('.custom-select').forEach(select => {
        var _a, _b, _c;
        const header = select.querySelector('.select-header');
        const options = select.querySelector('.select-options');
        const hiddenInput = select.querySelector('input[type="hidden"]');
        const initialOption = select.querySelector('.option');
        if (initialOption) {
            const icon = (_a = initialOption.querySelector('i')) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
            const text = ((_b = initialOption.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '';
            const value = initialOption.getAttribute('data-value') || '';
            header.querySelector('.selected-value').innerHTML = '';
            (_c = header.querySelector('.selected-value')) === null || _c === void 0 ? void 0 : _c.append(icon, text);
            hiddenInput.value = value;
        }
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = options.classList.toggle('show');
            header.classList.toggle('active', isActive);
        });
        select.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', (e) => {
                var _a, _b;
                e.stopPropagation();
                const value = option.getAttribute('data-value') || '';
                const icon = (_a = option.querySelector('i')) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
                const text = ((_b = option.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '';
                const selectedValue = header.querySelector('.selected-value');
                selectedValue.innerHTML = '';
                selectedValue.append(icon, text);
                hiddenInput.value = value;
                select.classList.remove('error');
                options.classList.remove('show');
                header.classList.remove('active');
            });
        });
    });
    document.addEventListener('click', () => {
        document.querySelectorAll('.select-options').forEach(options => {
            options.classList.remove('show');
        });
        document.querySelectorAll('.select-header').forEach(header => {
            header.classList.remove('active');
        });
    });
    // form validation
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            const selects = form.querySelectorAll('.custom-select');
            let isValid = true;
            selects.forEach(select => {
                const input = select.querySelector('input[type="hidden"]');
                if (!input.value) {
                    select.classList.add('error');
                    isValid = false;
                }
            });
            if (!isValid) {
                e.preventDefault();
                showNotification('Preencha todos os campos obrigatórios!', false);
            }
        });
    });
}
