const playerHull = document.querySelector('#playerHull');
const enemyHull = document.querySelector('#enemyHull');
const enemyFirepower = document.querySelector('#enemyFirepower');
const enemyAccuracy = document.querySelector('#enemyAccuracy');

// class Spaceship to create player and alien spaceship objects
class Spaceship {
  constructor(type, hull, firepower, accuracy) {
    this.type = type;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
  // async method to attack enemy
  async attack(enemy) {
    if (Math.random() < this.accuracy) {
      enemy.hull -= this.firepower;
      await timeout(1500) //timeout to slow down the console and achieve smoother gameplay
      console.log(`+${this.firepower} Damage`);
    } else {
      await timeout(1500)
      console.log('Miss');
    }
  }
}

// async function for a round
const round = async (player, alien) => {
  while(player.hull > 0 && alien.hull > 0) {
    updateDOM(player, alien); //updating DOM to reflect stats of the player and alien spaceships
    await timeout(1500)
    console.log(`Attack!`);
    await player.attack(alien);
    updateDOM(player, alien);
    if (alien.hull > 0) {
      await timeout(1500)
      console.log('Alien attack!');
      alien.attack(player);
      await timeout(1500);
      updateDOM(player, alien);
    }
  }
  await timeout(1500);
};

// human spaceship
const player = new Spaceship('human', 20, 5, 0.7);

//array of alien spaceship parameters
const alienHull = [3, 4, 5, 6];
const alienFirepower = [2, 3, 4];
const alienAccuracy = [0.6, 0.7, 0.8];

// randomizer
const random = array => Math.floor(Math.random() * array.length);

//function to create random alien from array of parameters
const randomAlien = () => {
  let alien = new Spaceship('alien', alienHull[random(alienHull)], alienFirepower[random(alienFirepower)], alienAccuracy[random(alienAccuracy)]);
  return alien;
}

//function to update stats
const updateDOM = (player, enemy) => {
  playerHull.innerHTML = player.hull;
  enemyHull.innerHTML = enemy.hull;
  enemyFirepower.innerHTML = enemy.firepower;
  enemyAccuracy.innerHTML = enemy.accuracy;
}

// async game function with rounds parameter
const game = async (rounds) => {
  let i = 1; //rounds counter
  for (i; i <= rounds; i++) {
    await timeout(1500)
    console.log(`Round ${i}`); //declaring round
    await round(player, randomAlien()); //awaiting for round results
    if (player.hull > 0) { //check if human spaceship has not been destroyed
      console.log('Alien Spaceship destroyed!');
      if (i === rounds) { //check if rounds played is equal to rounds argument
        console.log('You won!');
        break; //breaking the loop
      }
    } else { //if human spaceship has been destroyed
      console.log('You lost!');
      break;
    }
    await timeout(1500);
    let attack = prompt('Attack [1] or Retreat [2]?', 1) //prompt to continue. Located at the end of function to run first round by default
    if (attack != 1) { //checking input
      console.log('GAME OVER!');
      break;
    }
  }
}

// timeout promise to slow down the game returns an empty promise
function timeout (ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms);
  })
}

// running the game
game(6);
