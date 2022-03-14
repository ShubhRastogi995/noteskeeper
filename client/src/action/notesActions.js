import axios from "axios";
import {
  NOTES_FAIL,
  NOTES_SUCCESS,
  NOTES_REQUEST,
  NOTE_CREATE_FAIL,
  NOTE_CREATE_REQUEST,
  NOTE_CREATE_SUCCESS,
  NOTE_EDIT_FAIL,
  NOTE_EDIT_REQUEST,
  NOTE_EDIT_SUCCESS,
  NOTE_DELETE_FAIL,
  NOTE_DELETE_REQUEST,
  NOTE_DELETE_SUCCESS,
} from "../constants/notesconstants";

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_REQUEST });
    const {
      userLoginReducer: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("api/notes", config);
    dispatch({ type: NOTES_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({ type: NOTES_FAIL, payload: message });
  }
};


export const createNotes =
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({ type: NOTE_CREATE_REQUEST });
      const {
        userLoginReducer: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/notes/create",
        { title, content, category },
        config
      );
      dispatch({ type: NOTE_CREATE_SUCCESS, payload: data });
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch({ type: NOTE_CREATE_FAIL, payload: message });
    }
};


export const editNote = (id, title, category, content) => async (dispatch, getState) => {
  try {
    dispatch({type: NOTE_EDIT_REQUEST});
    const {
      userLoginReducer: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await axios.put(`/api/notes/${id}`,{title, content, category}, config)
    dispatch({ type: NOTE_EDIT_SUCCESS, payload: data });
  } catch(err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({ type: NOTE_EDIT_FAIL, payload: message });
  }
}

export const deleteNote = (id) => async (dispatch, getState) => {
  try {
     dispatch({ type: NOTE_DELETE_REQUEST });
     const {
       userLoginReducer: { userInfo },
     } = getState();
     const config = {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${userInfo.token}`,
       },
     };
     const { data } = await axios.delete(`/api/notes/${id}`, config);
     dispatch({ type: NOTE_DELETE_SUCCESS, payload: data });
  } catch(err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({ type: NOTE_DELETE_FAIL, payload: message });
  }
}
