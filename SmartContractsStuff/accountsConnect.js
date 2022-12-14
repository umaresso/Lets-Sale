/*
  connectWallet: Connects the MetaMask wallet
*/
import { BigNumber, Contract, ethers, providers, utils } from "ethers";

export const connectWallet = async () => {
  try {
    // Get the provider from web3Modal, which in our case is MetaMask
    // When used for the first time, it prompts the user to connect their wallet
    await getProviderOrSigner();
    //          setWalletConnected(true);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Returns a Provider or Signer object representing the Ethereum RPC with or without the
 * signing capabilities of metamask attached
 *
 * A `Provider` is needed to interact with the blockchain - reading transactions, reading balances, reading state, etc.
 *
 * A `Signer` is a special type of Provider used in case a `write` transaction needs to be made to the blockchain, which involves the connected account
 * needing to make a digital signature to authorize the transaction being sent. Metamask exposes a Signer API to allow your website to
 * request signatures from the user using Signer functions.
 *
=       */
export const getProviderOrSigner = async (network) => {
  // Connect to Metamask
  // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
  // alert("Please Accept the Metamask Connection");

  let provider;
  let web3Provider;
  let signer;

  try {
    await window.ethereum.enable();
    // console.log("selected address is ", window.ethereum.selectedAddress);
    provider = web3Provider = new ethers.providers.Web3Provider(
      window.ethereum
    );
    const { chainId } = await web3Provider?.getNetwork();

    if (network == "mumbai" && chainId && chainId !== 80001) {
      window.alert("Please Change the network to Mumbai");
      return null;
    }

    signer = web3Provider.getSigner();
    return signer;
  } catch (err) {
    if (err.toString().includes("already pending")) {
      alert("Please Connect your Wallet !");
    }
    console.log("Error connecting wallet", err.toString());
    return null;
  }
  return signer;
  // If user is not connected to the Mumbai network, let them know and throw an error
};
