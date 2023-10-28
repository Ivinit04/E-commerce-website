
function changeClass(event) {
  // Get the index of the clicked anchor
  const listItems = document.querySelectorAll(".nav .nav-link");
  const clickedIndex = Array.from(listItems).indexOf(event.target);

  // Save the clicked index to localStorage
  localStorage.setItem("clickedIndex", clickedIndex); 
}

function collectionLinkClicked(event, identifier) {
  // Save the collection identifier to localStorage
  localStorage.setItem("collectionIdentifier", identifier);
}


window.addEventListener("load", () => {

    /* you use localStorage to store the index of the last clicked link. This way, when you navigate to a new page and load its content, 
    it will check the index in localStorage and apply the appropriate class change to the corresponding link.
    When you click on a navigation link, you toggle the class of the clicked link, changing it from text-white to text-secondary. */ 
    const listItems = document.querySelectorAll(".nav .nav-link");
    const clickedIndex = localStorage.getItem("clickedIndex");
    const collectionIdentifier = localStorage.getItem("collectionIdentifier");

    if (collectionIdentifier !== null) {
        // Remove text-secondary class from all anchors
        listItems.forEach((item) => {
            item.classList.remove("text-secondary");
            item.classList.add("text-white");
        });

        // Apply the class change based on the identifier
        switch (collectionIdentifier) {
            case 'women':
                listItems[2].classList.add("text-secondary");
                listItems[2].classList.remove("text-white");
                break;
            case 'men':
                listItems[1].classList.add("text-secondary");
                listItems[1].classList.remove("text-white");
                break;
            case 'accessories':
                listItems[3].classList.add("text-secondary");
                listItems[3].classList.remove("text-white");
                break;
            default:
                // Handle other cases or do nothing
        }
    }

    // Clear the saved  index
    localStorage.removeItem("collectionIdentifier")
  
    if (clickedIndex !== null) {
      // Remove text-secondary class from all anchors
      listItems.forEach((item) => {
        item.classList.remove("text-secondary");
        item.classList.add("text-white");
      });
  
      // Set text-secondary class to the anchor with the specified index
      listItems[clickedIndex].classList.add("text-secondary");
      listItems[clickedIndex].classList.remove("text-white");
    }
    // Clear the saved index from localStorage
    localStorage.removeItem("clickedIndex");
       
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