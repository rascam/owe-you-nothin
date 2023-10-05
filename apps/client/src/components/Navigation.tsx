import { Link } from "react-router-dom"
import { Button } from "./shadcn/ui/button"
import { GearIcon, HomeIcon, PersonIcon, ActivityLogIcon, ResetIcon } from "@radix-ui/react-icons"
// import { ModeToggle } from "./shadcn/ui/mode-toggle"
// import CircleArrowIcon from "./CircleArrowIcon"

type NavigationProps = { groupId: string | undefined}

function Navigation ({groupId}: NavigationProps) {
  return (
    <nav className="fixed flex gap-2 mb-4 px-1">
      <Button><Link to={`/${groupId}`}><HomeIcon className="h-4 w-4" /></Link></Button>
      <Button><Link to={`/${groupId}/userpayments`}><div className="flex"><PersonIcon className="mr-1 h-4 w-4"/><ActivityLogIcon /></div></Link></Button>
      <Button><Link to={`/${groupId}/grouppayments`}><div className="flex"><PersonIcon className="h-4 w-4"/><PersonIcon className="h-4 w-4"/><PersonIcon className="mr-1 h-4 w-4"/><ActivityLogIcon /></div></Link></Button>
      <Button><Link to={`/${groupId}/payingschema`}>< ResetIcon className="h-4 w-4"/></Link></Button>
      <Button><Link to={`/${groupId}/members`}><GearIcon className="h-4 w-4"/></Link></Button>
      {/* <ModeToggle /> */}
      
    
    </nav>
  )
}


export default Navigation
