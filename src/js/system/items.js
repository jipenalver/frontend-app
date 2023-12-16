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

// Submit Form Functionality
const form_item = document.getElementById("form_item");

form_item.onsubmit = async (e) => {
  e.preventDefault();

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
}
