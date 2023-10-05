import { PersonIcon, PlusIcon } from "@radix-ui/react-icons"
import { Button } from "./shadcn/ui/button"
import { Input } from "./shadcn/ui/input"
import { useState } from "react"
import API from "@/api/api"
import { useToast } from "./shadcn/ui/use-toast"



type AddUserProps = {groupId: string | undefined}

function AddUser ({groupId}:AddUserProps) {


const { toast } = useToast()

  const [inputName, setInputName] = useState('')


  const inputChangeHandler = (e) => {
    setInputName(e.target.value)
  }

 const addUserHandler = async (event) => {
    event.preventDefault()
    const createdUser = await API.addUser(groupId, inputName)
    toast({
      description: `${inputName} successfully added.`,
      duration: 2000
    })
    setInputName('')
  }

  return (
    <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
    <Input onChange={inputChangeHandler} placeholder="add a new group member" value={inputName}></Input>
    <Button onClick={addUserHandler} type='submit'>
      <PlusIcon />
      <PersonIcon />
    </Button>
    </div>
  )
}



export default AddUser