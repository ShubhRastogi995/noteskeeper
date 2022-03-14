import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import {userLoginReducer, userSignupReducer, userupdateReducer} from './reducers/userReducers'
import {
  noteshowreducer,
  notecreatereducer,
  noteeditreducer,
  notedeletereducer,
} from "./reducers/notesreducers";

const reducers = combineReducers({
  userLoginReducer,
  userSignupReducer,
  noteshowreducer,
  notecreatereducer,
  noteeditreducer,
  notedeletereducer,
  userupdateReducer,
});

const userInfofromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
  userLoginReducer: {userInfo: userInfofromStorage}
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;