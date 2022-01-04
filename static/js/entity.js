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
class NPCShip extends Ship {
    _treasure = null;
    constructor(type, level) {
        super(type, level);
    }
}

class City {
    _treasure  = null;
    _merchants = [];
    constructor(level) {
        this.level = level;
    }
}

class Island {
    static _mapSize = { 'x':50, 'y':25 };

    _treasures = [];
    _villages  = [];
    constructor(size) {
        this.size = size > 8? 8: size;
        this.mapping = this._generateMap();
    }

    _generateMap() {
        let radius = Math.ceil(this.size/2 * 3);

        let spreadAmount  = 70;
        let islandMapping = new Array(Island._mapSize.y).fill('').map(_ => new Array(Island._mapSize.x).fill(0));

        // circles
        if(radius <= 5) {
            islandMapping = this._fillCircleMap(islandMapping, Island._mapSize.x/2, Island._mapSize.y/2, radius);
        }
        else {
            let circleRadius = Math.ceil(radius/1.7);
            spreadAmount += circleRadius*20;
            islandMapping = this._fillCircleMap(islandMapping, (Island._mapSize.x/2)-(radius/1.3), Island._mapSize.y/2, circleRadius);
            islandMapping = this._fillCircleMap(islandMapping, (Island._mapSize.x/2)+(radius/1.3), Island._mapSize.y/2, circleRadius);
            
            // extra noise
            islandMapping = this._spreadNoiseMap(islandMapping, radius*2+8, radius*2+40, spreadAmount/4, 0);

            if(circleRadius > 5) {
                // extra center circle
                islandMapping = this._fillCircleMap(islandMapping, Island._mapSize.x/2, Island._mapSize.y/2, Math.ceil(circleRadius/1.8));
                // extra noise
                islandMapping = this._spreadNoiseMap(islandMapping, radius*2+8, radius*2+20, spreadAmount/4, 0);
            }
        }

        // noise
        islandMapping = this._spreadNoiseMap(islandMapping, radius*2+8, radius*2+40, spreadAmount);
        islandMapping = this._spreadNoiseMap(islandMapping, radius*2+5, radius*2+15, (spreadAmount*0.7));

        // counter noise
        if(radius > 5) {
            islandMapping = this._spreadNoiseMap(islandMapping, radius*2+8, radius*2+40, spreadAmount/3, 0);
            if(radius > 8) {
                islandMapping = this._spreadNoiseMap(islandMapping, radius*2+8, radius*2+20, spreadAmount/3, 0);
            }
        }

        // smooth
        islandMapping = this._mapSmoother(islandMapping, ['1', '0'], ['0']);
        for(let s=0; s < 3; s++){
            islandMapping = this._mapSmoother(islandMapping, ['1', '0']);
        }
        return islandMapping;
    }

    _fillCircleMap(islandMapping, x, y, radius) {
        for(let py=parseInt(y-radius); py <= y+radius; py++) {
            if(py < 0 || py >= Island._mapSize.y) continue;
            for(let px=parseInt(x-radius); px <= x+radius; px++) {
                if(px < 0 || px >= Island._mapSize.x) continue;
                if(Math.sqrt((px-x)**2 + (py-y)**2) <= radius + 0.3)
                    islandMapping[py][px] = 1;
            }
        }

        return islandMapping;
    }

    _spreadNoiseMap(islandMapping, width, height, spreadAmount=50, spreadValue=1) {
        let rndi    = 0;
        let limiter = 0;

        while(rndi < spreadAmount || limiter >= 1000) {
            let rndy = Math.floor(Math.random() *  width) + parseInt(Island._mapSize.y/2 -  width/2);
            let rndx = Math.floor(Math.random() * height) + parseInt(Island._mapSize.x/2 - height/2);
            if((rndy <= 0 || rndy >= Island._mapSize.y-1) || (rndx <= 0 || rndx >= Island._mapSize.x-1)) continue;
            limiter++;
            if(islandMapping[rndy][rndx] != spreadValue) {
                islandMapping[rndy][rndx] = spreadValue;
                rndi++;
            }
        }

        return islandMapping;
    }

    _mapSmoother(map, types, ignore=[]){
        for(let x in map){
            for(let y in map[x]){
                x = parseInt(x);
                y = parseInt(y);
                let freq      = this._area_frequency(map, {'x':x, 'y':y}, types);
                let most      = '';
                let freq_most = -1;
                for(let f in freq){
                    if(freq[f] > freq_most) {
                        most      = f;
                        freq_most = freq[f];
                    }
                }
                if(!ignore.includes(String(most))) map[x][y] = most;
            }
        }
    
        return map;
    }

    _area_frequency(map, pos, types){
        let freq  = {};
        types.forEach(t => freq[t] = 0);
    
        for(let x = pos.x-1; x <= pos.x+1; x++){
            if(x >= 0 && x < map.length){
                for(let y = pos.y-1; y <= pos.y+1; y++){
                    if(y >= 0 && y < map[x].length){
                        freq[map[x][y]]++;
                    }
                }
            }
        }
    
        return freq;
    }
}

class Treasure {
    constructor() {

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

class Creature {
    constructor() {
        
    }
}
class SeaCreature extends Creature {
    constructor() {

    }
}

class Dungeon {
    constructor() {

    }
}
class SeaDungeon extends Dungeon {
    constructor() {
        
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