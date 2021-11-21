var button = document.querySelector("button");

// Get reference to unordered list
var img = document.querySelector("img");

let pokemon = [];
let randomPoke;

function getData() {
  pokemon = [];
  randomPoke = null;
  getFourUniqueRandomNumbers().forEach((number) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .then((response) => response.json())
      .then((data) => storePokemon(data));
  });
}

function getFourUniqueRandomNumbers() {
  let numbers = [];
  while (numbers.length < 4) {
    let number = Math.floor(Math.random() * 898) + 1;
    numbers.includes(number);
    numbers.push(number);
  }
  return numbers;
}

function storePokemon(p) {
  pokemon.push(p);

  if (pokemon.length === 4) {
    start();
  }
}

function start() {
  //make who's that pokemon img
  whosThatPokemon();
  //make mc options
  multipleChoice();
}
function whosThatPokemon() {
  randomPoke = pokemon[Math.floor(Math.random() * 4)];
  document.querySelector("#wtp-sprite").src = randomPoke.sprites.front_default;
}
function multipleChoice() {}

// Define the instructions
button.addEventListener("click", getData);

getData();
