import axios from 'axios';
import 'react-native-gesture-handler';
import {configureStore, createReducer, createAction} from '@reduxjs/toolkit';
const initialState = {
  data: [],
};
export const getDataAsync = id => async dispatch => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=30db1237b9167f8afaf9e065b90d16b8&query=${id.split(' ')[0]}%20${id.split(' ')[1]}`,
    );
    dispatch(getData(response.data.results));
  } catch (err) {
    throw new Error(err);
  }
};

export const getData = createAction('people/search');
export const getReducer = createReducer(initialState, builder => {
  builder
    .addCase(getData, (state, action) => {
      state.data = action.payload;
    })
});

export const store = configureStore({
  reducer: getReducer,
});
