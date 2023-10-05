import fetcher from "../lib/fetcher"
import useSWR from "swr"
import { BASE_URL } from "@/lib/const"
import { calculateTransactions, HasToPay } from "@/lib/calculateTransactions"
import { User } from "@/lib/context/activeUserContext"


interface TransactionSchemaProps {
  groupId: string | undefined
  activeUser: User | undefined
}


function TransactionSchema ({groupId, activeUser}:TransactionSchemaProps){

  const {data, error, isLoading} = useSWR(`${BASE_URL}/${groupId}/balances`, fetcher ,{ refreshInterval: 500 })

  if (error || !data) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>



  const transactions:HasToPay[] = calculateTransactions(data)

  const transactionList = transactions.map( (e, index) => {
    return (
      <div key={index}>
        <li>
          <p className="font-normal mb-2">{e.from === activeUser?.username ?<strong>You</strong> : e.from} should give <strong>{(e.amount/100).toFixed(2)}€</strong> to {e.to === activeUser?.username ?<strong>you</strong> : e.to}.</p>
        </li>
      </div>
    )
  })


  if (transactionList.length === 0) return (
    <p className="mt-14">No one has to return any money to anyone.</p>
  )


  return (
    <div className="mt-8">
      {transactionList}
    </div>
  )

}

export default TransactionSchema