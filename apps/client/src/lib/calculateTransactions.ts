
export interface UserBalance {
  userId: number
  balance: number
  username: string
}

export interface HasToPay {
  from: string
  to: string
  amount: number
}

export function calculateTransactions(raw: UserBalance[]):HasToPay[] {
  const array = window.structuredClone(raw)
  const consolidatedTransactions:HasToPay[] = []

  let indexMaxBalance = -1
  let indexMinBalance = -1

  for (let loop = 0; loop < array.length; loop++) {
    let maxBalance = array[0].balance
    indexMaxBalance = 0
    let minBalance = array[0].balance
    indexMinBalance = 0

   for (let i= 1; i < array.length; i++) {
    if (array[i].balance < minBalance ) {
      minBalance = array[i].balance
      indexMinBalance = i
    }
    if (array[i].balance > maxBalance ) {
      maxBalance = array[i].balance
      indexMaxBalance = i
    }
     }
    if(indexMinBalance === indexMaxBalance) break  // exit loop when all balances are equal

      // Let lowest creditor (= highest debitor) pay to highest creditor
      // determine the highest amount possible
      const transferableAmount = Math.min(
        Math.abs(array[indexMinBalance].balance),
        Math.abs(array[indexMaxBalance].balance))
      // update the transaction list
      consolidatedTransactions.push({from: array[indexMinBalance].username, to: array[indexMaxBalance].username, amount: transferableAmount})
       
      // Update the totals
    array[indexMaxBalance].balance -= transferableAmount
    array[indexMinBalance].balance += transferableAmount
    
  } 
  return consolidatedTransactions
}
