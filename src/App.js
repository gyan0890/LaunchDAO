import "./App.css";
import { useContext, useState } from "react";
import WalletService from "./services/wallet";
import { AppContext } from "./states/appcontext";
import { AppActions } from "./states/actions";
import LaunchDaoPage from "./pages/Launchdao";
import AllDaoPage from "./pages/AllDaos";
import DaoCreationService from "./services/daoCreation.js";

function App() {
  const [state, dispatch] = useContext(AppContext);
  const [wallet, setWallet] = useState(null);
  const [authorized, setAuthorized] = useState(null);
  const [ensName, setEnsName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [daoLaunched, setDaoLaunched] = useState(false);
  const [launchAllDao, setLaunchAllDao] = useState(false);

  const handleClick = async () => {
    // Insert into html
    // <p>The metamask extension will now open. Please ensure your wallet is connected before proceeding.</p>

    try {
      window.dao = {};
      const data = await WalletService.connnectWalletState();
      setWallet(data);
      dispatch(data);
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  };

  const handleAllDaosButton = () => {
    return <AllDaoPage />;
  };

  const checkAddress = async () => {
    //For testing ONLY
    setAuthorized(true);
    //TESTING ONLY
    window.dao.selectedaddress = ensName;
    // FOR TESTING - COMMENTING OUT
    //  const isvalidaddress = await WalletService.getENS(input);
    // if (isvalidaddress == wallet.payload) {
    //   setAuthorized(true)
    // }
  };

  const setShowAllDaoPage = async () => {
    setLaunchAllDao(true);
  };

  const launchDaoEvent = async () => {
    const desc = description;
    const totalSupply = 10000;
    const symb = symbol;
    const name = ensName;
    await DaoCreationService.deployDao(name, symb, desc, totalSupply, callback);
    // await DaoCreationService.getDaoAddress();
    setDaoLaunched(true);
  };

  const callback = () => {
    const object = {
      type: AppActions.SETDAOENABLED,
      payload: true,
    };
    dispatch(object);
  };

  const launchDaoHtml = () => {
    return <LaunchDaoPage key="defaultFlow" />;
  };

  const launchDao = () => {
    return <div className="jumbotron"></div>;
  };

  const getHtml = () => {
    if (wallet && launchAllDao) {
      return handleAllDaosButton();
    }
    if (wallet && authorized && !daoLaunched) {
      return launchDao();
    }
    if (wallet && authorized && state.setdao) {
      return launchDaoHtml();
    }
  };

  return (
    <div className="container">
      {!wallet && (
        <>
          <h1>Launch DAO</h1>
          <p>
            I'm baby wayfarers iPhone dolore authentic, banh mi vegan et
            skateboard helvetica commodo. Salvia cold-pressed magna gochujang
            umami. Stumptown culpa actually do man braid cardigan ut flannel
            plaid squid humblebrag ex. Hoodie small batch qui occaecat
            chicharrones retro DIY jianbing seitan echo park kickstarter artisan
            exercitation.
          </p>
          <p>
            Thundercats franzen aliqua, in labore master cleanse vegan retro
            cloud bread incididunt. Waistcoat yr tempor lyft single-origin
            coffee id. Cornhole nulla wayfarers poutine. Master cleanse
            single-origin coffee paleo leggings, neutra DIY ad narwhal dolor
            fixie tempor semiotics. Shaman helvetica non hell of.
          </p>
          <button className="button connect-wallet" onClick={handleClick}>
            Connect Wallet
          </button>
          <button className="button show-all-daos" onClick={setShowAllDaoPage}>
            Show All DAOs
          </button>
        </>
      )}

      {wallet && (
        <>
          <label>Enter ENS name with which you wish to start the DAO</label>
          <div>
            <input
              className="input ens"
              value={ensName}
              onInput={(e) => setEnsName(e.target.value)}
            />
            {!authorized && (
              <button className="button ens" onClick={checkAddress}>
                Submit
              </button>
            )}
            {authorized && <span className="verified">✅ Verified!</span>

            }
          </div>
          {
            //!authorized and disabled
            //  authorized and available
            <>
              <label>What will your DAO do?</label>
              <textarea
                  className="input description"
                placeholder="Description"
                value={description}
                onInput={(e) => setDescription(e.target.value)}
              />
              <label>What is the symbol for the token of your DAO?</label>
              <input
                  className="input symbol"
                placeholder="ex: TSC"
                value={symbol}
                onInput={(e) => setSymbol(e.target.value)}
              />
              <button className="button launch-dao" onClick={launchDaoEvent}>
                Launch Dao
              </button>
            </>
          }
        </>
      )}
    </div>
  );
}

export default App;
