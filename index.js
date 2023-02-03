// cria uma variável

/*  888 const express = require('express') // nome exato do framework instalado

//  express(). pode ser utilizado assim como função.
// OU criar uma variável p armazenar o express:

const app = express()
const port = 3002

//para criar rota:
app.get('/users', (request, response) => {

    /* const name = request.query.name
    const age =request.query.age
    console.log(name, age) */

    //Há uma maneira de economizar código
    // Destructuring assignmrnt
    // 888 const { name, age } = request.query


    /*return response.send("Hello, I'm Amanda")*/
    //return response.json({name: name, age: age})

  /* ///  return response.json({ name, age })
})

// código da porta p express - obrigatório
app.listen(port, () => {
    console.log(`😌 Server started on port ${port}`)
}) 
*/

const { request, response } = require('express')
const express = require('express')
const uuid = require('uuid')


const port = 3002
const app = express()
app.use(express.json())


const users = []
const checkUserId = (request, response, next) => {
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)    

    if(index < 0){
        return response.status(404).json({ error: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

/*const myFirstMiddleware = (request, response, next) => {
        console.log('FUI CHAMADO')
        next()
        console.log('finalizamos')
}
app.use(myFirstMiddleware)*/

app.get('/users', (request,response) => {
    
    return response.json(users)
})

app.post('/users', (request,response) => {
    const {name, age } = request.body
    const user = {id: uuid.v4(), name, age}
    users.push(user)
    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request,response) => {
    /*const {id} = request.params*/
    const {name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age}

    /*const index = users.findIndex(user => user.id === id)
    
    if(index < 0){
        return response.status(404).json({ message: "User not found"})
    }*/

    users[index] = updateUser
    return response.json(updateUser)
    
})

app.delete('/users/:id', checkUserId, (request,response) => {
    /*const {id} = request.params*/
    
   /* const index = users.findIndex(user => user.id === id)
    if(index < 0){
        return response.status(404).json({ message: "User not found"})
    }*/
    const index = request.userIndex
    users.splice(index, 1)


    return response.status(204).json()
})



app.listen(port, () => {
    console.log(`😌 Server started on port ${port}`)
}) 

