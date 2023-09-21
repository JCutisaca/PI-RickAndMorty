import axios from "axios"

export const addFav = (character) => {
    const endpoint = '/rickandmorty/fav';
    return async (dispatch) => {
      try {
         const {data} = await axios.post(endpoint, character)
         if(!data.length) throw Error('No hay favoritos')
         return dispatch({
               type: 'ADD_FAV',
               payload: data,
            });
      } catch (error) {
         console.log(error);
      }
    };
 };
 export const removeFav = (id) => {
    const endpoint = '/rickandmorty/fav/' + id;
    return async (dispatch) => {
      try {
         const {data} = await axios.delete(endpoint)
         if(data.length < 0) throw Error('No hay favoritos')
         return dispatch({
               type: 'REMOVE_FAV',
               payload: data,
         });
      } catch (error) {
         console.log(error);
      }
    };
 };
export const filterCards = (gender) => {
return {type: 'FILTER', payload: gender}
}
export const orderCards = (orden) => {
return {type: 'ORDER', payload: orden}
}