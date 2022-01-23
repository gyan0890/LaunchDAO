import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useState } from 'react';
import WalletService from './services/wallet';
import { AppContext, AppContextProvider } from './states/appcontext';
import { AppActions } from './states/actions';
import { compact } from 'lodash';
import Web3 from "web3";

function App() {

  const [state, dispatch] = useContext(AppContext);
  const [wallet, setwallet] = useState(null)
  const [authorized, setauthorized] = useState(null);
  const handleClick = async () => {
    try {
      const wallet = await WalletService.connectwallet();
      debugger;
      setwallet(wallet)
      const object = {
        type: AppActions.SETWALLET,
        payload: wallet
      }
      dispatch(object)
    } catch (error) {
      alert("Something went wrong")
      console.error(error)
    }
  }

  const checkaddress = () => {
    const val = document.getElementById("inputid").innerText;
    window.dao.selectedaddress = val;
    debugger;
  }


  const launchdoaEvent = () => {
    alert("launching")
  }
  const connectwallet = () => {
    return (
      <button className="btn btn-primary" onClick={handleClick}>
        CONNECT WALLET
      </button>
    )
  }

  const inputBoxwithSubmit = () => {
    return (
      <div>
        <input id='inputid' placeholder='enter wallet address'></input>
        <button className='btn btn-secondary'>Submit</button>
      </div>
    )
  }

  const launchdoa = () => {
    return (
      <div className='jumbtron'>
        <button className='btn'>Launch Dao</button>
      </div>
    )
  }

  const gethtml = () => {
    if (!wallet) {
      return connectwallet();
    }
    if (wallet && !authorized) {
      return inputBoxwithSubmit()
    }
    if (wallet && authorized) {
      return launchdoa();
    }
  }
  return (
    <div className="containe jumbotron">
      {gethtml()}
    </div>

  );
}

export default App;
