import { useParams } from "react-router-dom"
import UserList from "../components/UserList"
import Navigation from "@/components/Navigation"
import ShareLink from "@/components/ShareLink"
import AddUser from "@/components/AddUser"
import { Toaster } from "@/components/shadcn/ui/toaster"






function Members () {

  const {groupId} = useParams()


  return (
    <div className="app">
    <Navigation groupId={groupId}/>
     <h1 className="mt-14">Group Members</h1>
     <div className="flex flex-col gap-4 items-center">
    <ShareLink groupId={groupId} disabled={false}/>
    <UserList groupId={groupId? groupId : 'xxx'}/>
    <AddUser groupId={groupId}/>
    <Toaster />
    </div>
    </div>
  )
}

export default Members