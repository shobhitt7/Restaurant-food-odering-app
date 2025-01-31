// importing menu data
import { menuData } from "./data.js";

// dom elements
const cartContainer = document.getElementById("cart");
const divData = document.getElementById("menu-data");
const cartButton = document.getElementById("cart-btn");
const cartForm = document.getElementById("cart-form");
const closeBtn = document.getElementById("close-btn");

const cart = [];

// render menu items
divData.innerHTML = menuData
  .map(
    (item) => `
      <div class='food-container container'>
        <div class='img-div'>
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class='text-div'>
          <h1>${item.name}</h1>
          <p>₹${item.price}</p>
        </div>
        <div class='buy-btn'>
          <button class='buy-button' data-id="${item.id}">Buy</button>
        </div>
     </div>`
  )
  .join("");

// update cart display
function updateCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p class='empty-msg'>The cart is empty.</p>";
    return;
  }

  const cartItemsHTML = cart
    .map(
      (item, index) => `
        <div class="cart-item">
          <img src="${item.image}" class="cart-image" alt="${item.name}">
          <div class='details'>
            <p>⚫ ITEM: ${item.name}</p>
            <p>➡ Price: ₹${item.price}</p>
            <button class="remove-button" data-index="${index}">Remove</button>
          </div>
        </div>`
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);

   // total price
  cartContainer.innerHTML = `
    ${cartItemsHTML}
    <p class='total-price'><strong>Total: ₹${total}</strong></p>
    <button class="order-btn" id="buy-btn">BUY NOW</button>
  `;

  // payment page 
     document.querySelector(".order-btn").addEventListener("click", () => {
    cartForm.style.display = "block";
    });

  // Order confirmation message
  const formSubmit = document.getElementById('payment-button')
  const orderMessage = document.getElementById('order-cnfrm')
   formSubmit.addEventListener('click',() =>{
    event.preventDefault()
   orderMessage.style.display = 'block'

  //  back to home
   setTimeout(()=>{
    orderMessage.style.display = 'none'
    cartForm.style.display = 'none'
    cart.length = 0
    updateCart()
   },5000)
   })
}

// add item to cart
divData.addEventListener("click", (event) => {
  if (event.target.classList.contains("buy-button")) {
    const productId = parseInt(event.target.dataset.id);
    const product = menuData.find((item) => item.id === productId);

    if (product) {
      cart.push(product);
      updateCart();
    }
  }
});

// remove item from cart
cartContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-button")) {
    const index = parseInt(event.target.dataset.index);
    cart.splice(index, 1);
    updateCart();
  }
});

// smooth scroll to cart
cartButton.addEventListener("click", () => {
  cartContainer.scrollIntoView({ behavior: "smooth" });
});

// // close cart form
closeBtn.addEventListener("click", () => {
  cartForm.style.display = "none";
});


  
  







  
