import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

function Credits({ credits, addCredit, accountBalance }) {
  
  /* handleSubmit: Handles the submit event for the credit form by 
    preventing the default behavior, extracting the form data, adding 
    a new credit with the data, resetting the form, and calling the addCredit function. 
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, amount } = e.target.elements;
    const roundedAmount = Number(amount.value).toFixed(2); 
    addCredit(description.value, Number(roundedAmount));
    e.target.reset();
  };

  /* creditsView: Maps the credits array into an array of <li>
     elements with the amount, description, and date of each credit. 
  */
  const creditsView = credits.map(({ id, amount, description, date }) => (
    <li key={id}>
      {amount} {description} {date.slice(0, 10)}
    </li>
  ));

  /* Credits: The main function that renders the Credits component,
     including the credits list, credit form, account balance, and a
     link to return to the Home component. 
  */
  return (
    <div>
      <h1>Credits</h1>
      <ul>{creditsView}</ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="description" />
        <input type="text" name="amount" />
        <button type="submit">Add Credit</button>
      </form>
      <AccountBalance accountBalance={accountBalance} />
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;