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
  const  handleClick = async() => {
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
  return (
    <div className="App">
    <button onClick={handleClick}>
      CONNECT WALLET 
    </button>
    </div>

  );
}

export default App;
