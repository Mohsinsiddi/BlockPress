import React, { Component } from "react";
import "../../style.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import QR from "./qr";
import Web3 from "web3";
import { Healthcare } from "../js/Healthcare.js";
import { encryptKey, encryptFile, decryptKey } from "../js/encryption.js";
import ipfs from "../js/ipfs";
const cryptoRandomString = require("crypto-random-string");
const Moralis = require("moralis").default;

// import {generate} from "..js/aeskey.js"
class Employee extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
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
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const contract = new web3.eth.Contract(
      Healthcare,
      "0xc5301e2Ec1FF61844166f58a2718b8C5F7E6d3Ff"
    );
    this.setState({ contract });

    var account = await web3.eth.getAccounts();
    var fromAcc = account.toString();
  }

  constructor(props) {
    super(props);
    this.state = {
      cam: false,
      web3: null,
      contract: null,
      account: null,
      value: "",
    };
  }

  async addPatient() {
    this.state.contract.methods
      .addPatient(
        this.state.value,
        this.props.data.name,
        this.props.data.nationality,
        this.props.data.birthPlace,
        this.props.data.dob
      )
      .send({ from: this.state.account })
      .then((r) => {
        console.log("added patient");
        window.alert("Patient added successfully to the system");
        return window.location.reload();
      });
  }
  async addDoctor() {
    this.state.contract.methods
      .addDoctor(
        this.state.value,
        this.props.data.name,
        this.props.data.licenseNum
      )
      .send({ from: this.state.account })
      .then((r) => {
        console.log("added doc");
        window.alert("Doctor added successfully to the system");
        return window.location.reload();
      });
  }
  async updateNHI() {
    this.state.contract.methods
      .addNHI(this.state.value, this.props.data)
      .send({ from: this.state.account })
      .then((r) => {
        console.log("NHI updated");
        window.alert("NHI for this patient updated successfully!");
        return window.location.reload();
      });
  }
  async addLab() {
    this.state.contract.methods
      .addLab(this.state.value, this.props.data)
      .send({ from: this.state.account })
      .then((r) => {
        console.log("added lab");
        window.alert("Pharmacist added successfully to the system");
        return window.location.reload();
      });
  }
  async addStateAdmin() {
    console.log(this.props.data);
    console.log(this.props.data.name);
    this.state.contract.methods
      .addStateAdmin(
        this.state.value,
        this.props.data.name,
        this.props.data.statename
      )
      .send({ from: this.state.account })
      .then((r) => {
        console.log("added admin");
        window.alert("DHB added successfully to the system");
        return window.location.reload();
      });
  }
  async addAdmin() {
    console.log(this.state.value);
    this.state.contract.methods
      .addHospitalAdmins(
        this.state.value,
        this.props.data.name,
        this.props.data.hospital
      )
      .send({ from: this.state.account })
      .then((r) => {
        console.log("added admin");
        window.alert("Hospital Admin added successfully to the system");
        return window.location.reload();
      });
  }
  async addReceptionist() {
    this.state.contract.methods
      .addReceptionist(this.state.value, this.props.data)
      .send({ from: this.state.account })
      .then((r) => {
        console.log("added recep");
        window.alert("Receptionist added successfully to the system");
        return window.location.reload();
      });
  }

  async viewPatDetails() {
    return "Hello";
  }

  //doc and lab upload record
  async reportUpload() {
    var today = new Date();
    var date =
      today.getDate() +
      "-" +
      parseInt(today.getMonth() + 1) +
      "-" +
      today.getFullYear();

    const aeskey = cryptoRandomString({ length: 32 });
    console.log("aes key", aeskey);

    const encryptedfile = encryptFile(this.props.data.toString(), aeskey);
    console.log("encrypted file", encryptedfile);

    const encryptedKey = encryptKey(this.state.value, aeskey);
    console.log("Encrypted key", encryptedKey);
    const buffer1 = Buffer.from(encryptedfile.toString());
    const uploadArray = [
      {
        path: "demo.",
        content: buffer1,
      },
    ];
    await Moralis.start({
      apiKey:
        "O9VEVQf2RYTUbF1NAnTifb1jYdwJVA7rhODkH5YhvtmddgJiUVUn9ONU4OwIT5J1",
    });

    const response = await Moralis.EvmApi.ipfs.uploadFolder({
      abi: uploadArray,
    });
    console.log(response.result[0].path);

    this.state.contract.methods
      .sendIPFS(response.result[0].path, this.state.value, encryptedKey, date)
      .send({ from: this.state.account })
      .then((r) => {
        console.log("Added report");
        window.alert("You have Added Prescription successfully");
        return window.location.reload();
      });
  }

  //revoke
  async revoke() {
    const isPermit = await this.state.contract.methods
      .permitOrNot(this.props.data, this.state.value)
      .call({ from: this.state.account });
    if (isPermit === "") {
      window.alert("You have not given any permission to this user");
    } else {
      this.state.contract.methods
        .removePermission(this.props.data, this.state.value)
        .send({ from: this.state.account })
        .then((r) => {
          console.log("Revoked");
          window.alert("Permission revoked successfully");
        });
    }
  }

  //permit
  async permit() {
    const encryptedKey = await this.state.contract.methods
      .retrieveKey(this.props.data)
      .call({ from: this.state.account });

    const isPermit = await this.state.contract.methods
      .permitOrNot(this.props.data, this.state.value)
      .call({ from: this.state.account });
    if (isPermit === "") {
      const decryptedKey = decryptKey(encryptedKey, this.state.account);

      const newEncryptKey = encryptKey(this.state.value, decryptedKey);

      this.state.contract.methods
        .createPermission(this.props.data, newEncryptKey, this.state.value)
        .send({ from: this.state.account })
        .then((r) => {
          console.log("Permitted");
          window.alert("Permission given successfully");
        });
    } else {
      window.alert("You have already given permission to this user");
    }
  }
  getValueFromChild(value) {
    console.log(value);
    this.setState({
      value: value,
    });
  }

  render() {
    return (
      <>
        <input
          id="input"
          className="form-control"
          value={this.state.value}
          onChange={(e) => {
            this.setState({ value: e.target.value });
          }}
          style={{
            width: "100%",
            height: "100%",
            marginTop: "5%",
            marginBottom: "5%",
          }}
          placeholder="Enter Public Address"
        ></input>
        <p className="text-center">OR</p>
        <button
          className="btn btn-success btn-block my-2"
          onClick={() => {
            this.setState({ cam: !this.state.cam });
          }}
        >
          {this.state.cam ? "Close QR code Scanner" : "Open QR code Scanner"}
        </button>

        <p className="my-2 text-dark">
          {" "}
          {this.state.cam ? (
            <QR gettingValues={this.getValueFromChild.bind(this)} />
          ) : (
            "Click on button to read Qr data"
          )}{" "}
        </p>

        {this.props.from === "doc" && (
          <button
            type="submit"
            onClick={() => {
              this.setState({ parab: !this.state.parab });
              this.reportUpload();
            }}
            className="btn btn-success my-2"
          >
            Submit
          </button>
        )}
        {this.props.from === "lab" && (
          <button
            type="submit"
            onClick={() => {
              this.setState({ parab: !this.state.parab });
              this.reportUpload();
            }}
            className="btn btn-success my-2"
          >
            Submit
          </button>
        )}

        {this.props.from === "revoke" && (
          <button
            type="submit"
            onClick={() => {
              this.setState({ parab: !this.state.parab });
              this.revoke();
            }}
            className="btn btn-success my-2"
          >
            Submit
          </button>
        )}
        {this.props.from === "permit" && (
          <button
            id="permitsubmit"
            type="submit"
            onClick={() => {
              this.setState({ parab: !this.state.parab });
              this.permit();
            }}
            className="btn btn-success my-2"
          >
            Submit
          </button>
        )}
        {this.props.from === "recepPat" && (
          <button
            type="submit"
            onClick={() => {
              this.setState({ parab: !this.state.parab });
              this.addPatient();
            }}
            className="btn btn-success my-2"
          >
            Submit
          </button>
        )}
        {this.props.from === "moh" && (
          <button
            type="submit"
            onClick={() => {
              this.setState({ parab: !this.state.parab });

              this.addStateAdmin();
            }}
            className="btn btn-success my-2"
          >
            Submit
          </button>
        )}
        {this.props.from === "dbh" && (
          <button
            type="submit"
            onClick={() => {
              this.setState({ parab: !this.state.parab });
              if (this.props.data.pharmacy) {
                window.alert("This feature hasn't been enabled yet");
                window.location.reload();
                return;
              }
              this.addAdmin();
            }}
            className="btn btn-success my-2"
          >
            Submit
          </button>
        )}
        {this.props.from === "adminDoc" && (
          <button
            type="submit"
            onClick={() => {
              console.log("Here and there");
              this.setState({ parab: !this.state.parab });
              this.addDoctor();
            }}
            className="btn btn-success my-2"
          >
            Submit
          </button>
        )}
        {this.props.from === "adminLab" && (
          <button
            type="submit"
            onClick={() => {
              this.setState({ parab: !this.state.parab });
              this.addLab();
            }}
            className="btn btn-success my-2"
          >
            Submit
          </button>
        )}
        {this.props.from === "adminRecep" && (
          <button
            type="submit"
            onClick={() => {
              this.setState({ parab: !this.state.parab });
              this.addReceptionist();
            }}
            className="btn btn-success my-2"
          >
            Submit
          </button>
        )}
        {this.props.from === "NHI" && (
          <button
            type="submit"
            onClick={() => {
              this.setState({ parab: !this.state.parab });
              this.updateNHI();
            }}
            className="btn btn-success my-2"
          >
            Submit
          </button>
        )}
        {this.props.from === "viewPatDetails" && (
          <button
            type="submit"
            onClick={async () => {
              this.setState({ parab: !this.state.parab });
              const data = await this.viewPatDetails();
              console.log(data);
            }}
            className="btn btn-success my-2"
          >
            Submit
          </button>
        )}
      </>
    );
  }
}
export default Employee;
