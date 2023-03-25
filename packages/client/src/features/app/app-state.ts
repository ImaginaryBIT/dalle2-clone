import {createAction, createReducer} from '@reduxjs/toolkit';

interface AppState {
  mounted: boolean;
}

const initialState: AppState = {
  mounted: false,
};

export const appMounted = createAction('app/mounted');

export const appReducer = createReducer(initialState, builder => {
  builder.addCase(appMounted, state => {
    state.mounted = true;
  });
});
