const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstackopen:${password}@cluster0.69ogf1r.mongodb.net/fullstackopen_phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3)
{
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(() => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}

Person
  .find({})
  .then(persons => {
    mongoose.connection.close()
    console.log('phonebook:')
    persons.map(p => console.log(`${p.name} ${p.number}`))
  })