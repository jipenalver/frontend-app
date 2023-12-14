import { supabase, successNotification, errorNotification } from "../main";

const form_register = document.getElementById("form_register");

form_register.onsubmit = async (e) => {
  e.preventDefault();

  // Disable the submit button
  document.querySelector("#form_register button").disabled = true;
  document.querySelector(
    "#form_register button"
  ).innerHTML = `<div class="spinner-border me-2" role="status">
                    </div>
                    <span>Loading...</span>`;

  // Get All values from input, select, textarea under form tag
  const formData = new FormData(form_register);

  if (formData.get("password") == formData.get("password_confirmation")) {
    // Do action if the condition is correct

    // Supabase SignUp
    const { data, error } = await supabase.auth.signUp({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    // Store into variable the user_id
    let user_id = data.user.id;

    // Check if user_id does exist; registered
    if (user_id != null) {
      // Supabase user_informations table
      const { data, error } = await supabase
        .from("users_information")
        .insert([
          {
            firstname: formData.get("firstname"),
            lastname: formData.get("lastname"),
            mobile_no: formData.get("mobile_no"),
            user_id: user_id,
          },
        ])
        .select();

      // Show Notification
      if (error == null) successNotification("Registered Successfully!", 10);
      else {
        errorNotification(
          "Something wrong happened. Cannot register account.",
          10
        );
        console.log(error);
      }

      // Reset Form
      form_register.reset();

      // Enable Submit Button
      document.querySelector("#form_register button").disabled = false;
      document.querySelector("#form_register button").innerHTML = `Register`;
    }
  }
};
