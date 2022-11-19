import Table  from "react-bootstrap/Table"
import moment from "moment"
import { TransactionsRes } from "../interface"

export default function TransactionsTable({ transactions }: TransactionsRes[] | any) {
  return (
    <div>
      <Table style={ { color: 'white' } }>
        <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Value</th>
            <th>Cash out user</th>
            <th>Cash in user</th>
            <th>Fullfilled</th>
          </tr>
        </thead>
        <tbody>
          { transactions.map((transaction: TransactionsRes) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.value}</td>
              <td>{transaction.debitedAccount.username}</td>
              <td>{transaction.creditedAccount.username}</td>
              <td>{moment(transaction.createdAt).format('DD/MM/YYYY')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}