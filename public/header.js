
// Function to clear localStorage when user logs out
function clearLocalStorage() {
    localStorage.setItem("isLoggedIn", "false");
}

window.addEventListener("load", () => {
    // Get the URL parameters
    const headerDiv = document.getElementById("header");
    const urlParams = new URLSearchParams(window.location.search);
    const isLoggedIn = urlParams.get("login");

    // Check if the server has set the session variable to remember login
    if (isLoggedIn === "success") {
        // If the server says the user is logged in, set the local storage value
        localStorage.setItem("isLoggedIn", "true");
    }

    // Retrieve the login status from local storage
    const localIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const headerHTML = localIsLoggedIn
        ? `<div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
          </a>
    
          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="/" class="nav-link px-2 text-secondary">Home</a></li>
            <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
            <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
            <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
            <li><a href="#" class="nav-link px-2 text-white">About</a></li>
          </ul>
    
          <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" onsubmit="redirectToSearch(); return false;">
            <input type="search" class="form-control form-control-dark text-bg-dark" id="searchInput" placeholder="Search..." aria-label="Search">
          </form>
    
          <div class="dropdown text-end">
            <a href="#" class="d-block text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
            </a>
            <ul class="dropdown-menu text-small">
              <li><a class="dropdown-item" href="#">New project...</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="/logout" onclick="clearLocalStorage()">Sign out</a></li>
            </ul>
          </div>
        </div>
    </div>`
        : `<div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
          </a>
  
          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="/" class="nav-link px-2 text-secondary">Home</a></li>
            <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
            <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
            <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
            <li><a href="#" class="nav-link px-2 text-white">About</a></li>
          </ul>
  
          <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" onsubmit="redirectToSearch(); return false;">
            <input type="search" class="form-control form-control-dark text-bg-dark" id="searchInput" placeholder="Search..." aria-label="Search">
          </form>
  
          <div class="text-end">
              <button type="button" class="btn btn-outline-light me-2" onclick="redirectToLogin()">Login</button>
              <button type="button" class="btn btn-warning" onclick="redirectToSignup()">Sign-up</button>
          </div>
        </div>
      </div>`

    headerDiv.innerHTML = headerHTML;
});



function redirectToLogin() {
    // Redirect to the login page
    window.location.href = "/login"; // Replace with the actual URL of your login page
}

function redirectToSignup() {
    // Redirect to the signup page
    window.location.href = "/signup"; // Replace with the actual URL of your signup page
}

function redirectToSearch() {
    // Get the value from the search input
    const searchValue = document.getElementById("searchInput").value;
    
    // Check if the searchValue is not empty
    if (searchValue.trim() !== "") {
        // Redirect to the search page with the search query
        window.location.href = `/search?query=${searchValue}`;
    }

    // Prevent the default form submission
    return false;
}