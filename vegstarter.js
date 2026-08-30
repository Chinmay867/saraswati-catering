// Local Storage Key
const STORAGE_KEY = "vegstarterItems";

const buttons = document.querySelectorAll(".select-btn");
const selectedBtn = document.getElementById("selectedBtn");


// Selected items load karo
let selectedItems =
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];


// Page load par selected restore karo
buttons.forEach(button => {

    const item = button.dataset.item;

    if(selectedItems.includes(item)){

        button.classList.add("selected");
        button.innerHTML = "✔ Selected";

    }

});


// Counter
updateCounter();


// Select / Unselect
buttons.forEach(button => {

    button.addEventListener("click", function(){

        const item = button.dataset.item;

        if(button.classList.contains("selected")){

            button.classList.remove("selected");
            button.innerHTML = "Select";

            selectedItems =
                selectedItems.filter(i => i !== item);

        }
        else{

            button.classList.add("selected");
            button.innerHTML = "✔ Selected";

            selectedItems.push(item);

        }

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