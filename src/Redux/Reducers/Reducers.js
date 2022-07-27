import { combineReducers } from "redux";
import ConnectWallet from "./ConnectWallet";
import UtilsReducers from "./UtilsReducers";
import Modal from "./Modal";
const rootReducers = combineReducers({ ConnectWallet, Modal, UtilsReducers });
export default rootReducers;
