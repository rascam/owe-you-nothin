import { useParams } from "react-router-dom"
import Navigation from "@/components/Navigation"
import TransactionSchema from "@/components/TransactionSchema"

import { useContext } from "react"
import { ActiveUserContext } from "@/lib/context/activeUserContext"
import AddTransactionForm from "@/components/AddTransactionForm"

function Schema () {

  const {groupId} = useParams()

  const {activeUser} = useContext(ActiveUserContext)

  return (
    <div className="app">
     <Navigation groupId={groupId}/>
    <h1 className="mt-14">Payment Schema</h1> 
    <div className="flex flex-col gap-4 items-center">
    <TransactionSchema groupId={groupId} activeUser={activeUser}/>
    <AddTransactionForm groupId={groupId} activeUser={activeUser}/>
    </div>
    </div>
  )
}

export default Schema