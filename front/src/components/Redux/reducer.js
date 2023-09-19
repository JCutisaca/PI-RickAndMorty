
const initialState = {
    myFavorites: [],
    allCharacters: []
}

export let filterCharacters = "";
export let orderCharacters = "";

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'ADD_FAV':
            return {
                ...state, myFavorites: payload,
                allCharacters: payload
            };
        case 'REMOVE_FAV':
            return { ...state, myFavorites: payload, allCharacters: payload };
        case 'FILTER':
            filterCharacters = payload;
            return {
                ...state,
                myFavorites:
                    payload === 'AllCharacters'
                        ? [...state.allCharacters]
                        : state.allCharacters.filter(character => character.gender === payload)
            }
        case 'ORDER':
            orderCharacters = payload;
            const copyAllCharacters = [...state.allCharacters];
            let sortedCharacters;
            if (payload === 'AId') {
                sortedCharacters = copyAllCharacters.sort((a, b) => a.id - b.id);
            }
            if (payload === 'DId') {
                sortedCharacters = copyAllCharacters.sort((a, b) => b.id - a.id);
            }
            if (payload === 'A') {
                sortedCharacters = copyAllCharacters.sort((a, b) => a.name.localeCompare(b.name));
            }
            if (payload === 'D') {
                sortedCharacters = copyAllCharacters.sort((a, b) => b.name.localeCompare(a.name));
            }
            return {
                ...state,
                myFavorites: sortedCharacters,
            };

        default:
            return { ...state }
    }
}

export default reducer;