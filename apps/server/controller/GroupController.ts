import { NextFunction, Request, Response } from "express"
import prisma from "../lib/prisma"


const GroupController = {
  async createGroup(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('GroupController.createGroup')
      const { groupName, payments, groupEmail, members, splits} = req.body
      console.log({ groupName, payments, groupEmail, members, splits})
      const createdGroup = await prisma.group.create({
        data: { groupName, groupEmail,
          members:{ create: []},
          payments:{create: []}
         }
      })

      res.status(200).json(createdGroup)
    } catch (e) {
      console.log('error:', e)
      res.status(400).end()
    }
  },

  async getGroup(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('GroupController.getGroup')
      console.log(req.params.groupId)
      const group = await prisma.group.findUniqueOrThrow({
        where: {
          id: req.params.groupId
        }
      })
      res.status(200).json(group)
    } catch (e) {
      console.log('error:', e)
      res.status(400).end()
    }
  }
}

export default GroupController