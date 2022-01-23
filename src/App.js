import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import WalletService from './services/wallet';
import { AppContext, AppContextProvider } from './states/appcontext';
import { AppActions } from './states/actions';
import { compact } from 'lodash';
import Web3 from "web3";
import LaunchDaoPage from './Launchdao';

function App() {

  const [state, dispatch] = useContext(AppContext);
  const [wallet, setwallet] = useState(null)
  const [authorized, setauthorized] = useState(null);
  const [input, setInput] = useState('');
  const [daolaunched, setDaoLaunched] = useState(false);
  const handleClick = async () => {
    try {
      window.dao = {}
      const data = await WalletService.connnectWalletState();
      setwallet(data)
      dispatch(data)
    } catch (error) {
      alert("Something went wrong")
      console.error(error)
    }
  }

  const checkaddress = async () => {
    window.dao.selectedaddress = input;
    const isvalidaddress = await WalletService.getENS(input);
    if (isvalidaddress == wallet.payload) {
      setauthorized(true)
    }
  }


  const launchdoaEvent = () => {
    setDaoLaunched(true);
  }

  const launchDaoHtml = () => {
    return (
      <LaunchDaoPage></LaunchDaoPage>
    )
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
        <input value={input} onInput={e => setInput(e.target.value)} />
        <button className='btn btn-secondary' onClick={checkaddress} >Submit</button>
      </div>
    )
  }

  const launchdoa = () => {
    return (
      <div className='jumbtron'>
        <button className='btn' onClick={launchdoaEvent}>Launch Dao</button>
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
    if (wallet && authorized && daolaunched) {
      return launchDaoHtml();
    }
  }
  return (
    <div className="containe jumbotron">
      {gethtml()}
    </div>

  );
}

export default App;
