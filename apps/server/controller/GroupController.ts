import { NextFunction, Request, Response } from "express"
import prisma from "../lib/prisma"


const GroupController = {
  async createGroup(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('GroupController.createGroup')
      const { username} = req.body
      console.log({username})
      const groupName="XYZ"
      const createdGroup = await prisma.group.create({
        data: { groupName,
          members:{ create: [
            {username: username}
          ]},
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
  },


  async getGroupBalances(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('GroupController.getGroupBalances')
      const groupId = req.params.groupId
      // const groupWithBalances = await prisma.split.groupBy({
      //   by: ['userId'],
      //   _sum: {
      //     splitAmount: true,
      //   },
      //   where: {
      //     payment: {
      //       groupId: groupId,
      //     },
      //   },
      // });

      const groupWithBalances = await prisma.$queryRaw`
        SELECT u.id as userId, COALESCE(SUM(s."splitAmount"), 0) as balance, u.username as username
        FROM "User" u
        LEFT JOIN "Split" s ON u.id = s."userId"
        WHERE u."groupId" = ${groupId}
        GROUP BY u.id
      ` as Array<{userid: string, username: string, balance: bigint}>

      
      // if (!groupWithBalances) {
      //   console.log('Group not found')
      //   return []
      // }
    
      const userSplitAmounts = groupWithBalances.map((member) => ({
        userId: member.userid,
        username: member.username,
        balance: Number(member.balance),
      }))
  
      res.status(200).json(userSplitAmounts)
    } catch (e) {
      console.log('error:', e)
      res.status(400).end()
    }
  }
}


export default GroupController