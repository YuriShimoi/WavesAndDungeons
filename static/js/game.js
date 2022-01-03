function updateStatus() {
    updateElement("status-health", {text:` [${player.ship.health}/${player.ship.maxHealth}]`}, false);
    updateElement("status-health-bar", {value:player.ship.health, max:player.ship.maxHealth}, false);
    updateElement("status-crew", {text:` [${player.ship.crew}]`}, false);
    updateElement("status-food", {text:` [${player.food}]`}, false);
    updateElement("status-wood", {text:` [${player.wood}]`}, false);
    updateElement("status-gold", {text:` [${player.gold}]`});
}

function updateMap(mapping) {
    updateElement("minimap", {text: mapping});
}

