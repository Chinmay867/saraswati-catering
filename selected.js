// =========================
// SELECTED ITEMS
// =========================

const categories = [

    {
        name: "Mocktail",
        key: "mocktailItems"
    },

    {
        name: "Beverages",
        key: "beveragesItems"
    },

    {
        name: "Veg Starter",
        key: "vegstarterItems"
    },

    {
        name: "Non-Veg Starter",
        key: "nonvegstarterItems"
    },

    {
        name: "Rice",
        key: "riceItems"
    },

    {
        name: "Biriyani",
        key: "biryaniItems"
    },

    {
        name: "Veg Main",
        key: "vegmainItems"
    },

    {
        name: "Non-Veg Main",
        key: "nonvegmainItems"
    },

    {
        name: "Sides",
        key: "sidesItems"
    },

    {
        name: "Sweets",
        key: "sweetsItems"
    }

];


const container =
    document.getElementById("selectedItemsContainer");

const totalItems =
    document.getElementById("totalItems");


let total = 0;


// =========================
// LOAD ITEMS
// =========================

categories.forEach(category => {

    let items =
        JSON.parse(
            localStorage.getItem(category.key)
        ) || [];


    if(items.length === 0){
        return;
    }


    items.forEach(item => {

        const itemBox =
            document.createElement("div");

        itemBox.className = "selected-item";

        itemBox.innerHTML = `
            <span class="item-name">
                ${item}
            </span>
        `;

        container.appendChild(itemBox);

        total++;

    });

});


// =========================
// TOTAL
// =========================

totalItems.textContent = total;


// =========================
// CONTINUE
// =========================

document
    .getElementById("continueBtn")
    .addEventListener("click", function(){

        window.location.href = "bill.html";

    });