import { DO_LOGIN
  , DO_LOGOUT
  , ACCOUNT_SET_NAME
  , ACCOUNT_SET_ANON
  , ACCOUNT_SET_LOGIN_ERROR
  , ACCOUNT_SET_WAITING_FOR_AUTH
  , ACCOUNT_INITIATE_LOGOUT
  , ACCOUNT_SET_TOKEN
} from '../actions/actionTypes';

import { initialAccountState } from '../actions/initialState';

export default function Account(state = initialAccountState, action) {
  switch (action.type) {
    case DO_LOGIN:
      return Object.assign({}, state, {
        anon: action.payload
      })

    case DO_LOGOUT:
      return Object.assign({}, state, {
        anon: action.payload
      })

    case ACCOUNT_SET_ANON:
      return Object.assign({}, state, {
        anon: action.payload
      })

    case ACCOUNT_SET_TOKEN:
      return Object.assign({}, state, {
        token: action.payload
      })

    case ACCOUNT_SET_NAME:
      return Object.assign({}, state, {
        name: action.payload
      })

    case ACCOUNT_SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.payload
      })

    case ACCOUNT_SET_WAITING_FOR_AUTH:
      return Object.assign({}, state, {
        waitingForAuth: action.payload
      })

    case ACCOUNT_INITIATE_LOGOUT:
      return Object.assign({}, state, {
        doLogout: action.payload
      })

    default:
      return state
  }
}