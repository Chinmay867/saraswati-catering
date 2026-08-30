// Local Storage Key
const STORAGE_KEY = "riceItems";

// Sab buttons
const buttons = document.querySelectorAll(".select-btn");
const selectedBtn = document.getElementById("selectedBtn");

// Selected items load karo
let selectedItems =
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];


// Page load hote hi selected items restore karo
buttons.forEach(button => {

    const item = button.dataset.item;

    if(selectedItems.includes(item)){

        button.classList.add("selected");
        button.innerHTML = "✔ Selected";

    }

});


// Counter update
updateCounter();


// Button Click
buttons.forEach(button => {

    button.addEventListener("click", function(){

        const item = button.dataset.item;

        if(button.classList.contains("selected")){

            // Remove
            button.classList.remove("selected");
            button.innerHTML = "Select";

            selectedItems =
                selectedItems.filter(i => i !== item);

        }else{

            // Add
            button.classList.add("selected");
            button.innerHTML = "✔ Selected";

            selectedItems.push(item);

        }

        // Save
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(selectedItems)
        );

        updateCounter();

    });

});


// Counter Function
function updateCounter(){

    selectedBtn.innerHTML =
        "🛒 Selected : " + selectedItems.length;

}


// Save & Back
document.getElementById("saveBtn").addEventListener(
    "click",
    function(){

        window.location.href = "menu.html";

    }
);