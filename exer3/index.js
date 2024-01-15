require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(
    morgan(function (tokens, req, res) {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            JSON.stringify(req.body)
        ].join(' ')
    }))

app.get('/info', (request, response) => {
    //   response.send({ personsLength: persons.length, requestTime: Date.now() })
    response.send(`Phonebook has info for ${persons.length} people<br/>${new Date()}`)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => response.json(persons))

})

app.post('/api/persons', (request, response) => {
    const reqBody = request.body;
    // if (!reqBody.name || !reqBody.number || reqBody.name === '' || reqBody.number === '') {
    //     response.status(500).send('Bad body').end()
    //     return
    // }

    // if (persons.map(p => p.name).find(name => name === reqBody.name)) {
    //     response.status(500).send({ error: 'name must be unique' }).end()
    //     return
    // }

    // if (persons.map(p => p.number).find(number => number === reqBody.number)) {
    //     response.status(500).send({ error: 'number must be unique' }).end()
    //     return
    // }

    const newPerson = new Person(
        {
            "id": Math.floor(Math.random() * 100000),
            "name": reqBody.name,
            "number": reqBody.number,
        })
    newPerson.save().then(res => {
        console.log('person saved!')
        response.json(res)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})