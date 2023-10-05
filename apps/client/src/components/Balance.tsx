import fetcher from "../lib/fetcher"
import useSWR from "swr"
import { User } from "@/lib/context/activeUserContext"
import { BASE_URL } from "@/lib/const"

interface Props {
  groupId: string | undefined,
  activeUser: User | undefined
}


function Balance({groupId, activeUser}: Props) {
  
/*   if (!activeUser) return (
    <p>Please first identify above.</p>
  ) */

  const {data, error, isLoading} = useSWR(`${BASE_URL}/${groupId}/${activeUser?.id}/balance`, fetcher ,{ refreshInterval: 500 })

  if (error || !data) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div className="text-center">
      {/* <BalanceHead loginUser={loginUser} /> <BalanceControllers /> */}
      <h2>Your balance:</h2>
    <h1>{data.userBalance/100} €</h1>
   </div> 
  )
}


export default Balance

