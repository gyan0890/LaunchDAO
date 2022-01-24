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
import DaoCreationService from './services/daoCreation.js';

function App() {

  const [state, dispatch] = useContext(AppContext);
//     debugger;
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
    //For testing ONLY
    setauthorized(true)
    //TESTING ONLY
    window.dao.selectedaddress = input;
    /** FOR TESTING - COMMENTING OUT 
     * const isvalidaddress = await WalletService.getENS(input);
    if (isvalidaddress == wallet.payload) {
      setauthorized(true)
    }
    */

  }


  const launchdoaEvent = async () => {
    alert("DAO is Launching");
    
    console.log(input);
    const desc = input;
    const totalSupply = 10000;
    const symbol = input;
    const name = input;
    debugger;
    await DaoCreationService.deployDao(name, symbol, desc, totalSupply, callback);
    // debugger;
    // // await DaoCreationService.getDaoAddress();
    setDaoLaunched(true);
  }

  const callback = () => {
 
    const object = {
      type: AppActions.SETDAOENABLED,
      payload: true
    }
    dispatch(object)
  }

  const launchDaoHtml = () => {
    return (
      <LaunchDaoPage></LaunchDaoPage>
    )
  }
  const connectwallet = () => {
    return (
      <button className="btn btn-primary cbutton" onClick={handleClick}>
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
    if (wallet && authorized && !daolaunched) {
      return launchdoa();
    }
    if (wallet && authorized && state.setdao) {
      return launchDaoHtml();
    }
  }
  return (
    <div className='relative'>
      <div className="containe jumbotron absolute50">
        {gethtml()}
      </div>
    </div>

  );
}

export default App;
