import { supabase, successNotification, errorNotification } from "../main";

const form_login = document.getElementById("form_login");

form_login.onsubmit = async (e) => {
  e.preventDefault();

  // Disable the submit button
  document.querySelector("#form_login button").disabled = true;
  document.querySelector(
    "#form_login button"
  ).innerHTML = `<div class="spinner-border me-2" role="status">
                    </div>
                    <span>Loading...</span>`;

  // Get All values from input, select, textarea under form tag
  const formData = new FormData(form_login);

  // Supabase Sigin
  let { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Get data for session and user
  let session = data.session;
  let user = data.user;

  // If User can be accessed; Or user is already verified
  if (session != null) {
    // Store tokens for API
    localStorage.setItem("access_token", session.access_token);
    localStorage.setItem("refresh_token", session.refresh_token);

    // For role based authentication; uncomment if you want to implement
    // let { data: users_information, error } = await supabase
    //   .from("users_information")
    //   .select("*") // You can specifically set what column, read docu for more info
    //   .eq("user_id", user.id);
    // console.log(users_information);
    // localStorage.setItem("role", users_information.role);
  }

  if (error == null) {
    // Show Notification
    successNotification("Login Successfully!");

    // Redirect to dashboard
    window.location.pathname = "/dashboard.html";
  } else {
    errorNotification("Something wrong happened. Cannot login account.", 10);
    console.log(error);
  }

  // Reset Form
  form_login.reset();

  // Enable Submit Button
  document.querySelector("#form_login button").disabled = false;
  document.querySelector("#form_login button").innerHTML = `Login`;
};
