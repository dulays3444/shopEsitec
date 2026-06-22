/* =================================================
   ShopESITEC — Script principal
   Initialise la page et gère les événements
   ================================================= */

document.addEventListener('DOMContentLoaded', function () {

  // Afficher les produits selon la page
  renderFeaturedProducts();
  renderAllProducts();
  renderCartPage();
  updateCartCount();

  // Gérer les clics sur "Ajouter au panier" (délégation d'événement)
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart')) {
      const productId = e.target.getAttribute('data-id');
      addToCart(productId);
      showAddedFeedback(e.target);
    }
  });

  // Gérer le filtre par catégorie sur la page produits
  const categoryFilter = document.getElementById('category-filter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', function () {
      renderAllProducts(this.value);
    });
  }

  // Gérer le bouton de commande
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
      if (getTotalItems() === 0) {
        alert("Votre panier est vide !");
      } else {
        alert("Commande validée ! Merci pour votre achat de " + formatPrice(getTotalPrice()));
        cart = [];
        updateCartCount();
        renderCartPage();
      }
    });
  }

  // Gérer le formulaire de contact
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const feedback = document.getElementById('form-feedback');
      feedback.textContent = "Merci ! Votre message a bien été envoyé.";
      contactForm.reset();
    });
  }
});

// Afficher un retour visuel quand un produit est ajouté
function showAddedFeedback(button) {
  const original = button.textContent;
  button.textContent = "Ajouté ✓";
  button.style.backgroundColor = "#16a34a";
  setTimeout(function () {
    button.textContent = original;
    button.style.backgroundColor = "";
  }, 1000);
}
