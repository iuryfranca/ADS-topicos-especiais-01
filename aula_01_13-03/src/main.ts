import express from 'express'
import router from './router'

const app = express()
const port = 3000

app.use(express.json())
app.use(router)

app.listen(port, function () {
  console.log(`API up na port:${port}`)
})

// const fs = require('fs')
// try {
//   //   const jsonString = fs.readFileSync('contatos.json')
//   const jsonString = fs.readFileSync(`${__dirname}\\contatos.json`)
//   console.log(JSON.parse(jsonString))
// } catch (err) {
//   console.log(err)
// }

// const path = '/contatos.json'

// try {
//   fs.accessSync(`${__dirname}${path}`)
//   console.log('file exists')
// } catch (err) {
//   console.log('file not found')
//   console.error(err)
// }
