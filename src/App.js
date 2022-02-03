import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import WalletService from './services/wallet';
import { AppContext } from './states/appcontext';
import { AppActions } from './states/actions';
import LaunchDaoPage from './pages/Launchdao';
import AllDaoPage from './pages/AllDaos';
import DaoCreationService from './services/daoCreation.js';

function App() {

  const [state, dispatch] = useContext(AppContext);
  //     debugger;
  const [wallet, setwallet] = useState(null)
  const [authorized, setauthorized] = useState(null);
  const [ensName, setEnsName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [daolaunched, setDaoLaunched] = useState(false);
  const[launchAllDao, setLaunchAllDao] = useState(false);
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

  const handleAllDaosButton = () => {
    return (
      <AllDaoPage></AllDaoPage>
    )
  }
  

  const checkaddress = async () => {
    //For testing ONLY
    setauthorized(true)
    //TESTING ONLY
    window.dao.selectedaddress = ensName;
    /** FOR TESTING - COMMENTING OUT 
     * const isvalidaddress = await WalletService.getENS(input);
    if (isvalidaddress == wallet.payload) {
      setauthorized(true)
    }
    */

  }

  const setShowAllDaoPage = async () =>{
    debugger;
    setLaunchAllDao(true);
  }


  const launchdoaEvent = async () => {
    alert("DAO is Launching");

    console.log(ensName);
    const desc = description;
    const totalSupply = 10000;
    const symb = symbol;
    const name = ensName;
    debugger;
    await DaoCreationService.deployDao(name, symb, desc, totalSupply, callback);
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
      <LaunchDaoPage key="defaultFlow"></LaunchDaoPage>
    )
  }
  const connectwallet = () => {
    return (
      <div>
        <button className="btn btn-primary cbutton" onClick={handleClick}>
          CONNECT WALLET
        </button>
        
      </div>
    )
  }

  const inputBoxwithSubmit = () => {
    return (
      <div>
        <input value={ensName} onInput={e => setEnsName(e.target.value)} />
        <button className='btn btn-secondary' onClick={checkaddress} >Submit</button>
        <button className="btn btn-primary cbutton" onClick={setShowAllDaoPage}>
          All DAOs
        </button>
      </div>
    )
  }

  const launchdoa = () => {
    return (
      <div className='jumbtron'>
        <textarea placeholder="Description" value={description} onInput={e => setDescription(e.target.value)} />
        <input placeholder="Symbol" value={symbol} onInput={e => setSymbol(e.target.value)} />
        <button className='btn' onClick={launchdoaEvent}>Launch Dao</button>
      </div>
    )
  }

  const gethtml = () => {
    //debugger;
    if (!wallet) {
      return connectwallet();
    }
    //debugger;
    if(wallet && launchAllDao){
      //debugger;
      return handleAllDaosButton();
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
