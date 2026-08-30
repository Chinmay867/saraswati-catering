function selectEvent(card, eventName) {

    document.querySelectorAll(".event-card").forEach(function(item){
        item.classList.remove("selected");
    });

    card.classList.add("selected");

    document.getElementById("eventType").value = eventName;
}