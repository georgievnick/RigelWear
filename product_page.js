// SHOW PRODUCT LARGE IMAGES ON CLICK --------------------------------

// const largeimg = document.querySelector(".main-image");
// const smallimg = document.querySelector(".small-images");
// const currentImg = document.querySelector(".active");

// // let thumbPointer = smallimg[0];
// smallimg.addEventListener("click", clickImage);

// for(i = 0; i < smallimg.length; i++) {

// }

// function clickImage(e) {
//   if (e.target == thumbPointer) return;
//   currentImg.src = e.target.src;
//   thumbPointer = e.target;
// }

// console.log(clickImage);

// CART SECTION ---------------------------------------

const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.getElementById("bag-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector("#products");
// cart
let cart = [];

// Getting the products ---------------------------------
class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.items;
      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        const link = item.link;
        return { title, price, id, image, link };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// UI Display products -------------------------------------
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
      <section id="products">
      <div class="grid-items">
        <div class="card">
        <a href=${product.link}
              > <img src=${product.image} alt="product" class="product-image">
          <div class="content"></a>
          <p>${product.title}</p>
          <h2>$${product.price}</h2>
          </div>
        </div>
      </div>
      </section>
      `;
    });
    productsDOM.innerHTML = result;
  }
}

// Local Storage ------------------------------------------------
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  // get all products -------------------------------------------
  products.getProducts().then((products) => {
    ui.displayProducts(products);
    Storage.saveProducts(products);
  });
});
