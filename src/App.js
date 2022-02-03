import './App.css';
import { useContext, useState } from 'react';
import WalletService from './services/wallet';
import { AppContext } from './states/appcontext';
import { AppActions } from './states/actions';
import LaunchDaoPage from './pages/Launchdao';
import AllDaoPage from './pages/AllDaos';
import DaoCreationService from './services/daoCreation.js';

function App() {

  const [state, dispatch] = useContext(AppContext);
  const [wallet, setWallet] = useState(null)
  const [authorized, setAuthorized] = useState(null);
  const [ensName, setEnsName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [daoLaunched, setDaoLaunched] = useState(false);
  const [launchAllDao, setLaunchAllDao] = useState(false);

  const handleClick = async () => {
    // Insert into html
    // <p>The metamask extension will now open. Please ensure your wallet is connected before proceeding.</p>

    try {
      window.dao = {}
      const data = await WalletService.connnectWalletState();
      setWallet(data)
      dispatch(data)
    } catch (error) {
      alert("Something went wrong")
      console.error(error)
    }
  }

  const handleAllDaosButton = () => {
    return (
      <AllDaoPage />
    )
  }

  const checkAddress = async () => {
    //For testing ONLY
    setAuthorized(true)
    //TESTING ONLY
    window.dao.selectedaddress = ensName;
    /** FOR TESTING - COMMENTING OUT 
     * const isvalidaddress = await WalletService.getENS(input);
    if (isvalidaddress == wallet.payload) {
      setAuthorized(true)
    }
    */

  }

  const setShowAllDaoPage = async () =>{
    setLaunchAllDao(true);
  }

  const launchDaoEvent = async () => {
    const desc = description;
    const totalSupply = 10000;
    const symb = symbol;
    const name = ensName;
    debugger;
    await DaoCreationService.deployDao(name, symb, desc, totalSupply, callback);
    // await DaoCreationService.getDaoAddress();
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
      <LaunchDaoPage key="defaultFlow" />
    )
  }

  const launchDao = () => {
    return (
      <div className='jumbotron'>
        <textarea placeholder="Description" value={description} onInput={e => setDescription(e.target.value)} />
        <input placeholder="Symbol" value={symbol} onInput={e => setSymbol(e.target.value)} />
        <button className='btn' onClick={launchDaoEvent}>Launch Dao</button>
      </div>
    )
  }

  const getHtml = () => {
    if(wallet && launchAllDao){
      return handleAllDaosButton();
    }
    if (wallet && authorized && !daoLaunched) {
      return launchDao();
    }
    if (wallet && authorized && state.setdao) {
      return launchDaoHtml();
    }
  }

  return (
      <div className="">
        {!wallet &&
            <>
        <h1>Launch DAO</h1>
          <p>
          I'm baby wayfarers iPhone dolore authentic, banh mi vegan et skateboard helvetica commodo. Salvia cold-pressed magna gochujang umami. Stumptown culpa actually do man braid cardigan ut flannel plaid squid humblebrag ex. Hoodie small batch qui occaecat chicharrones retro DIY jianbing seitan echo park kickstarter artisan exercitation.

          Thundercats franzen aliqua, in labore master cleanse vegan retro cloud bread incididunt. Waistcoat yr tempor lyft single-origin coffee id. Cornhole nulla wayfarers poutine. Master cleanse single-origin coffee paleo leggings, neutra DIY ad narwhal dolor fixie tempor semiotics. Shaman helvetica non hell of.
          </p>
          <button className="btn btn-primary button" onClick={handleClick}>
          CONNECT WALLET
          </button>
              <button onClick={setShowAllDaoPage}>
                Show All DAOs
              </button>

            </>}

        {wallet && !authorized &&
        <div>

          <input value={ensName} onInput={e => setEnsName(e.target.value)} />
          <button className='btn btn-secondary' onClick={checkAddress} >Submit</button>

        </div>}

      </div>
  );
}

export default App;
