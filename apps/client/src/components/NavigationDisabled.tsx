
import { Button } from "./shadcn/ui/button"
import { GearIcon, HomeIcon, PersonIcon, ActivityLogIcon, ResetIcon } from "@radix-ui/react-icons"


function NavigationDisabled () {
  return (
    <nav className="app fixed flex gap-2 mb-4 px-1 bg-slate-50">
      <Button><HomeIcon className="h-4 w-4 opacity-40" /></Button>
      <Button><div className="flex"><PersonIcon className="mr-1 h-4 w-4 opacity-40"/><ActivityLogIcon className="h-4 w-4 opacity-40"/></div></Button>
      <Button><div className="flex"><PersonIcon className="h-4 w-4 opacity-40"/><PersonIcon className="h-4 w-4 opacity-40"/><PersonIcon className="mr-1 h-4 w-4 opacity-40"/><ActivityLogIcon className="h-4 w-4 opacity-40"/></div></Button>
      <Button>< ResetIcon className="h-4 w-4 opacity-40"/></Button>
      <Button><GearIcon className="h-4 w-4 opacity-40"/></Button>
    </nav>
  )
}


export default NavigationDisabled
