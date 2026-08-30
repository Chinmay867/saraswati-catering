// =========================
// CUSTOMER FORM
// =========================

const customerForm = document.getElementById("customerForm");


// =========================
// EVENT TYPE SELECT
// =========================

const eventOptions =
    document.querySelectorAll(".event-option");

const eventType =
    document.getElementById("eventType");


eventOptions.forEach(option => {

    option.addEventListener("click", function () {

        // Sabko unselect karo
        eventOptions.forEach(item => {
            item.classList.remove("selected");
        });

        // Current option select
        this.classList.add("selected");

        // Selected event save
        eventType.value = this.dataset.event;

    });

});


// =========================
// FORM SUBMIT
// =========================

customerForm.addEventListener("submit", function(event){

    event.preventDefault();


    // Event Type check
    if(eventType.value === ""){

        alert("Please select Event Type");

        return;

    }


    // Customer Details
    const customerData = {

        name:
            document.getElementById("customerName").value.trim(),

        mobile:
            document.getElementById("mobile").value.trim(),

        eventType:
            eventType.value,

        eventDate:
            document.getElementById("eventDate").value,

        members:
            document.getElementById("members").value,

        address:
            document.getElementById("address").value.trim()

    };


    // Save Customer Details
    localStorage.setItem(
        "customerData",
        JSON.stringify(customerData)
    );


    // Continue → Menu
    window.location.href = "selected.html";

});