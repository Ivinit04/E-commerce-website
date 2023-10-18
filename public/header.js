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