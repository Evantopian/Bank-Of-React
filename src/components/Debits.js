import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

function Debits({ debits, addDebit, accountBalance }) {
  /*
    Function to handle adding a new debit transaction. Parses the 
    input values from the form, calls the addDebit() function passed 
    as a prop to update the parent component's state, and then resets the form.
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, amount } = e.target.elements;
    const roundedAmount = Number(amount.value).toFixed(2); 
    addDebit(description.value, Number(roundedAmount));
    e.target.reset();
  };

  /*
    Function to map over the list of debit transactions 
    passed as a prop and render each one as an <li> element 
    with the transaction's details.
  */  
  const debitsView = debits.map(({ id, amount, description, date }) => (
    <li key={id}>
      {amount} {description} {date.slice(0, 10)}
    </li>
  ));

  /*
    The Debits component renders a list of debit transactions 
    and a form to add a new debit. It also renders an AccountBalance 
    component to display the current account balance, and a Link component 
    to return to the Home page.
  */
  return (
    <div>
      <h1>Debits</h1>
      <ul>{debitsView}</ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="description" />
        <input type="number" step="any" name="amount" />
        <button type="submit">Add Debit</button>
      </form>
      <AccountBalance accountBalance={accountBalance} />
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;
