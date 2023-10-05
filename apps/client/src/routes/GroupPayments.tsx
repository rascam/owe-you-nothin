import { useParams } from "react-router-dom"
import Navigation from "@/components/Navigation"
import GroupPaymentList from "../components/GroupPaymentList"

import { useContext } from "react"
import { ActiveUserContext } from "@/lib/context/activeUserContext"


function GroupPayments () {

  const {groupId} = useParams()

  const {activeUser} = useContext(ActiveUserContext)

  return (
    <div className="app">
    <Navigation groupId={groupId}/>
     <h1 className="mt-14">Group Expenses</h1> 
     <div className="flex flex-col gap-4 items-center">
    <GroupPaymentList groupId={groupId} activeUser={activeUser}/>
    </div>
    </div>
  )
}

export default GroupPayments