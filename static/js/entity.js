class Ship {
    constructor(type, level=1, crew=null) {
        this.type = type.toLowerCase();
        this.level = level;
        this.crew  = crew?? this.calcCrew();

        this.health    = this.calcHealth();
        this.maxHealth = this.health;
    }

    calcHealth() {
        let healthBonus = this.type == "adventurous"? 4: 0;
        return 100 + (this.level * (20 + healthBonus));
    }
    calcCrew() {
        let crewBonus = this.type == "adventurous"? -3: 0;
        return this.level * (15 + crewBonus);
    }
    damage() {
        let damageBonus = this.type == "pirate"? 0.2: 0;
        return this.crew * (1 + (this.level / 5) + damageBonus);
    }
}


class NPCShip {
    _treasure = null;
    constructor(type, level) {
        this.ship = new Ship(type, level);
    }
}


class Island {
    _treasures = [];
    _villages  = [];
    constructor(size) {
        this.size = size;
    }
}


class Treasure {
    constructor() {

    }
}


class Village {
    _treasure  = null;
    _merchants = [];
    constructor(level) {
        this.level = level;
    }
}


class NPCMerchant {
    _selling = [];
    _buying  = [];
    constructor(type) {
        this.type = type.toLowerCase();
        this.initializeShop();
    }

    initializeShop() {

    }
}


class Player {
    constructor(type) {
        this.type = type.toLowerCase();
        this.initializeStatus();
    }

    initializeStatus() {
        switch(this.type.toLowerCase()) {
            case "adventurous":
                this.ship = new Ship(this.type, 1);
                this.gold =   0;
                this.food = 200;
                this.wood = 100;
                break;
            case "pirate":
                this.ship = new Ship(this.type, 3);
                this.gold = 100;
                this.food = 300;
                this.wood = 100;
                break;
            case "merchant":
                this.ship = new Ship(this.type, 1);
                this.gold = 200;
                this.food = 500;
                this.wood = 200;
                break;
        }
    }
}