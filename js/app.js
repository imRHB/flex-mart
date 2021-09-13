/* 
    Function to fetch url and load products
*/

const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

/* 
    Function to display all products
*/

const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <div class="single-product">
        <div>
          <img class="product-image" src=${image}></img>
        </div>
          <h3>${product.title}</h3>
          <p>Category: ${product.category}</p>
          <h3>Price: $${product.price}</h3>
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">Add to cart</button>
          <button onclick="loadProductById(${product.id})" id="details-btn" class="btn btn-danger">Details</button>
          <hr>
          <p class="reviews"><i class="fas fa-star"></i> ${product.rating.rate}</p>
          <p class="reviews"><i class="fas fa-user"></i> ${product.rating.count} total</p>
      </div>
    `;
    document.getElementById("all-products").appendChild(div);
  }
};

/* 
    Function to update the total product quantity
*/

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

/* 
    Function to get the input value
*/

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

/* 
    Function to calculate the product's total price
*/

const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = (convertedOldPrice + convertPrice).toFixed(2);
  document.getElementById(id).innerText = total;
};

/* 
    Function to set innertext
*/

const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

/* 
    Function to calculate the total tax and delivery charge
*/

const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

/* 
    Function to calculate grand-total
*/

const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

/* 
    Function to load specific product by product ID
*/

const loadProductById = (productId) => {
  const url = `https://fakestoreapi.com/products/${productId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayProductDetails(data));
};

/* 
    Function to display product details
*/

const displayProductDetails = (product) => {
  const productDetails = document.getElementById('product-details');
  productDetails.style.display = 'block';
  const div = document.createElement('div');
  productDetails.textContent = '';
  div.innerHTML = `
    <div class="col-md-4 col-sm-6">
      <img src="${product.image}" class="product-img-details" alt="">
    </div>
    <div class="col-md-8 col-sm-6">
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <p>Category: ${product.category}</p>
      <h2>Price: $${product.price}</h2>
      <p>Rating: ${product.rating.rate}</p>
      <p>Reviews: ${product.rating.count}</p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">Add to cart</button>
    </div>
  `;
  productDetails.appendChild(div);
};
