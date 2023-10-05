import { NextFunction, Request, Response } from "express"
import prisma from "../lib/prisma"


const UserController = {
  async getUsers(req:Request, res: Response, next: NextFunction) {
    try {
    console.log('UserController.getUser')
    const groupId = req.params.groupId
    console.log({groupId})
      const users = await prisma.user.findMany({
        where: {
          groupId: groupId
        }
      })
    res.status(200).json(users)
  } catch (e) {
    console.log('error:', e)
    res.status(400).end()
  }
  },

  async getUserBalance(req:Request, res: Response, next: NextFunction) {
    try {
    console.log('UserController.getBalance')
    const userId = parseInt(req.params.userId)
    console.log({userId})
      const data = await prisma.split.aggregate({
        where: {
          userId: userId,
        },
        _sum: {
          splitAmount: true,
        },
      })
      

    res.status(200).json({userBalance: data._sum.splitAmount})
  } catch (e) {
    console.log('error:', e)
    res.status(400).end()
  }
  },

  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('UserController.addUser')
      const groupId = req.params.groupId
      const { username} = req.body
      console.log({ username, groupId})
      const createdUser = await prisma.user.create({
        data: {username, groupId }
      })

      res.status(201).json(createdUser)
    } catch (e) {
      console.log('error:', e)
      res.status(400).end()
    }
  },



}

export default UserController
