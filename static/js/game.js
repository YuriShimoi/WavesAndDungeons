function updateStatus() {
    updateElement("status-health", {text:` [${player.ship.health}/${player.ship.maxHealth}]`}, false);
    updateElement("status-health-bar", {value:player.ship.health, max:player.ship.maxHealth}, false);
    updateElement("status-crew", {text:` [${player.ship.crew}]`}, false);
    updateElement("status-food", {text:` [${player.food}]`}, false);
    updateElement("status-wood", {text:` [${player.wood}]`}, false);
    updateElement("status-gold", {text:` [${player.gold}]`});
}

function updateMinimap(mapping) {
    let textMap = new Array(mapping.length * mapping[0].length).fill(`[${WHITESPACE}]`).join('');
    updateElement("minimap", {text: textMap});
}

function updateMapView(mapping) {
    let textMap = "";
    for(let y=0; y < mapping.length; y++) {
        for(let x=0; x < mapping[y].length; x++) {
            textMap += mapping[y][x] == 1? '██': WHITESPACE+WHITESPACE;
        }
    }

    updateElement("islandView", {text: textMap});
}