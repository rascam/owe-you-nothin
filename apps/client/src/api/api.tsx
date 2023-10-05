import { BASE_URL } from "@/lib/const"

interface Split {
    userId: number
    splitAmount: number
  }

const API = {
    getDetailedPayments() {
    return [{name: "inside getDetailedPayments"}]
    },

    async createGroup(username: string) {

      try {
      const url = `${BASE_URL}/groups`
  
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username})
      }
  
      const response = await fetch(url, options)
      const data = await response.json()
  
      return data
    } catch(err) {
      console.log('error:', err)
    }
    },
  
    // getUserIdByName

    async addUser(groupId: string, username: string) {

    try {
    const url = `${BASE_URL}/${groupId}/users`

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username})
    }

    const response = await fetch(url, options)
    const data = await response.json()

    return data
  } catch(err) {
    console.log('error:', err)
  }
  },

  async addPayment(groupId:string, payingUserId:number, amount: number, type: string,  splits: Split[], purpose?: string) {

    try {
    const url = `${BASE_URL}/${groupId}/payments`
    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        payingUserId,
        amount,
        purpose,
        type: 'payment',
        splits : splits
        })
    }
    const response = await fetch(url, options)
    const parsed = await response.json()
    if (!response.ok) {
      console.log('ok', response.ok)
      console.log('status', response.status)
      console.log('statusText', response.statusText)
      alert(parsed.error)
      return {}
    }
    return parsed
  } catch(err) {
    console.log('error:', err)
  }

}
}
export default API
