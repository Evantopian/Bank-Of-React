import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

function Debits(props) {
  const handleAddDebit = (event) => {
    event.preventDefault();
    const description = event.target.elements.description.value;
    const amount = Number(event.target.elements.amount.value);
    props.addDebit(description, amount);
    event.target.reset();
  };

  const debits = props.debits.map((debit) => {
    const date = debit.date.slice(0, 10);
    return (
      <li key={debit.id}>
        {debit.amount} {debit.description} {date}
      </li>
    );
  });

  return (
    <div>
      <h1>Debits</h1>
      <ul>{debits}</ul>
      <form onSubmit={handleAddDebit}>
        <input type="text" name="description" />
        <input type="number" name="amount" />
        <button type="submit">Add Debit</button>
      </form>

      <AccountBalance accountBalance={props.accountBalance} />
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;
