import {
  supabase,
  successNotification,
  errorNotification,
  doLogout,
} from "../main";

// Assign Logout Functionality
const btn_logout = document.getElementById("btn_logout");

btn_logout.onclick = doLogout;

// Submit Form Functionality
const form_item = document.getElementById("form_item");

form_item.onsubmit = async (e) => {
  e.preventDefault();

  alert("hello world");
};
