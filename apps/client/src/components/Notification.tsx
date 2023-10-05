import { Button } from "./shadcn/ui/button";
import { useToast } from "./shadcn/ui/use-toast";

interface NotificationProps {
  text: string
  title?: string
}


function Notification({text, title}: NotificationProps) {
  const { toast } = useToast()
 
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: title,
          description: text,
        })
      }}
    >
      Show Toast
    </Button>
  )
}

export default Notification