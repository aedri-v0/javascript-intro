var button = document.querySelector("button");

var submit = document.querySelector("#Submit");

var reset = document.querySelector("#reset");
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
  //creates radio buttons with options
  makeRadioButtons();
}
function whosThatPokemon() {
  randomPoke = pokemon[Math.floor(Math.random() * 4)];
  //document.querySelector("#wtp-sprite").src = randomPoke.sprites.front_default;
  document.querySelector(
    "#wtp-sprite"
  ).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomPoke.id}.png`;
}
function multipleChoice() {}

function makeRadioButtons() {
  let labels = document.querySelectorAll("label");

  for (let i = 0; i < labels.length; i++) {
    console.log(labels[i]);
    labels[i].innerText = pokemon[i].name;
  }

  // pokemon.forEach((pokemon) => {
  //   let div = document.createElement("div");
  //   div.innerHTML += `<label>${pokemon.name}</label>`;
  //   div.innerHTML += `<input type="radio" value="${pokemon.name}" />`
  //   document.body.appendChild(div);
  // });
}

function checkCorrect() {
  // get value from button that is currently selected
  let choice = document.querySelector("input[type=radio]:checked");
  if (!choice) return;
  choice = parseInt(choice.value);
  if (pokemon[choice].id === randomPoke.id) {
    document.getElementById("win").classList.add("active");
    document.getElementById("lose").classList.remove("active");
    document.getElementById("reset").classList.add("active");
    document.getElementById("wtp-sprite").classList.add("solved");
  } else {
    document.getElementById("lose").classList.add("active");
    document.getElementById("win").classList.remove("active");
    document.getElementById("reset").classList.add("active");
    document.getElementById("wtp-sprite").classList.add("solved");
  }
}

function restart() {
  location.reload();
}

// Define the instructions

submit.addEventListener("click", checkCorrect);

reset.addEventListener("click", restart);

getData();
