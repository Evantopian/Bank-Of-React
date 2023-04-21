import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Import other components
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import LogIn from "./components/Login";
import Credits from "./components/Credits";
import Debits from "./components/Debits";

class App extends Component {
  /*
    constructor() method: Initializes the component's state with an account balance 
    of 0.0, empty credit and debit lists, and a default user.
  */
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
  
    /*
      mockLogIn() method: Updates the current user's username with the username 
      passed as an argument and then calls the componentDidMount() method.
    */
    mockLogIn = (logInInfo) => {
      const newUser = { ...this.state.currentUser };
      newUser.userName = logInInfo.userName;
      this.setState({ currentUser: newUser });
      this.componentDidMount();
    };
  
    /*
      calculateBalance() method: Calculates the account balance by (bal = cred-deb) and then 
      rounds the balance to two decimal places. This method updates the component's 
      state with the calculated balance.
    */
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
  
    /*
      addCredit() method: Adds a new credit to the credit list with the 
      description and amount passed as arguments, and then calls the calculateBalance() method.
    */
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
      addDebit() method: Adds a new debit to the debit list with the description 
      and amount passed as arguments, and then calls the calculateBalance() method.
    */
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
  
    /*
      componentDidMount() method: Fetches credit and debit data from external 
      JSON files using the fetch() function and updates the component's state 
      with the retrieved data. This method also calls the calculateBalance() method.
    */
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
  
    /*
      Home component: Renders the account balance.
      UserProfile component: Renders the current user's information.
      LogIn component: Renders a login form and calls the mockLogIn() method when submitted.
      Credits component: Renders a list of credits and a form to add a new credit.
      Debits component: Renders a list of debits and a form to add a new debit.
    */
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
  
  
      //utilizes a Router component to manage various routes for the aforementioned components.
      return (
        <Router basename="/Bank-Of-React">
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