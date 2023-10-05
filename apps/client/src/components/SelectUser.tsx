
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select"


import { User } from "@/lib/context/activeUserContext"
type SelectUserProps = {
  userlist: User[]
}

import { useContext } from "react"
import { ActiveUserContext } from "@/lib/context/activeUserContext"

function SelectUser( {userlist}:SelectUserProps) {


  const {activeUser, setActiveUser} = useContext(ActiveUserContext)

  const changeUserHandler = (e: string) => {
    console.log('CHANGE!')
    const userObj = userlist.find( (obj:User) => obj.id === parseInt(e)) 
    console.log(userObj)
    if (userObj) setActiveUser(userObj)
  }

  const items = userlist.map((e: User) => {
    if(e.id)
    return (
      <SelectItem key={e.id} value={e.id.toString()}>
        {e.username}
      </SelectItem>
    )
  })

  return (
    <Select onValueChange={changeUserHandler} defaultValue={activeUser?.id?.toString()}>
      <SelectTrigger className="w-[180px]" >
        <SelectValue placeholder="Who are you?" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectUser