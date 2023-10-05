import fetcher from "../lib/fetcher"
import useSWR from "swr"
import { BASE_URL } from "@/lib/const"


interface Props {
  groupId: string
}

interface UserObject {
  id: number
  username: string
}


function UserList({groupId}: Props) {

  const {data, error, isLoading} =  useSWR(`${BASE_URL}/${groupId}/users`, fetcher ,{ refreshInterval: 500 })

  if (error || !data) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  const groupmembers = data.map((e: UserObject) => {
    return (
      <li key = {e.id}>
        <span>{e.username}</span>
      </li>

    )
  })

  return (
    <div>
      {groupmembers}
      </div>
    
  )
}


export default UserList

