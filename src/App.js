import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import WalletService from './services/wallet';
import { AppContext, AppContextProvider } from './states/appcontext';
import { AppActions } from './states/actions';
import { compact } from 'lodash';
import Web3 from "web3";

function App() {

  const [state, dispatch] = useContext(AppContext);
  let [wallet, setwallet] = useState(null)
  const [address, setAddress] = useState("0x0");

  const  handleClick = async() => {
    window.dao = {};
    try {
      wallet = await WalletService.connectwallet();
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

  const handleSubmit = async(event) => {
    event.preventDefault();
    const ensObject = await WalletService.connectwallet(address);
    console.log(ensObject)
    debugger;
    console.log("ENS Address is:", ensObject);
    alert(`DNS Address is ${address}`)
  }

  return (
    <div className="App">
    <button onClick={handleClick}>
      CONNECT WALLET 
    </button>

    <form onSubmit={handleSubmit}>
      <label>
        Enter your ENS Address
        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>

    </div>

  );
}

export default App;
