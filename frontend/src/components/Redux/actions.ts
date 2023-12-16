import axios from "axios"
import { ThunkAction } from "redux-thunk";
import { RootState } from "./reducer";
import { Dispatch } from "redux";

export const addFav = (character: {userId: number; id: number; name: string; status: string; species: string; gender: string; origin: { name: string; }; image: string; }) => {
  const endpoint = '/rickAndMorty/fav/';
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await axios.post(endpoint, character)
      
      if (!data.favorites) throw Error('Favorites not found')
      return dispatch({
        type: 'ADD_FAV',
        payload: data.favorites,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

interface dispatchType {
  type: string;
  payload: any;
}


export const removeFav = (character: {id: string | number, userId: number}) => {
  const endpoint = '/rickAndMorty/delete/';
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await axios.post(endpoint, character)
      if (data.length < 0) throw Error('Favorites not found')
      return dispatch({
        type: 'REMOVE_FAV',
        payload: data.favorites,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllFavsByUserId = (userId: number): ThunkAction<void, RootState, unknown, dispatchType> => {
  const endpoint = '/rickAndMorty/fav/' + userId + "/";
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint)
      if (data.length < 0) throw Error('Favorites not found.')
      return dispatch({
        type: 'REMOVE_FAV',
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginUser = (userId: number) => {
  return { type: 'LOGIN', payload: userId}
}
export const logoutUser = () => {
  return { type: 'LOGOUT', payload: []}
}


export const filterCards = (gender: string) => {
  return { type: 'FILTER', payload: gender }
}
export const orderCards = (orden: string) => {
  return { type: 'ORDER', payload: orden }
}