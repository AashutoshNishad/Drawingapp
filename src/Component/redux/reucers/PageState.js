import { createSlice } from "@reduxjs/toolkit";

const initialState = {undo: false , redu: false}

var PageState = createSlice({
    name: "Pagestate",
    initialState,
    reducers: {
        undo(state , action){
            return {...state , undo: action.payload , }
        },
        redu(state , action){
            return {...state , redo: action.payload , }
        }
    }
})


export const {undo , redu} = PageState.actions;

export default PageState.reducer;