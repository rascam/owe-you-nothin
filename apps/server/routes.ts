 import express from 'express'
 import GroupController from './controller/GroupController'
 import UserController from './controller/UserController'
 import PaymentController from './controller/PaymentController'
 
 

 import cors from 'cors'


const PORT = 8080

const server = express()

// MIDDLEWARE
server.use(cors())
server.use(express.json())


// ENDPOINTS
server.post('/groups', GroupController.createGroup)
server.get('/:groupId/groups', GroupController.getGroup)
server.get('/:groupId/balances', GroupController.getGroupBalances)


server.post('/:groupId/users', UserController.addUser)
server.get('/:groupId/users', UserController.getUsers)
server.get('/:groupId/:userId/balance', UserController.getUserBalance)

server.post('/:groupId/payments', PaymentController.addPayment)
server.get('/:groupId/payments', PaymentController.getGroupPayments)
server.get('/:groupId/:userId/payments', PaymentController.getUserPayments)




export default function startServer() {
  server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
  })
}
