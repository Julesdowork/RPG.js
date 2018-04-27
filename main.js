// Black magic
fire = new Spell("Fire", 10, 60, "black");
thunder = new Spell("Thunder", 10, 60, "black");
blizzard = new Spell("Blizzard", 10, 60, "black");
meteor = new Spell("Meteor", 20, 120, "black")
quake = new Spell("Quake", 14, 85, "black")

// White Magic
cure = new Spell("Cure", 12, 30, "white");
cura = new Spell("Cura", 18, 100, "white");

// Some items
potion = new Item("Potion", "potion", "Heals 50 HP", 50);
hiPotion = new Item("High Potion", "potion", "Heals 150 HP", 150);
superPotion = new Item("Super Potion", "potion", "Heals 500 HP", 500);
elixir = new Item("Elixir", "elixir", "Fully restores HP/MP of one party member", 0);
hiElixir = new Item("High Elixir", "elixir", "Fully restores HP/MP of entire party", 0);
grenade = new Item("Grenade", "weapon", "Deals 500 damage", 500);

// Player data
playerSpells = [fire, thunder, blizzard, meteor, cure, cura];
playerItems = [
    { item: potion, quantity: 15 },
    { item: superPotion, quantity: 1},
    { item: elixir, quantity: 5},
    { item: hiElixir, quantity: 1 },
    { item: grenade, quantity: 3 }
];
player1 = new Person("Valos", 20, 20, 15, 15, playerSpells, playerItems);
player2 = new Person("Nack", 20, 20, 15, 15, playerSpells, playerItems);
player3 = new Person("Cyb", 20, 20, 15, 15, playerSpells, playerItems);
players = [player1, player2, player3];

// Enemy data
enemySpells = [fire, cure];
enemyItems = [
    { item: potion, quantity: 15 },
    { item: grenade, quantity: 3 }
];
enemy1 = new Person("Goblin", 50, 20, 1, 1, enemySpells, []);
enemy2 = new Person("Goblin", 50, 20, 1, 1, enemySpells, []);
boss = new Person("Troll", 150, 30, 1, 1, enemySpells, enemyItems);
enemies = [enemy1, enemy2, boss];

let inBattle = true;
turn = 1;

function isBattleOver() {
    if (enemies.length === 0) {
        console.log("You won!");
        inBattle = false;
        return true;
    } else if (players.length === 0) {
        console.log("You lost...");
        inBattle = false;
        return true;
    } else {
        return false;
    }
}

// console.log(player);
// console.log(fire);
// console.log(potion);
// console.log(playerItems);
console.log("AN ENEMY ATTACKS!");
(function battle() {
    do
    {
        console.log("==========Turn " + turn + "===========");

        // Player attack phase
        players.forEach((player) => {
            player.chooseAction();
            let actionChoice = Number(prompt("Choose an action"));

            if (actionChoice === 1) {
                let targetChoice = player.chooseTarget(enemies);
                let target = enemies[targetChoice];
                let damage = player.generateDamage();
                console.log(`${player.name} deals ${damage} damage to ${target.name}`);
                target.takeDamage(damage);
                if (target.isDead()) {
                    enemies.splice(targetChoice, 1);
                }
            } else if (actionChoice === 2) {
                let spellChoice = player.chooseSpell();
                console.log(spellChoice);
                spell = player.spells[spellChoice];
                let targetChoice = player.chooseTarget(enemies);
                let target = enemies[targetChoice];
                let damage = spell.generateDamage();
                player.reduceMp(spell.cost);
                console.log(`${player.name} cast ${spell.name}.\nIt deals ${damage} damage to ${target.name}`);
                target.takeDamage(damage);
                if (target.isDead()) {
                    enemies.splice(targetChoice, 1);
                }
            } else if (actionChoice === 3) {
                let itemChoice = player.chooseItem();
                item = player.items[itemChoice].item;
                itemQty = player.items[itemChoice].quantity;
                console.log(item);
                console.log(itemQty);
                player.items[itemChoice].quantity--;

                if (item.type === "potion") {
                    player.heal(item.prop);
                    console.log(`${player.name} uses ${item.name}.\nIt heals ${item.prop} health`);
                }
            }

            if (isBattleOver()) { return; }
        });

        console.log("Enemies Turn");

        // Enemy attack phase
        enemies.forEach((enemy) => {

            let targetChoice = Math.floor(Math.random() * players.length);
            let target = players[targetChoice];
            let damage = enemy.generateDamage();
            console.log(`${enemy.name} deals ${damage} damage to ${target.name}`);
            target.takeDamage(damage);
            if (target.isDead()) {
                players.splice(targetChoice, 1);
            }

            if (isBattleOver()) { return; }
        });

        turn += 1;
    } while (inBattle);
    
})();