import Web3 from "web3";
import { Healthcare } from "./components/js/Healthcare.js";

const contract = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
  console.log("inweb3");

  //load blockchain Data
  const web3 = window.web3;
  // Load account
  const accounts = await web3.eth.getAccounts();
  //const networkId = await web3.eth.net.getId()
  //const networkData = Healthcare.networks[networkId]

  const contractObj = new web3.eth.Contract(
    Healthcare,
    "0xc5301e2Ec1FF61844166f58a2718b8C5F7E6d3Ff"
  );
  console.log(contractObj);
  return contractObj;
};

const account = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
  console.log("inweb3");

  //load blockchain Data
  const web3 = window.web3;
  // Load account
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[0]);
  //const networkId = await web3.eth.net.getId()
  //const networkData = Healthcare.networks[networkId]
  return accounts[0];
};
export { contract, account };
