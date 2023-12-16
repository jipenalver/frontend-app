import {
  supabase,
  successNotification,
  errorNotification,
  doLogout,
} from "../main";

// Load Data
getDatas();

// Assign Logout Functionality
const btn_logout = document.getElementById("btn_logout");

btn_logout.onclick = doLogout;

// Submit Form Functionality; Both Functional for Create and Update
const form_item = document.getElementById("form_item");

form_item.onsubmit = async (e) => {
  e.preventDefault();

  // Disable Button
  document.querySelector("#form_item button[type='submit']").disabled = true;
  document.querySelector("#form_item button[type='submit']").innerHTML = `
                      <span>Loading...</span>`;

  // Get All values from input, select, textarea under form tag
  const formData = new FormData(form_item);

  // Input Data Supabase
  const { data, error } = await supabase
    .from("items")
    .insert([
      {
        item_name: formData.get("item_name"),
        price: formData.get("price"),
        description: formData.get("description"),
        // image_path: formData.get("image_path"), // If you dont have uploading, you can comment this
      },
    ])
    .select();

  if (error == null) {
    successNotification("Item Successfully Added!", 15);

    // Modal Close
    document.getElementById("modal_close").click();

    // Reload Datas
    getDatas();
  } else {
    errorNotification("Something wrong happened. Cannot add item.", 15);
    console.log(error);
  }

  // Reset Form
  form_item.reset();

  // Enable Submit Button
  document.querySelector("#form_item button[type='submit']").disabled = false;
  document.querySelector(
    "#form_item button[type='submit']"
  ).innerHTML = `Submit`;
};

// Load Data Functionality
async function getDatas() {
  // Get all rows
  let { data: items, error } = await supabase.from("items").select("*");

  // Temporary storage for html elements and each items
  let container = "";
  // Get Each item and interpolate with html elements
  items.forEach((item) => {
    container += `<div class="col-sm-12">
                    <div class="card w-100 mt-3" data-id="${item.id}">

                        <div class="row">
                            <div class="col-sm-4">
                                <img src="${item.image_path}" width="100%" height="225px">
                            </div>

                            <div class="col-sm-8">
                                <div class="card-body">
                            
                                    <div class="dropdown float-end">
                                        <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                        <ul class="dropdown-menu">
                                            <li>
                                                <a class="dropdown-item" href="#" id="btn_edit" data-id="${item.id}">Edit</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#" id="btn_delete" data-id="${item.id}">Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                
                                    <h5 class="card-title">${item.item_name}</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">
                                        <small>${item.price}</small>
                                    </h6>
                                    <p class="card-text">${item.description}</p>

                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>`;
  });

  // Assign container to the html element to be displayed
  document.getElementById("get_data").innerHTML = container;

  // Assign click event on Edit Btns
  document.querySelectorAll("#btn_edit").forEach((element) => {
    element.addEventListener("click", editAction);
  });

  // Assign click event on Delete Btns
  document.querySelectorAll("#btn_delete").forEach((element) => {
    element.addEventListener("click", deleteAction);
  });
}

// Delete Functionality
const deleteAction = async (e) => {
  const id = e.target.getAttribute("data-id");

  // Change background color the card that you want to delete
  document.querySelector(`.card[data-id="${id}"]`).style.backgroundColor =
    "red";

  // Supabase Delete row
  const { error } = await supabase.from("items").delete().eq("id", id);

  if (error == null) {
    successNotification("Item Successfully Deleted!", 15);

    // Reload Datas
    //getDatas(); // This is slow

    // Remove the Card from the list
    document.querySelector(`.card[data-id="${id}"]`).remove();
  } else {
    errorNotification("Something wrong happened. Cannot delete item.", 15);
    console.log(error);

    // Change background color the card that you want to delete
    document.querySelector(`.card[data-id="${id}"]`).style.backgroundColor =
      "white";
  }
};

// Edit Functionality; but show first
const editAction = async (e) => {
  const id = e.target.getAttribute("data-id");

  // Change background color the card that you want to delete
  document.querySelector(`.card[data-id="${id}"]`).style.backgroundColor =
    "yellow";

  // Supabase show by id
  let { data: items, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", id);

  if (error == null) {
    // Assign values to the form
    document.getElementById("item_name").value = items[0].item_name;
    document.getElementById("price").value = items[0].price;
    document.getElementById("description").value = items[0].description;
  } else {
    errorNotification("Something wrong happened. Cannot show item.", 15);
    console.log(error);

    // Change background color the card that you want to delete
    document.querySelector(`.card[data-id="${id}"]`).style.backgroundColor =
      "white";
  }

  // Show Modal Form
  document.getElementById("modal_show").click();
};
