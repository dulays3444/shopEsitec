/* =================================================
   ShopESITEC — Gestion du panier
   Le panier est stocké en mémoire (variable globale)
   ================================================= */

// Le panier : tableau d'objets { id, quantity }
let cart = [];

// Ajouter un produit au panier
function addToCart(productId) {
  const id = parseInt(productId);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: id, quantity: 1 });
  }
  updateCartCount();
}

// Retirer complètement un produit du panier
function removeFromCart(productId) {
  const id = parseInt(productId);
  cart = cart.filter(item => item.id !== id);
  updateCartCount();
  renderCartPage();
}

// Modifier la quantité d'un produit
function changeQuantity(productId, delta) {
  const id = parseInt(productId);
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(id);
  } else {
    updateCartCount();
    renderCartPage();
  }
}

// Calculer le nombre total d'articles
function getTotalItems() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Calculer le prix total du panier
function getTotalPrice() {
  return cart.reduce((sum, item) => {
    const product = getProductById(item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
}

// Mettre à jour le compteur du panier dans le header
function updateCartCount() {
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = getTotalItems();
  }
}

// Afficher le contenu de la page panier
function renderCartPage() {
  const container = document.getElementById('cart-items');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<div class="empty-cart"><p>Votre panier est vide.</p></div>';
    updateCartSummary();
    return;
  }

  container.innerHTML = cart.map(item => {
    const product = getProductById(item.id);
    if (!product) return '';
    return `
      <div class="cart-item">
        <div class="cart-item-icon">${product.icon}</div>
        <div class="cart-item-details">
          <h4>${product.name}</h4>
          <p>${formatPrice(product.price)} l'unité</p>
        </div>
        <div class="cart-item-actions">
          <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Retirer</button>
        </div>
      </div>
    `;
  }).join('');

  updateCartSummary();
}

// Mettre à jour le récapitulatif du panier
function updateCartSummary() {
  const totalItemsEl = document.getElementById('cart-total-items');
  const totalPriceEl = document.getElementById('cart-total-price');

  if (totalItemsEl) totalItemsEl.textContent = getTotalItems();
  if (totalPriceEl) totalPriceEl.textContent = formatPrice(getTotalPrice());
}
