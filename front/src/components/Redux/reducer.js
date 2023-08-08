
const initialState = {
myFavorites: [],
allCharacters: []
}
const reducer = (state = initialState, {type, payload}) => {
switch(type) {
    case 'ADD_FAV':
        return {
            ...state,
            myFavorites: [...state.allCharacters, payload],
            allCharacters: [...state.allCharacters, payload]
        }
    case 'REMOVE_FAV':
        return {
            ...state,
            myFavorites: state.myFavorites.filter(character => character.id !== Number(payload)),
            allCharacters: state.allCharacters.filter(character => character.id !== Number(payload))
        }
    case 'FILTER':
        return {
            ...state,
            myFavorites:
            payload === 'AllCharacters'
            ? [...state.allCharacters]
            : state.allCharacters.filter(character => character.gender === payload)
        }
    case 'ORDER':
        const copyAllCharacters = [...state.allCharacters]
        return {
            ...state,
            myFavorites:
            payload === 'A'?
            copyAllCharacters.sort((a,b) => a.id - b.id)
            : copyAllCharacters.sort((a, b) => b.id - a.id)
        }
    default:
        return {...state}
}
}

export default reducer;