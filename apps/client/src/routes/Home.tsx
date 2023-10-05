import { useParams } from "react-router-dom"

import fetcher from "../lib/fetcher"
import useSWR  from "swr"
import { BASE_URL } from "@/lib/const"


import Navigation from "@/components/Navigation"
import Balance from "../components/Balance"


import { Toaster } from "@/components/shadcn/ui/toaster"

import { useContext } from "react"
import { ActiveUserContext } from "@/lib/context/activeUserContext"
import SelectUser from "@/components/SelectUser"
import AddExpenseForm from "@/components/AddExpenseForm"


// import { User } from "@/lib/context/activeUserContext"

function Home() {
  
  const {groupId} = useParams() || ''

  const {activeUser} = useContext(ActiveUserContext)

  const {data, error, isLoading} =  useSWR(`${BASE_URL}/${groupId}/users`, fetcher,{ refreshInterval: 500 }) 
  
  if (error || !data) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
      <div className="app">
        <Navigation groupId={groupId}/>
        <h1 className="mt-14">Home</h1>
         {/* <h2>Group: {groupId}</h2>
        <img className="w-8" src="./Logo.JPG"></img>
        <h1 className='bg-lime-600'>Ow' You Nothin'</h1> */}
        <div className="flex flex-col gap-4 items-center">
        <SelectUser userlist={data}></SelectUser>
        { activeUser &&
        <Balance  groupId={groupId} activeUser={activeUser}/> }
        { activeUser && groupId &&
        <AddExpenseForm groupId={groupId} activeUser={activeUser} userlist={data}/>}

        <Toaster />
        </div>
      </div>
  )
}

export default Home
