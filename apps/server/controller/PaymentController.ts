import { NextFunction, Request, Response } from "express"
import prisma from "../lib/prisma"


const PaymentController = {
  async addPayment(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('PaymentsController.addPayment')
      const groupId = req.params.groupId
      console.log('BODY', req.body)
      const { payingUserId, type, purpose, amount, splits } = req.body
      console.log({ groupId, type, purpose, amount, payingUserId, splits })
      const createdPayment = await prisma.payment.create({
        data: { type, purpose, amount, payingUserId, groupId,
          splits: {
            create: splits
          }
      }
      })
      res.status(201).json(createdPayment)
    } catch (e) {
      console.log('error:', e)
      res.status(400).end()
    }
  },

async getGroupPayments(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('PaymentController.getGroupPayments')
    const groupId = req.params.groupId
    const payments = await prisma.payment.findMany({
      where: {
        groupId: groupId
      },
      include: {
        payingUser: {
          select: {
            username: true
         
              
            
          }
        }
      }
    })
    /* const payments = await prisma.payment.findMany({
      where: {
        groupId: groupId
      }
    }) */
    res.status(200).json(payments)


  } catch(e) {
    console.log('error:', e)
    res.status(400).end()
  }
},
async getUserPayments(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('PaymentController.getUserPayments')
    const groupId = req.params.groupId
    const userId = parseInt(req.params.userId)
    const payments = await prisma.split.findMany({
      where: {
        userId: userId
      },
      include: {
        payment: {
          include: {
            payingUser: {
              select: {
                username: true
              }
            }
          }
        }
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