import { Share2Icon } from "@radix-ui/react-icons";
import { Button } from "./shadcn/ui/button";
import { useToast } from "./shadcn/ui/use-toast";



interface ShareLinkProps {
  groupId: string | undefined
  disabled: boolean
}


function ShareLink ({groupId, disabled}:ShareLinkProps) {

  const { toast } = useToast()

  async function copyLinktoClipboard() {
    const grouplink = `http://localhost:5173/${groupId}`
    console.log('CLICK', grouplink)
    toast({
      description: "Grouplink copied to clipboard!",
      duration: 2000
    })
    await navigator.clipboard.writeText(grouplink)
  }


  return (
  <Button className="my-5" onClick={copyLinktoClipboard} disabled={disabled} >
    <Share2Icon className="mr-2 h-4 w-4"/>  Copy and Share Group Link
    </Button>
  )
}

export default ShareLink