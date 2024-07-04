const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

const pokemonForm = document.querySelector('.form')
const input = document.querySelector('.input__search')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let searchPokemon= 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIResponse.status == 200){
        const data = await APIResponse.json()
        return data
    }

    
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonImage.src = 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'

    const data = await fetchPokemon(pokemon)
    if (data){
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = ''
        searchPokemon = data.id
    } else {
        pokemonName.innerHTML = 'Not Found'
        pokemonNumber.innerHTML = ''
        pokemonImage.src = 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHJ2eWV2YmV3dnNhZ2RlMjYwc255dWsxa3c3Y2p0aGJieGRqZHc3byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dJYoOVAWf2QkU/giphy.webp'
    }
    
}

pokemonForm.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

btnPrev.addEventListener('click', () => {
   if (searchPokemon > 1) {
    searchPokemon -= 1
    renderPokemon(searchPokemon) 
} 

})

btnNext.addEventListener('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon) 
   })

renderPokemon(searchPokemon)