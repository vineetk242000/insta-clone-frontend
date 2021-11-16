import * as actionTypes from '../actionTypes/toastify';
import { updateObject } from '../utility';

const initialState = {
    open:false,
    msg:null,
    type:null
}

const toastifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TOASTIFY:
            return updateObject(state, {
                open:action.payload.open,
                msg:action.payload.msg,
                type:action.payload.type
            })
        case actionTypes.CLOSE_TOASTIFY:
            return updateObject(state, {
                open:false,
                msg:'',
                type:''
            })
        default:
            return state
    }

}


export default toastifyReducer