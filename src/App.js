/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Import other components
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import LogIn from "./components/Login";
import Credits from "./components/Credits";
import Debits from "./components/Debits";

class App extends Component {
  constructor() {
    // Create and initialize state
    super();
    this.state = {
      accountBalance: 0.0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: "Joe Smith",
        memberSince: "11/22/99",
      },
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  calculateBalance = () => {
    const { creditList, debitList } = this.state;
    const amounts = [...creditList, ...debitList].flatMap(
      ({ amount }) => amount
    );
    const balance = amounts
      .reduce((total, amount) => total + amount, 0)
      .toFixed(2);
    this.setState({ accountBalance: balance });
  };

  // adding credits.
  addCredit = (description, amount) => {
    const newCredit = {
      id: this.state.creditList.length + 1,
      description,
      amount,
      date: new Date().toISOString(),
    };

    const updatedCreditList = [...this.state.creditList, newCredit];
    this.setState({ creditList: updatedCreditList }, () => {
      this.calculateBalance();
    });
  };

  /*

  // should work for debit, same structrure.

  addDebit = (description, amount) => {
    const newDebit = {
      id: this.state.debitList.length + 1,
      description,
      amount,
      date: new Date().toISOString(),
    };
  
    const updatedDebitList = [...this.state.debitList, newDebit];
    this.setState({ debitList: updatedDebitList }, () => {
      this.calculateBalance();
    });
  }
  */

  // Create Routes and React elements to be rendered using React components
  render() {
    // Create React elements and pass input props to components
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const LogInComponent = () => (
      <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />
    );
    const CreditsComponent = () => (
      <Credits
        credits={this.state.creditList}
        addCredit={this.addCredit}
        accountBalance={this.state.accountBalance}
      />
    );
    const DebitsComponent = () => (
      <Debits
        debits={this.state.debitList}
        addDebit={this.addDebit}
        accountBalance={this.state.accountBalance}
      />
    );

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-example-code-gh-pages">
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
