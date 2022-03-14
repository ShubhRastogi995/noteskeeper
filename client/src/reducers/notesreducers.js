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

export const noteshowreducer = (state = {}, action) => {
    switch (action.type) {
      case NOTES_REQUEST:
        return {loading: true};
      case NOTES_SUCCESS:
        action.payload.forEach(element => {
          Object.assign(element, { expanded: false });
        });
        return {loading: false, notes: action.payload};
      case NOTES_FAIL:
        return { loading: false, error: action.payload };

      default:
        return state;
    }
}


export const notecreatereducer = (state = {}, action) => {
  switch (action.type) {
    case NOTE_CREATE_REQUEST:
      return { loading: true };
    case NOTE_CREATE_SUCCESS:
      return { loading: false, note: action.payload };
    case NOTE_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const noteeditreducer = (state = {}, action) => {
  switch (action.type) {
    case NOTE_EDIT_REQUEST:
      return { loading: true };
    case NOTE_EDIT_SUCCESS:
      return { loading: false, note: action.payload, success: true };
    case NOTE_EDIT_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const notedeletereducer = (state = {}, action) => {
  switch (action.type) {
    case NOTE_DELETE_REQUEST:
      return { loading: true };
    case NOTE_DELETE_SUCCESS:
      return { loading: false, note: action.payload, success: true };
    case NOTE_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

