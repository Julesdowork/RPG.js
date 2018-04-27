function Person(name, hp, mp, atk, def, spells, items) {
    this.name = name;
    this.max_hp = hp;
    this.hp = hp;
    this.max_mp = mp;
    this.mp = mp;
    this.atk_l = (atk - 10) > 1 ? atk - 10 : 1;
    this.atk_h = atk + 10;
    this.def = def;
    this.status = "";
    this.actions = ["Attack", "Magic", "Items", "Run Away"];
    this.spells = spells;
    this.items = items;

    this.generateDamage = function() {
        return Math.floor(Math.random() * (this.atk_h - this.atk_l + 1)) + this.atk_l;
    }

    this.takeDamage = function(dmg) {
        this.hp -= dmg;
        if (this.hp <= 0) {
          this.die();
        }
        return this.hp;
    }

    this.heal = function(health) {
        this.hp += health;
        if (this.hp > this.max_hp) { this.hp = this.max_hp; }
        return this.hp;
    }

    this.reduceMp = function(cost) {
        this.mp -= cost;
        if (this.mp < 0) { this.mp = 0; }
        return this.mp;
    }

    this.restoreMp = function(mana) {
        this.mp += mana;
        if (this.mp > this.max_mp) { this.mp = this.max_mp; }
        return this.mp;
    }

    this.isDead = function() {
        return this.status === "dead";
    }

    this.die = function() {
      this.status = "dead";
      return `${this.name} has died!`
    }

    this.chooseAction = function() {
        console.log(`What will ${this.name} do?`);
        this.actions.forEach((action, i) => {
            console.log(`${i + 1}: ${action}`);
        });
    }

    this.chooseSpell = function() {
      console.log(`What will ${this.name} cast?`);
      this.spells.forEach((spell, i) => {
          console.log(`${i + 1}: ${spell.name} (cost: ${spell.cost})`);
      });
      let choice = Number(prompt("Choose a spell")) - 1;
      return choice;
    }

    this.chooseItem = function() {
      console.log(`What will ${this.name} use?`);
      this.items.forEach((item, i) => {
          console.log(`${i + 1}: ${item.item.name} (${item.item.desc}) [x${item.quantity}]`);
      });
      let choice = Number(prompt("Choose an item")) - 1;
      return choice;
    }

    this.chooseTarget = function(targets) {
        targets.forEach((target, i) => {
            console.log(`${i + 1}: ${target.name}`);
        });
        let choice = Number(prompt("Choose a target")) - 1;
        return choice;
    }
}