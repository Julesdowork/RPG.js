function Spell(name, cost, dmg, type) {
  this.name = name;
  this.cost = cost;
  this.dmg = dmg;
  this.type = type;

  this.generateDamage = () => {
    let dmg_l = this.dmg - 15;
    let dmg_h = this.dmg + 15;
    return Math.floor(Math.random() * dmg_h) + dmg_l;
  }
}