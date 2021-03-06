require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(express.json())
app.use(cors())
app.use(express.static("build"))

const Note = require('./models/note')

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(
    notes => {
      response.json(notes)
    }
  )
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})


app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined){
    return response.status(400).json({error: 'content missing'})
  }

  const note = new Note({
    content: body.content,
    important: body.important,
    date: new Date()
  })

  note.save().then(
    savedNote => {
      response.json(savedNote)
    }
  )
});

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log('listening on port ' + PORT)
})





// get route before Mongoose
// 
// app.post('/api/notes', (request, response) => {
//   const body = request.body

//   if (!body.content) {
//     return response.status(400).json({ 
//       error: 'content missing' 
//     })
//   }
//   const note = {
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//     id: generateId(),
//   }

//   notes = notes.concat(note)

//   response.json(note)
// })


// notes before Mongoose
// 
// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true
//   }
// ]

// const generateId = () => {
//   const maxId = notes.length > 0
    // ? Math.max(...notes.map(n => n.id))
//     : 0
//   return maxId + 1
// }