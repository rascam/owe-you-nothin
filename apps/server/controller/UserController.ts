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

  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('UserController.addUser')
      const groupId = req.params.groupId
      const { name, pos} = req.body
      console.log({ name, pos})
      const createdGroup = await prisma.user.create({
        data: { name, groupId, pos }
      })

      res.status(201).json(createdGroup)
    } catch (e) {
      console.log('error:', e)
      res.status(400).end()
    }
  },

}

export default UserController
