
export type RootState = {
    myFavorites: any[];
    allCharacters: any[];
    userId: any[];
  };
  
const initialState = {
    myFavorites: [],
    allCharacters: [],
    userId: []
}

interface State {
    myFavorites: any[];
    allCharacters: any[];
    userId: any[];
  }

export let filterCharacters = "";
export let orderCharacters = "";

const reducer = (state: State = initialState, { type, payload }: {type: string, payload: any}) => {
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
        case 'LOGIN':
            return {
                ...state,
                userId: payload
            }
        case 'LOGOUT':
            return {
                ...state,
                userId: []
            }
        default:
            return { ...state }
    }
}

export default reducer;