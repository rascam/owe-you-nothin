import fetcher from "../lib/fetcher"
import useSWR from "swr"
import { User } from "@/lib/context/activeUserContext"
import { Card } from "./shadcn/ui/card"




const BASE_URL = 'http://localhost:8080'

interface Props {
  groupId: string
  activeUser: User | undefined
}

interface PaymentObject {
  id: number
  payingUserId: null | number
  amount: number
  purpose: number
  payingUser: {
    username: string
  }
}


function GroupPaymentList({groupId, activeUser}: Props) {

  const {data, error, isLoading} =  useSWR(`${BASE_URL}/${groupId}/payments`, fetcher ,{ refreshInterval: 500 })

  if (error || !data) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  if (data.length === 0) return (
    <p className="mt-14">There are no expenses yet.</p>
  )

  const payments = data.map((e: PaymentObject) => {
    return (
 
     <Card key={e.id} className="p-3 mb-3 text-sm rounded-md">
      <li >
        <span>{e.payingUserId=== activeUser?.id ? <strong>You</strong> : e.payingUser.username} paid for {e.purpose ? e.purpose : "something" }: <strong>{(e.amount/100).toFixed(2)}€</strong></span>
      </li>
      </Card>
    )
  })

  return (
    
    <div className="px-3">
      {payments}
      </div>
      )
}


export default GroupPaymentList

