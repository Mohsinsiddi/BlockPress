import React, { Component } from "react";
import Web3 from "web3";
// import Token from '../abis/Token.json'
// import EthSwap from '../abis/EthSwap.json'
import Navbar from "./Navbar";
import Main from "./Main";
import "./App.css";
import { EXCHANGE_ABI } from "../js/ExchangeABI";
import { BlockPressABI } from "../js/BlockPressToken_abi";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const ethBalance = await web3.eth.getBalance(this.state.account);
    this.setState({ ethBalance });

    // Load Token
    const networkID = await web3.eth.net.getId();
    if (networkID) {
      const token = new web3.eth.Contract(
        BlockPressABI,
        "0x5f2FB38ABe17d9DB84B906c021104609Db314359"
      );
      this.setState({ token });
      let tokenBalance = await token.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ tokenBalance: tokenBalance.toString() });
    } else {
      window.alert("Token contract not deployed to detected network.");
    }

    // Load EthSwap
    if (networkID === 11155111) {
      const ethSwap = new web3.eth.Contract(
        EXCHANGE_ABI,
        "0xd8f17732d8856d692ad31e7bd2948080e1111c74"
      );
      this.setState({ ethSwap });
      this.setState({
        swapAddress: "0xd8f17732d8856d692ad31e7bd2948080e1111c74",
      });
    } else {
      window.alert("EthSwap contract not deployed to detected network.");
    }

    this.setState({ loading: false });
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.eth_requestAccounts;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    window.ethereum.autoRefreshOnNetworkChange = false;
  }

  buyTokens = (etherAmount) => {
    this.setState({ loading: true });
    this.state.ethSwap.methods
      .buyTokens()
      .send({ value: etherAmount, from: this.state.account })
      .on("receipt", (hash) => {
        this.setState({ loading: false });
        window.alert("Successfully Bought Tokens");
      });
  };

  sellTokens = (tokenAmount) => {
    this.setState({ loading: true });
    this.state.token.methods
      .approve(this.state.swapAddress, tokenAmount)
      .send({ from: this.state.account })
      .on("receipt", (hash) => {
        this.state.ethSwap.methods
          .sellTokens(tokenAmount)
          .send({ from: this.state.account })
          .on("receipt", (hash) => {
            this.setState({ loading: false });
            window.alert("Successfully Sold Tokens");
          });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      token: {},
      ethSwap: {},
      ethBalance: "0",
      tokenBalance: "0",
      loading: true,
    };
  }

  render() {
    let content;
    if (this.state.loading) {
      content = (
        <p
          id="loader"
          className="text-center"
          style={{ fontSize: "24px", marginTop: "40%" }}
        >
          Loading...
        </p>
      );
    } else {
      content = (
        <Main
          ethBalance={this.state.ethBalance}
          tokenBalance={this.state.tokenBalance}
          buyTokens={this.buyTokens}
          sellTokens={this.sellTokens}
        />
      );
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "600px" }}
            >
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>

                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
