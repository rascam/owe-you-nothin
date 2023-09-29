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

server.post('/:groupId/users', UserController.addUser)
server.get('/:groupId/users', UserController.getUsers)

server.post('/:groupId/payments', PaymentController.addPayment)
server.get('/:groupId/payments', PaymentController.getDetailedPayments)



export default function startServer() {
  server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
  })
}
