import axios from 'axios';
import { USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGIN_REQUEST, USER_LOGOUT,
     USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS,
     USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userconstants";

export const login = (email, password) => async(dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({type: USER_LOGIN_FAIL, payload:
       error.response && error.response.message.data ?
        error.response.message.data : error.message
    });
      
    }
};


export const userlogout = () => async(dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({type: USER_LOGOUT})
}


export const register = (username, email, password, profpic) => async(dispatch) => {
     try {
        dispatch({type: USER_SIGNUP_REQUEST})
       const config = {
         headers: {
           "Content-type": "application/json",
         },
       };
       const { data } = await axios.post(
         "/api/users/register",
         {
           username,
           email,
           password,
           profpic,
         },
         config
       );

       dispatch({type: USER_SIGNUP_SUCCESS, payload: data});
       dispatch({type: USER_LOGIN_SUCCESS, payload: data});
       localStorage.setItem("userInfo", JSON.stringify(data));
     } catch (e) {
       dispatch({type: USER_SIGNUP_FAIL, payload:
       e.response && e.response.message.data ?
        e.response.message.data : e.message})
     }
}


export const userupdateaction = (user) => async(dispatch, getState) => {
  try {
    dispatch({type: USER_UPDATE_REQUEST})
    const {
      userLoginReducer: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      "/api/users/profile",
      { user },
      config
    );
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch(e) {
    dispatch({type: USER_UPDATE_FAIL, payload:
      e.response && e.response.message.data ?
      e.response.message.data : e.message})
  }
}