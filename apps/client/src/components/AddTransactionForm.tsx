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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select"
import { useState } from "react"


interface AddExpenseFormProps {
  groupId: string
  activeUser: User | undefined,
  userlist: User[]
}

function AddTransactionForm ({groupId, activeUser}:AddExpenseFormProps) {

  const userlist = [{username: "Arol", id: 34}, {username: "Ruben", id: 12}, {username: "Edu", id: 26}]


  const { toast } = useToast()

  const [selectedUser, setSelectedUser] = useState(userlist[0].id)

async function onSubmitHandler (values: z.infer<typeof formSchema>) {
   if (!(activeUser === undefined)) {

    // create transaction record data
    const payingUserId = activeUser.id
    const type = 'transaction'
    let splits = []
    if(userlist.length > 1) {

      splits = [{ userId: activeUser.id, splitAmount: values.amount },
                { userId: values.purpose, splitAmount: -values.amount }]
   
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
      groupId, payingUserId, values.amount, type, splits, values.purpose )

    if (createdPayment) {
      toast({
        description: "Transaction created.",
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


const items = userlist.map((e: User) => {
  if(e.id)
  return (
    <SelectItem key={e.id} value={e.id.toString()}>
      {e.username}
    </SelectItem>
  )
})


  return (
    <div className="mt-6">
      <Card className="p-8">
    <h2 className="text-center mb-9">Returning money</h2>
   
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-8">
          <div className="mt-6 mr-2 flex">
          <span>I gave</span>
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
        
          <span className="mr-3">to</span>
          <FormField
            control={form.control}
            name="purpose"
            render={
              ({field}) => (
                <FormItem>
                  <FormControl>
                    <Select className="mx-3"  defaultValue={userlist[0].id.toString()} {...field}>
      <SelectTrigger className="w-[180px]" >
        <SelectValue placeholder="select member" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items}
        </SelectGroup>
      </SelectContent>
    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }/>
            </div>
            <Button className="mr-2" type="submit">Add transaction</Button>
            <Button type="button" variant="outline">Reset</Button>
        </form>
      </Form>
      </Card>
      </div>

  )
}

export default AddTransactionForm