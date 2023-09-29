import { NextFunction, Request, Response } from "express"
import prisma from "../lib/prisma"


const PaymentController = {
  async addPayment(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('PaymentsController.createPayment')
      const groupId = req.params.groupId
      const { type, purpose, amount, splits } = req.body
      console.log({ type, purpose, amount, groupId, splits })
      const createdPayment = await prisma.payment.create({
        data: { type, purpose, amount,
          groupId,
          split: {
            create:  {split0: 3000,
                            split1: -1000,
                          split2: -1000,
                            split3: -1000
                        }
        }
      }
      })
      res.status(201).json(createdPayment)
    } catch (e) {
      console.log('error:', e)
      res.status(400).end()
    }
  },

async getDetailedPayments(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('PaymentController.getPayments')
    const groupId = req.params.groupId
    const payments = await prisma.payment.findMany({
      where: {
        groupId: groupId
      }
    })

    res.status(200).json(payments)


  } catch(e) {
    console.log('error:', e)
    res.status(400).end()
  }
}


}

export default PaymentController