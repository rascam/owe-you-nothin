import { useParams } from "react-router-dom"
import Navigation from "@/components/Navigation"
import UserPaymentList from "@/components/UserPaymentList"

import { useContext } from "react"
import { ActiveUserContext } from "@/lib/context/activeUserContext"

function UserPayments () {

  const {groupId} = useParams()


  const {activeUser} = useContext(ActiveUserContext)


  return (
    <div className="app">
    <Navigation groupId={groupId} />
     <h1 className="mt-14">Your Expenses</h1>
     <div className="flex flex-col gap-4 items-center">
    <UserPaymentList groupId={groupId} activeUser={activeUser}/>
    </div>
    </div>
  )
}

export default UserPayments