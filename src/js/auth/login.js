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

  console.log(data);

  // Show Notification
  if (error == null) successNotification("Login Successfully!");
  else {
    errorNotification("Something wrong happened. Cannot login account.", 10);
    console.log(error);
  }

  // Reset Form
  form_login.reset();

  // Enable Submit Button
  document.querySelector("#form_login button").disabled = false;
  document.querySelector("#form_login button").innerHTML = `Login`;

  // Redirect to dashboard
  window.location.pathname = "/dashboard.html";
};
