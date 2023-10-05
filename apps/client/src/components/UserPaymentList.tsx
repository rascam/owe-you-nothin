import { User } from "@/lib/context/activeUserContext"
import fetcher from "../lib/fetcher"
import useSWR from "swr"
import { BASE_URL } from "@/lib/const"
import { Card } from "./shadcn/ui/card"



interface Props {
  groupId: string
  activeUser: User | undefined
}

interface PaymentObject {
  id: number
  splitAmount: number
  paymentId: number
  userId: number
  payment: {
    id: number
    groupId: string
    type: 'payment' | 'transaction'
    payingUserId: number
    amount: number
    currency: string
    purpose: number
    payingUser: {
      username: string
    }
  }
}


function UserPaymentList({groupId, activeUser}: Props) {


  const {data, error, isLoading} =  useSWR(`${BASE_URL}/${groupId}/${activeUser?.id}/payments`, fetcher ,{ refreshInterval: 500 })

  if (error || !data) return <div>Please identify yourself on the Home Page.</div>
  if (isLoading) return <div>loading...</div>

  if (data.length === 0) return (
    <p className="mt-14">You havn no expenses yet.</p>
  )


  const payments = data.map((e: PaymentObject) => {
    return (
      <Card key={e.id} className="p-3 mb-3 text-sm rounded-md">
      <li>
        <p >{e.payment.payingUserId === activeUser?.id ? <strong>You</strong> : e.payment.payingUser.username} paid for {e.payment.purpose ? e.payment.purpose : "something" }: <strong>{e.payment.payingUserId === activeUser?.id ? (e.splitAmount/100).toFixed(2) : (e.splitAmount/100).toFixed(2)}€</strong></p>
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


export default UserPaymentList

