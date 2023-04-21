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

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
    this.componentDidMount();
  };


  calculateBalance = () => {
    const { creditList, debitList } = this.state;
  
    const totalCredits = creditList.reduce(
      (total, credit) => total + credit.amount,
      0
    );
    const totalDebits = debitList.reduce(
      (total, debit) => total + debit.amount,
      0
    );
    const accountBalance = (totalCredits - totalDebits).toFixed(2);
  
    this.setState({ accountBalance });
  };
  
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

  async componentDidMount() {
    const [debitList, creditList] = await Promise.all([
      fetch('https://johnnylaicode.github.io/api/credits.json'),
      fetch('https://johnnylaicode.github.io/api/debits.json')
    ]);
  
    try {
      if (debitList.ok) {
        this.setState({ debitList: await debitList.json() });
      } else {
        console.log('Response error:', debitList.status);
      }
    } catch (error) {
      console.log('Fetch error:', error.message);
    }
  
    try {
      if (creditList.ok) {
        this.setState({ creditList: await creditList.json() });
      } else {
        console.log('Response error:', creditList.status);
      }
    } catch (error) {
      console.log('Fetch error:', error.message);
    }
  
    this.calculateBalance();
  }

  render() {
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
