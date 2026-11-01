// State Management
let cart = [];

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
  updateCustomizer();
});

// Update Customizer Calculation
function updateCustomizer() {
  const cpuSelect = document.getElementById('cpuSelect');
  const gpuSelect = document.getElementById('gpuSelect');
  const ramSelect = document.getElementById('ramSelect');
  const ssdSelect = document.getElementById('ssdSelect');

  const cpuPrice = parseInt(cpuSelect.value);
  const gpuPrice = parseInt(gpuSelect.value);
  const ramPrice = parseInt(ramSelect.value);
  const ssdPrice = parseInt(ssdSelect.value);

  const totalPrice = cpuPrice + gpuPrice + ramPrice + ssdPrice;

  // Render Price
  document.getElementById('customPrice').textContent = `$${totalPrice.toLocaleString()}`;

  // Render Summary List
  const list = document.getElementById('configSummaryList');
  list.innerHTML = `
    <li>CPU: ${getSelectedText('cpuSelect')}</li>
    <li>GPU: ${getSelectedText('gpuSelect')}</li>
    <li>RAM: ${getSelectedText('ramSelect')}</li>
    <li>SSD: ${getSelectedText('ssdSelect')}</li>
  `;
}

function getSelectedText(selectId) {
  const select = document.getElementById(selectId);
  const selectedOption = select.options[select.selectedIndex];
  return selectedOption.getAttribute('data-name');
}

// Add Custom Build to Cart
function addCustomToCart() {
  const cpuSelect = document.getElementById('cpuSelect');
  const gpuSelect = document.getElementById('gpuSelect');
  const ramSelect = document.getElementById('ramSelect');
  const ssdSelect = document.getElementById('ssdSelect');

  const totalPrice = parseInt(cpuSelect.value) + parseInt(gpuSelect.value) + parseInt(ramSelect.value) + parseInt(ssdSelect.value);
  
  addToCart('AURA Custom Build', totalPrice);
}

// Cart Actions
function addToCart(title, price) {
  cart.push({ title, price });
  renderCart();
  openCart();
}

function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const badge = document.getElementById('cartCount');
  const totalElem = document.getElementById('cartTotalAmount');

  badge.textContent = cart.length;

  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-msg">Корзина пуста</p>';
    totalElem.textContent = '$0';
    return;
  }

  let total = 0;
  container.innerHTML = '';

  cart.forEach((item, index) => {
    total += item.price;
    const itemElem = document.createElement('div');
    itemElem.className = 'cart-item';
    itemElem.innerHTML = `
      <div>
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-price">$${item.price.toLocaleString()}</div>
      </div>
      <button class="close-btn" onclick="removeFromCart(${index})">&times;</button>
    `;
    container.appendChild(itemElem);
  });

  totalElem.textContent = `$${total.toLocaleString()}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function openCart() {
  document.getElementById('cartOverlay').classList.add('active');
  document.getElementById('cartDrawer').classList.add('active');
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('active');
  document.getElementById('cartDrawer').classList.remove('active');
}

function checkout() {
  if (cart.length === 0) {
    alert('Корзина пуста');
    return;
  }
  alert('Заказ успешно оформлен!');
  cart = [];
  renderCart();
  closeCart();
}
