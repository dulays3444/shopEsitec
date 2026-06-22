/* =================================================
   ShopESITEC — Données et affichage des produits
   ================================================= */

// Catalogue de produits (données statiques)
const PRODUCTS = [
  { id: 1, name: "Ordinateur portable Pro", category: "ordinateur", price: 450000, icon: "💻", featured: true },
  { id: 2, name: "Smartphone Galaxy X", category: "telephone", price: 280000, icon: "📱", featured: true },
  { id: 3, name: "Casque audio sans fil", category: "accessoire", price: 45000, icon: "🎧", featured: true },
  { id: 4, name: "Clavier mécanique RGB", category: "accessoire", price: 35000, icon: "⌨️", featured: true },
  { id: 5, name: "Écran 27 pouces 4K", category: "accessoire", price: 195000, icon: "🖥️", featured: false },
  { id: 6, name: "Tablette tactile 11''", category: "telephone", price: 220000, icon: "📲", featured: false },
  { id: 7, name: "Souris ergonomique", category: "accessoire", price: 18000, icon: "🖱️", featured: false },
  { id: 8, name: "PC Gamer RTX", category: "ordinateur", price: 850000, icon: "🖥️", featured: false },
];

// Formater un prix en FCFA
function formatPrice(price) {
  return price.toLocaleString('fr-FR') + " FCFA";
}

// Générer le HTML d'une carte produit
function createProductCard(product) {
  return `
    <div class="product-card" data-category="${product.category}">
      <div class="product-image">${product.icon}</div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>
        <button class="btn btn-primary btn-small add-to-cart" data-id="${product.id}">
          Ajouter au panier
        </button>
      </div>
    </div>
  `;
}

// Afficher les produits populaires (page d'accueil)
function renderFeaturedProducts() {
  const container = document.getElementById('featured-products');
  if (!container) return;

  const featured = PRODUCTS.filter(p => p.featured);
  container.innerHTML = featured.map(createProductCard).join('');
}

// Afficher tous les produits (page produits)
function renderAllProducts(filter = 'all') {
  const container = document.getElementById('all-products');
  if (!container) return;

  let list = PRODUCTS;
  if (filter !== 'all') {
    list = PRODUCTS.filter(p => p.category === filter);
  }
  container.innerHTML = list.map(createProductCard).join('');
}

// Trouver un produit par son identifiant
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}
