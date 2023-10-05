import { PersonIcon, PlusIcon } from "@radix-ui/react-icons"
import { Button } from "./shadcn/ui/button"
import { Input } from "./shadcn/ui/input"
import { useState } from "react"
import API from "@/api/api"
import { useToast } from "./shadcn/ui/use-toast"
import { useNavigate } from "react-router-dom"


function CreateGroup () {


const { toast } = useToast()

  const [inputName, setInputName] = useState('')

  const navigate = useNavigate()

  const inputChangeHandler = (e) => {
    setInputName(e.target.value)
  }

 const addUserHandler = async (event) => {
    event.preventDefault()
    const createdGroup = await API.createGroup(inputName)
    toast({
      description: "Group successfully created.",
      duration: 2000
    })

    const url = `/${createdGroup.id}/members`
    navigate(url)
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



export default CreateGroup