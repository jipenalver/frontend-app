function setRouter() {
  switch (window.location.pathname) {
    // If you are logged in you cant access outside pages; redirect to dashboard
    case "/":
    case "/index.html":
    case "/register.html":
      if (localStorage.getItem("access_token")) {
        window.location.pathname = "/dashboard.html";
      }
      break;

    // If you are not logged in you cant access dashboard pages; redirect to /
    case "/dashboard.html":
    case "/items.html": // Add more case if there are more pages
      if (!localStorage.getItem("access_token")) {
        window.location.pathname = "/index.html";
      }
      break;

    // For Admin Users only; redirect to /dashboard; uncomment if you want to implement
    // case "/users.html": // Change this to a page where Admin has access; Add more case if there are more pages
    //   if (localStorage.getItem("role") != "Admin") {
    //     window.location.pathname = "/dashboard.html";
    //   }
    //   break;

    default:
      break;
  }
}

export { setRouter };
