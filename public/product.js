const productImages = document.querySelectorAll(".product-images img"); // selecting all image thumbs
const productImageSlide = document.querySelector(".image-slider"); // seclecting image slider element

let activeImageSlide = 0; // default slider image

productImages.forEach((item, i) => { // looping through each image thumb
    item.addEventListener('click', () => { // adding click event to each image thumbnail
        productImages[activeImageSlide].classList.remove('active'); // removing active class from current image thumb
        item.classList.add('active'); // adding active class to the current or clicked image thumb
        productImageSlide.style.backgroundImage = `url('${item.src}')`; // setting up image slider's background image
        activeImageSlide = i; // updating the image slider variable to track current thumb
    })
});

const sizeBtns = document.querySelectorAll('.size-radio-btn'); // selecting size buttons
let checkedBtn = 0; // current selected button

sizeBtns.forEach((item, i) => { // looping through each button
    item.addEventListener('click', () => { // adding click event to each 
        sizeBtns[checkedBtn].classList.remove('check'); // removing check class from the current button
        item.classList.add('check'); // adding check class to clicked button
        checkedBtn = i; // upading the variable
    })
})

// Add a click event handler to the "Add to Cart" button
document.querySelector('.cart-btn').addEventListener('click', addToCart);

function addToCart() {
  // Capture the product details from the product page
  const productDetails = {
    name: document.querySelector('.product-brand').textContent,
    price: document.querySelector('.product-price').textContent,
    size: getSelectedSize(), // Implement a function to get the selected size
  };
}

function getSelectedSize() {
  const sizeRadioButtons = document.querySelectorAll('input[type="radio"][name="size"]');
  for (const radioButton of sizeRadioButtons) {
    if (radioButton.checked) {
      return radioButton.value;
    }
  }
  return null; // Handle the case where no size is selected
}

