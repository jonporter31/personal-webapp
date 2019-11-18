import { UPDATE_LOGIN_MODAL_DISPLAY
  , UPDATE_CONTACT_MODAL_DISPLAY
  , UPDATE_PAGE_STATE
  , UPDATE_TOAST_MSG
} from '../actions/actionTypes';

import { initialMainState } from '../actions/initialState';

export default function Main(state = initialMainState, action) {
  switch (action.type) {
    case UPDATE_LOGIN_MODAL_DISPLAY:
      return Object.assign({}, state, {
        loginModalShow: action.payload
      })

    case UPDATE_CONTACT_MODAL_DISPLAY:
      return Object.assign({}, state, {
        contactModalShow: action.payload
      })

    case UPDATE_PAGE_STATE:
      return Object.assign({}, state, {
        pageState: action.payload
      })

    case UPDATE_TOAST_MSG:
      return Object.assign({}, state, {
        toastMsg: action.payload
      })

    default:
      return state
  }
}