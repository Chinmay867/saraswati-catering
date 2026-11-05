
// =========================
// SELECTED ITEMS
// =========================

const categories = [
    { name: "Mocktail", key: "mocktailItems" },
    { name: "Beverages", key: "beveragesItems" },
    { name: "Veg Starter", key: "vegstarterItems" },
    { name: "Non-Veg Starter", key: "nonvegstarterItems" },
    { name: "Rice", key: "riceItems" },
    { name: "Biriyani", key: "biryaniItems" },
    { name: "Veg Main", key: "vegmainItems" },
    { name: "Non-Veg Main", key: "nonvegmainItems" },
    { name: "Sides", key: "sidesItems" },
    { name: "Sweets", key: "sweetsItems" }
];

const container =
    document.getElementById("selectedItemsContainer");

const totalItems =
    document.getElementById("totalItems");

const newItemInput =
    document.getElementById("newItemName");

const addItemBtn =
    document.getElementById("addItemBtn");

const priceInput =
    document.getElementById("perPlatePrice");

let total = 0;


// =========================
// CUSTOM ITEMS
// =========================

let customItems =
    JSON.parse(localStorage.getItem("customItems")) || [];


// =========================
// DISPLAY ITEMS
// =========================

function displayItems() {

    container.innerHTML = "";
    total = 0;

    categories.forEach(category => {

        const items =
            JSON.parse(localStorage.getItem(category.key)) || [];

        if (items.length === 0) return;

        const categoryBox =
            document.createElement("div");

        categoryBox.className = "selected-category";

        const title =
            document.createElement("div");

        title.className = "category-title";
        title.textContent = category.name;

        const itemsBox =
            document.createElement("div");

        itemsBox.className = "category-items";

        items.forEach(item => {

            const itemBox =
                document.createElement("div");

            itemBox.className = "selected-item";

            const name =
                document.createElement("span");

            name.className = "item-name";
            name.textContent = item;

            const tick =
                document.createElement("span");

            tick.className = "item-number";
            tick.textContent = "✓";

            itemBox.append(name, tick);
            itemsBox.appendChild(itemBox);

            total++;

        });

        categoryBox.append(title, itemsBox);
        container.appendChild(categoryBox);

    });


    // Custom Items

    if (customItems.length > 0) {

        const customCategory =
            document.createElement("div");

        customCategory.className = "selected-category";

        const customTitle =
            document.createElement("div");

        customTitle.className = "category-title";
        customTitle.textContent = "Custom Items";

        const customBox =
            document.createElement("div");

        customBox.className = "category-items";

        customItems.forEach((item, index) => {

            const itemBox =
                document.createElement("div");

            itemBox.className =
                "selected-item custom-item";

            const name =
                document.createElement("span");

            name.className = "item-name";
            name.textContent = item;

            const removeBtn =
                document.createElement("button");

            removeBtn.type = "button";
            removeBtn.textContent = "✕";
            removeBtn.style.cssText =
                "border:none;background:none;color:#b00000;font-size:17px;cursor:pointer;";

            removeBtn.addEventListener("click", () => {

                customItems.splice(index, 1);

                localStorage.setItem(
                    "customItems",
                    JSON.stringify(customItems)
                );

                displayItems();

            });

            itemBox.append(name, removeBtn);
            customBox.appendChild(itemBox);

            total++;

        });

        customCategory.append(customTitle, customBox);
        container.appendChild(customCategory);

    }


    if (total === 0) {

        container.innerHTML = `
            <div class="empty-message">
                <span>🛒</span>
                No items selected yet.
            </div>
        `;

    }

    totalItems.textContent = total;

}


// =========================
// ADD NEW ITEM
// =========================

addItemBtn.addEventListener("click", function () {

    const itemName = newItemInput.value.trim();

    if (itemName === "") {
        alert("Please enter item name.");
        return;
    }

    customItems.push(itemName);

    localStorage.setItem(
        "customItems",
        JSON.stringify(customItems)
    );

    newItemInput.value = "";

    displayItems();

});


// Enter key support

newItemInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addItemBtn.click();
    }

});


// =========================
// LOAD SAVED PRICE
// =========================

priceInput.value =
    localStorage.getItem("perPlatePrice") || "";

priceInput.addEventListener("input", function () {

    localStorage.setItem(
        "perPlatePrice",
        priceInput.value
    );

});


// =========================
// GENERATE BILL
// =========================

document
    .getElementById("continueBtn")
    .addEventListener("click", function () {

        const price = Number(priceInput.value);

        if (priceInput.value.trim() === "" ||
            !Number.isFinite(price) ||
            price <= 0) {

            alert("Please enter a valid Per Plate Price.");
            priceInput.focus();
            return;

        }

        if (total === 0) {

            alert("Please select at least one menu item.");
            return;

        }

        localStorage.setItem(
            "perPlatePrice",
            price
        );

        window.location.href = "bill.html";

    });


// =========================
// INITIAL LOAD
// =========================

displayItems();
