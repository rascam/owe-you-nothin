import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { User } from "@/lib/context/activeUserContext"
import { Button } from "./shadcn/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./shadcn/ui/form"
import { Input } from "./shadcn/ui/input"
import API from "@/api/api"
import { useToast } from "./shadcn/ui/use-toast"
import { Card } from "./shadcn/ui/card"


interface AddExpenseFormProps {
  groupId: string
  activeUser: User | undefined,
  userlist: User[]
}

function AddExpenseForm ({groupId, activeUser, userlist}:AddExpenseFormProps) {

  const { toast } = useToast()

async function onSubmitHandler (values: z.infer<typeof formSchema>) {
   if (!(activeUser === undefined)) {

    // create split record data
    const payingUserId = activeUser.id
    const type = 'payment'
    let splits = []
    if(userlist.length > 1) {
   
    const splittedExpense = Math.floor(values.amount*100 / userlist.length)
    const payersExpense = splittedExpense*(userlist.length-1)
    splits = userlist.map( (user) => {
      const splitAmount = user.id === payingUserId ?
       payersExpense
       : -splittedExpense
       return { userId: user.id, splitAmount }
       })
       
      }

    // send data to backend 
    const createdPayment = await API.addPayment(
      groupId, payingUserId, (values.amount*100), type, splits, values.purpose )

    if (createdPayment) {
      toast({
        description: "Expense created.",
        duration: 2000
      })
    }
  }
  }   

  const formSchema = z.object({
    /* payingUser: z.number({
      required_error: "Please select the paying group member."}).int().positive(), */
    amount: z.preprocess(
      (str) => parseFloat(
        z.string().parse(str)),
        z.number().gt(0,{message: "Please enter an amount."})
    ),
    purpose: z.string().max(30,{
      message: "Name must be at less than 20 characters.",
    }),
   /*  date: z.date().max(new Date(), { message: "Date can't be in the future." }) */
  })

  
  const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    amount: "",
    purpose: "",
  },
})


  return (
    <div className="mt-6">
      <Card className="p-8">
    <h2 className="text-center mb-9">Add expense</h2>
   
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-8">
          <div className="mt-6 flex">
          <span>{activeUser?.username} spent</span>
          <FormField
            control={form.control}
            name="amount"
            render={
              ({field}) => (
                <FormItem>
                  <FormControl>
                    <Input className="w-24 mx-3" placeholder="0" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    Enter your amount.
              </FormDescription>*/}
                  <FormMessage />
                </FormItem>
              )
            }/>
            <span>€</span>
            </div>
            <div className="flex">
        
          <span>for</span>
          <FormField
            control={form.control}
            name="purpose"
            render={
              ({field}) => (
                <FormItem>
                  <FormControl>
                    <Input className="mx-3" placeholder="purpose (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }/>
            </div>
            <Button className="mr-2" type="submit">Add expense</Button>
            <Button type="button" variant="outline">Reset</Button>
        </form>
      </Form>
      </Card>
      </div>

  )

}

export default AddExpenseForm