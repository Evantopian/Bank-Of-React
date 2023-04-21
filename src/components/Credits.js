import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

function Credits({ credits, addCredit, accountBalance }) {
  
  // converts number to a valid format.
  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, amount } = e.target.elements;
    const roundedAmount = Number(amount.value).toFixed(2); // round to 2 decimal places
    addCredit(description.value, Number(roundedAmount));
    e.target.reset();
  };

  const creditsView = credits.map(({ id, amount, description, date }) => (
    <li key={id}>
      {amount} {description} {date.slice(0, 10)}
    </li>
  ));

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
