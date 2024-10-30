const pokemonName = document.querySelector(".pokemon__name")
const pokemonNumber = document.querySelector(".pokemon__number")
const pokemonImage = document.querySelector(".pokemon__image")
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");


let searchPokemon = 1;


// Conectar e capiturar as informações da pokeapi
const fetchPokemon = async (pokemon) => {
    
    const APiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);


    if (APiResponse.status === 200) {
        
        const data = await APiResponse.json();        
          return data;
    } 

   
};

    const renderPokemon = async (pokemon) => {
        
        pokemonImage.textContent = "https://i.pinimg.com/originals/0a/50/6f/0a506fe0f6c211128cf1ed370655c6a1.gif"
        
        pokemonName.textContent = "loading..."
        pokemonNumber.textContent = '😉'

        const data = await fetchPokemon(pokemon);
        console.log(data)


        if (data) {
            // QUANDO DER TUDO CERTOR OK
            pokemonImage.style.width = "25%"

            pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
    
            pokemonNumber.textContent = data.id;
    
            pokemonName.innerHTML = data.name;   

            input.value = "";

            searchPokemon = data.id;

        } else {

            // QUANDO HOUVER ERRO!
            pokemonNumber.textContent = "";
            pokemonName.textContent = "Not Foud "
            pokemonImage.src = "https://www.theenemy.com.br/webstories/quiz-sabe-tudo-pokemon/assets/2.gif"
            pokemonImage.style.width = "35%"
        }       
}

form.addEventListener("submit", (event) => {
    
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

})

buttonPrev.addEventListener("click", () => {

    if (searchPokemon > 1  ) {

        searchPokemon -= 1;
        
        renderPokemon(searchPokemon)
    }

   
});

buttonNext.addEventListener("click", () => {

    searchPokemon += 1;
    
    renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon);