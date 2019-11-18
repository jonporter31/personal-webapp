import { UPDATE_LOGIN_MODAL_DISPLAY
	, UPDATE_CONTACT_MODAL_DISPLAY
	, UPDATE_PAGE_STATE
  , UPDATE_TOAST_DISPLAY
  , UPDATE_TOAST_MSG

	, DO_LOGIN
	, DO_LOGOUT
	, ACCOUNT_SET_NAME
	, ACCOUNT_SET_ANON
	, ACCOUNT_SET_LOGIN_ERROR
	, ACCOUNT_SET_WAITING_FOR_AUTH
	, ACCOUNT_INITIATE_LOGOUT
	, ACCOUNT_SET_TOKEN

} from './actionTypes';

export function loginModalShow() {
 return {
  type: UPDATE_LOGIN_MODAL_DISPLAY,
  payload: true
 }
}

export function loginModalHide() {
 return {
  type: UPDATE_LOGIN_MODAL_DISPLAY,
  payload: false
 }
}

export function contactModalShow() {
 return {
  type: UPDATE_CONTACT_MODAL_DISPLAY,
  payload: true
 }
}

export function contactModalHide() {
 return {
  type: UPDATE_CONTACT_MODAL_DISPLAY,
  payload: false
 }
}

export function changePageState(state) {
 return {
  type: UPDATE_PAGE_STATE,
  payload: state
 }
}


export function toastSetMsg(msg) {
 return {
  type: UPDATE_TOAST_MSG,
  payload: msg
 }
}

export function toastHide() {
 return {
  type: UPDATE_TOAST_MSG,
  payload: false
 }
}




export function doLogin() {
 return {
  type: DO_LOGIN,
  payload: false
 }
}

export function doLogout() {
 return {
  type: DO_LOGOUT,
  payload: true
 }
}

export function setAccountName(name) {
 return {
  type: ACCOUNT_SET_NAME,
  payload: name
 }
}

export function setAnon(anon) {
 return {
  type: ACCOUNT_SET_ANON,
  payload: anon
 }
}

export function setLoginError(error) {
 return {
  type: ACCOUNT_SET_LOGIN_ERROR,
  payload: error
 }
}

export function setWaitingForAuth(error) {
 return {
  type: ACCOUNT_SET_WAITING_FOR_AUTH,
  payload: error
 }
}

export function setLogout(flag) {
 return {
  type: ACCOUNT_INITIATE_LOGOUT,
  payload: flag
 }
}

export function setToken(token) {
 return {
  type: ACCOUNT_SET_TOKEN,
  payload: token
 }
}


