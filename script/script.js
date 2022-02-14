let pokemonsArray = [];
let promise = axios.get("https://unpkg.com/pokemons@1.1.0/pokemons.json");
  
promise.then(getPokemonsOk);
promise.catch(getPokemonsError);

function getPokemonsOk(promise){
  deleteRepeated(promise.data.results);
}

function deleteRepeated(pokemons){
  let repeated = {};
  pokemons = pokemons.filter(element => repeated[element.national_number] ? false : repeated[element.national_number] = true);
  pokemonsArray = pokemons.slice();
  renderPokemons(pokemons);
}

function getPokemonsError(promise){
  console.log(promise);
}

function renderPokemons(pokemons){

  let mainPokemons = "";
  let main = document.querySelector(".pokemons");
  main.innerHTML = mainPokemons;

  for (let i = 0; i<pokemons.length; i++){

    mainPokemons +=

      `<div class="pokemon ${pokemons[i].national_number} ${pokemons[i].name}">
        <div class="img"><img src="${pokemons[i].sprites.normal}" /></div>
        <small> #${pokemons[i].national_number} </small>
        <span class="hidden" onclick="favorite(this)"><i class="fa-regular fa-star"></i></span>
        <strong> ${pokemons[i].name}</strong>
        <div class="types">
      `
      pokemons[i].type.forEach(pokemonType => { 
        mainPokemons += `  <div class="type ${pokemonType} "> ${pokemonType} </div> `
      });
      
      mainPokemons += `</div> </div>`
  }

  main.innerHTML = mainPokemons;


  let pokemonsList = [...document.querySelectorAll(".pokemon") ];

  pokemonsList.forEach(element => {

    element.addEventListener('mouseover',event => {
      element.querySelector("span").classList.remove("hidden");
    });

    element.addEventListener("mouseout", event => {
      if (!element.querySelector("span").classList.contains("favorite")){
        element.querySelector("span").classList.add("hidden");
      }
      
    });

  })
}

function favorite(pokemon){
  pokemon.classList.add("favorite");
  pokemon.innerHTML=`<i class="fa-solid fa-star"></i>`;
}

function filterPokemon(){

  let search = document.querySelector(".search input").value;

  if (search === ""){
    renderPokemons(pokemonsArray);
    return null;
  }

  let newPokemonsArray = [];

  let search1 = pokemonsArray.findIndex( item => item.national_number === search ); 
  let search2 = pokemonsArray.findIndex( item => item.name === search ); 

    if (search1 !== -1) {
      newPokemonsArray.push(pokemonsArray[search1]);
    }else if (search2 !== -1) {
      newPokemonsArray.push(pokemonsArray[search2]);
    }

    if (search1 !== -1 || search2 !== -1){
      renderPokemons(newPokemonsArray);
    }
  
}

function showFavorites(){

  let favorites = [...document.querySelectorAll(".favorite")];

  favorites.forEach(element => {
    element.parentNode.classList.add("favP");
  });

  let notFav = [...document.querySelectorAll(".pokemon")];

  notFav.forEach(element => {
      if (!element.classList.contains("favP")){
        element.classList.add("hidden");
      } 
  });

}
