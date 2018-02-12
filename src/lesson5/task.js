const classes = {
  hero: {
    warrior: {
      charClass: 'Warrior',
      life: 30,
      damage: 4,
    },
    rogue: {
      charClass: 'Rogue',
      life: 25,
      damage: 3,
    },
    sorcerer: {
      charClass: 'Sorcerer',
      life: 20,
      damage: 5,
    },
  },
  monster: {
    zombie: {
      charClass: 'Zombie',
      life: 8,
      damage: 4,
    },
    skeleton: {
      charClass: 'Skeleton',
      life: 10,
      damage: 6,
    },
    holem: {
      charClass: 'Holem',
      life: 15,
      damage: 6,
    },
  },
};

const Char = function (kind, cls) {
  if (kind in classes) {
    if (cls in classes[kind]) {
      Object.entries(classes[kind][cls]).forEach(([prop, value]) => { this[prop] = value; });
    } else {
      throw new Error('Incorrect character class provided');
    }
  } else {
    throw new Error('Incorrect character kind');
  }
};

Char.prototype.getCharClass = function () { return this.charClass; };
Char.prototype.getName = function () {
  return `I am ${this.charClass} I don\`t have name`;
};
Char.prototype.attack = function (target) {
  target.life = this.damage >= target.life ? 0 : target.life - this.damage;
  const msg = target.life ? `done ${this.damage} damage to ${target.charClass}` : `${target.charClass} killed`; // eslint-disable-line max-len
  return `${this.constructor.name} attacked, ${msg}`;
};


const Hero = function (name, charClass) {
  Char.call(this, 'hero', charClass);
  this.name = name;
};

Hero.prototype = Object.create(Char.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.getName = function () { return this.name; };

Hero.prototype.attack = function (target) {
  if (target instanceof Monster) { // eslint-disable-line no-use-before-define
    return Char.prototype.attack.call(this, target);
  }
  return 'I will attack only monsters';
};

// Monster
const Monster = function (charClass) { // eslint-disable-line func-names
  Char.call(this, 'monster', charClass);
};

Monster.prototype = Object.create(Char.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.attack = function (target) {
  if (target instanceof Hero) {
    return Char.prototype.attack.call(this, target);
  }
  return 'I will attack only Hero';
};


/* Game Population mechanism should go below */
const Game = function () {
  this.status = 'Idle';
  this.hero = undefined;
  this.monsters = [];
  this.maxNumberOfMonsters = 2;
};

Game.prototype.beginJourney = function () {
  if (!this.hero || this.monsters.length !== this.maxNumberOfMonsters) {
    throw new Error('Cannot start journey, populate the world with hero and monsters first');
  }
  this.status = 'In progress';
  return 'Your journey has started, fight monsters';
};

Game.prototype.finishJourney = function () {
  if (this.hero.life && this.monsters.filter(monster => Boolean(monster.life)).length > 0) {
    return 'Don`t stop. Some monsters are still alive. Kill`em all';
  }
  this.status = 'Finished';
  if (!this.hero.life) {
    return 'The Game is finished. Hero is dead :(';
  }
  return 'The Game is finished. Monsters are dead. Congratulations';
};

Game.prototype.addHero = function (hero) {
  if (hero instanceof Hero) {
    if (!this.hero) {
      this.hero = hero;
    } else {
      throw new Error('Only one hero can exist');
    }
  } else {
    throw new Error('Only hero instance can be hero');
  }
};

Game.prototype.addMonster = function (monster) {
  if (monster instanceof Monster) {
    if (this.monsters.length !== this.maxNumberOfMonsters) {
      this.monsters.push(monster);
    } else {
      throw new Error(`Only ${this.maxNumberOfMonsters} monsters can exist`);
    }
  } else {
    throw new Error('Only monster Instances can become monsters');
  }
};

Game.prototype.fight = function () {
  if (this.status !== 'In progress') { throw new Error('Begin your journey to start fighting monsters'); }
  let heroAttack = true;
  const currentMonster = this.monsters.filter(monster => Boolean(monster.life))[0];
  if (this.hero.life && currentMonster) {
    while (this.hero.life && currentMonster.life) {
      if (heroAttack) {
        this.hero.attack(currentMonster);
      } else {
        currentMonster.attack(this.hero);
      }
      heroAttack = !heroAttack;
    }
    if (this.hero.life) {
      return 'Hero wins';
    }
    return 'Monster win';
  }
  throw new Error('Nobody to fight with...');
};

/* End of your solution for Game Population mechanism */

export default {
  Game,
  Hero,
  Monster,
};
