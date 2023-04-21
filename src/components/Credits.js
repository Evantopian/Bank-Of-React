import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

function Credits({ credits, addCredit, accountBalance }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, amount } = e.target.elements;
    addCredit(description.value, Number(amount.value));
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
        <input type="text" name="amount" pattern="[0-9]+(\.[0-9]{1,2})?" />
        <button type="submit">Add Credit</button>
      </form>
      <AccountBalance accountBalance={accountBalance} />
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;