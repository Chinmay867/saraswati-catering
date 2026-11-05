
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

let billNumber =
    localStorage.getItem("currentBillNumber");

if (!billNumber) {
    billNumber = "SC-" + Date.now().toString().slice(-6);
    localStorage.setItem("currentBillNumber", billNumber);
}

document.getElementById("billNumber").textContent =
    "Bill No: " + billNumber;


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

const selectedContainer =
    document.getElementById("selectedItems");

let totalItems = 0;


// Display category items

categories.forEach(category => {

    const items =
        JSON.parse(localStorage.getItem(category.key)) || [];

    if (items.length === 0) return;

    const categoryDiv = document.createElement("div");
    categoryDiv.className = "bill-category";

    const heading = document.createElement("h4");
    heading.textContent = category.name;

    categoryDiv.appendChild(heading);

    items.forEach(item => {

        const itemDiv = document.createElement("div");
        itemDiv.className = "bill-item";

        const name = document.createElement("span");
        name.className = "bill-item-name";
        name.textContent = item;

        const tick = document.createElement("span");
        tick.className = "bill-item-number";
        tick.textContent = "✓";

        itemDiv.append(name, tick);
        categoryDiv.appendChild(itemDiv);

        totalItems++;

    });

    selectedContainer.appendChild(categoryDiv);

});


// Custom Items

const customItems =
    JSON.parse(localStorage.getItem("customItems")) || [];

if (customItems.length > 0) {

    const customDiv = document.createElement("div");
    customDiv.className = "bill-category";

    const heading = document.createElement("h4");
    heading.textContent = "Custom Items";

    customDiv.appendChild(heading);

    customItems.forEach(item => {

        const itemDiv = document.createElement("div");
        itemDiv.className = "bill-item";

        const name = document.createElement("span");
        name.className = "bill-item-name";
        name.textContent = item;

        const tick = document.createElement("span");
        tick.className = "bill-item-number";
        tick.textContent = "✓";

        itemDiv.append(name, tick);
        customDiv.appendChild(itemDiv);

        totalItems++;

    });

    selectedContainer.appendChild(customDiv);

}


// Empty Items

if (totalItems === 0) {

    selectedContainer.innerHTML = `
        <div class="bill-item">
            <span class="bill-item-name">
                No items selected
            </span>
        </div>
    `;

}

document.getElementById("totalItems").textContent =
    totalItems;


// =========================
// CATERING PRICE
// =========================

const perPlatePrice =
    Number(localStorage.getItem("perPlatePrice")) || 0;

const members =
    Number(customerData.members) || 0;

const cateringTotal =
    perPlatePrice * members;

document.getElementById("perPlatePrice").textContent =
    formatMoney(perPlatePrice);

document.getElementById("priceMembers").textContent =
    members;

document.getElementById("cateringTotal").textContent =
    formatMoney(cateringTotal);

document.getElementById("summaryCatering").textContent =
    formatMoney(cateringTotal);


// =========================
// EXTRA CHARGES
// =========================

const extraFields = [
    "extraSalad",
    "extraMocktail",
    "extraTea",
    "extraCoffee",
    "extraSweets"
];


// Load saved extra amounts

extraFields.forEach(id => {

    const input = document.getElementById(id);

    input.value =
        localStorage.getItem(id) || "";

    input.addEventListener("input", calculateBill);

});


// =========================
// CURRENCY FORMAT
// =========================

function formatMoney(amount) {

    return "₹" + amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

}


// =========================
// CALCULATE BILL
// =========================

function calculateBill() {

    let extrasTotal = 0;

    extraFields.forEach(id => {

        const input = document.getElementById(id);

        let amount = Number(input.value) || 0;

        if (amount < 0) {
            amount = 0;
            input.value = 0;
        }

        extrasTotal += amount;

        localStorage.setItem(id, input.value);

    });


    const totalAmount =
        cateringTotal + extrasTotal;

    const advanceAmount =
        totalAmount * 0.20;

    const remainingAmount =
        totalAmount - advanceAmount;


    document.getElementById("extrasTotal").textContent =
        formatMoney(extrasTotal);

    document.getElementById("totalAmount").textContent =
        formatMoney(totalAmount);

    document.getElementById("advanceAmount").textContent =
        formatMoney(advanceAmount);

    document.getElementById("remainingAmount").textContent =
        formatMoney(remainingAmount);

}


// Initial calculation

calculateBill();


// =========================
// SAVE BILL AS IMAGE
// =========================

document.getElementById("saveImageBtn").addEventListener(
    "click",
    async function () {

        if (typeof html2canvas === "undefined") {
            alert("Image saving library load nahi hui. Internet connection check karo.");
            return;
        }

        const bill = document.querySelector(".bill-card");

        try {

            const canvas = await html2canvas(bill, {
                scale: 2,
                backgroundColor: "#ffffff",
                useCORS: true
            });

            const link = document.createElement("a");

            link.download =
                "Saraswati-Catering-" + billNumber + ".png";

            link.href = canvas.toDataURL("image/png");

            link.click();

        } catch (error) {

            console.error(error);
            alert("Bill image save nahi ho payi. Dobara try karo.");

        }

    }
);
