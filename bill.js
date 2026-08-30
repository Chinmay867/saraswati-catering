// =========================
// BILL JS
// =========================


// =========================
// CUSTOMER DETAILS
// =========================

const customerData =
    JSON.parse(localStorage.getItem("customerData")) || {};

document.getElementById("customerName").textContent =
    customerData.name || "—";

document.getElementById("mobile").textContent =
    customerData.mobile || "—";

document.getElementById("eventType").textContent =
    customerData.eventType || "—";

document.getElementById("eventDate").textContent =
    customerData.eventDate || "—";

document.getElementById("members").textContent =
    customerData.members || "—";

document.getElementById("address").textContent =
    customerData.address || "—";


// =========================
// BILL NUMBER
// =========================

const billNumber =
    "SC-" +
    Date.now().toString().slice(-6);

document.getElementById("billNumber").textContent =
    "Bill No: " + billNumber;


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


const selectedContainer =
    document.getElementById("selectedItems");


let totalItems = 0;


// =========================
// DISPLAY ITEMS
// =========================

categories.forEach(category => {

    const items =
        JSON.parse(
            localStorage.getItem(category.key)
        ) || [];


    items.forEach(item => {

        const itemDiv =
            document.createElement("div");

        itemDiv.className = "bill-item";

        itemDiv.innerHTML = `
            <span class="bill-item-name">
                ${item}
            </span>

            <span class="bill-item-number">
                ✓
            </span>
        `;

        selectedContainer.appendChild(itemDiv);

        totalItems++;

    });

});


// =========================
// TOTAL ITEMS
// =========================

document.getElementById("totalItems").textContent =
    totalItems;


// =========================
// PRICE
// =========================

// Abhi prices final nahi hain

const totalAmount = 0;

const advanceAmount =
    totalAmount * 0.20;

const remainingAmount =
    totalAmount * 0.80;


// =========================
// DISPLAY AMOUNTS
// =========================

document.getElementById("totalAmount").textContent =
    "₹" + totalAmount.toFixed(2);

document.getElementById("advanceAmount").textContent =
    "₹" + advanceAmount.toFixed(2);

document.getElementById("remainingAmount").textContent =
    "₹" + remainingAmount.toFixed(2);


// =========================
// EMPTY ITEMS
// =========================

if(totalItems === 0){

    selectedContainer.innerHTML = `
        <div class="bill-item">
            <span class="bill-item-name">
                No items selected
            </span>
        </div>
    `;

}
// =========================
// SAVE BILL AS IMAGE
// =========================

document.getElementById("saveImageBtn").addEventListener(
    "click",
    async function () {

        const bill = document.querySelector(".bill-card");

        const canvas = await html2canvas(bill, {
            scale: 2,
            backgroundColor: "#ffffff"
        });

        const link = document.createElement("a");

        link.download = "Saraswati-Catering-" + billNumber + ".png";

        link.href = canvas.toDataURL("image/png");

        link.click();

    }
);