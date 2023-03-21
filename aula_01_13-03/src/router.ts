import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'

interface contactsI {
  id: number
  name: string
  email: string
}

const router = Router()
const contacts = [] as contactsI[]

router.get('/', (req, res) => {
  res.send({
    api_name: 'api-contatos',
    descricao: 'API para gestão de contatos',
    status: 'OK',
  })
})

router.get('/sobre', (req, res) => {
  res.send({
    name: 'João Teixeira',
    email: 'joao.teixeira@ifro.edu.br',
    github: 'github.com/joaoteixeira',
  })
})

router.get('/contatos', (req, res) => {
  const mensagem = {
    message: 'Não existe contato cadastrado',
  }

  res.send(contacts.length > 0 ? contacts : mensagem)
})

//---------------------------------------------------

router.post('/contato', (req, res) => {
  let ok = true
  let mensagem = 'Contato salvo com sucesso!'

  const inputs = [
    {
      name: 'name',
      message: 'A propriedade [name] não deve estar em indefinida/vazio!',
    },
    {
      name: 'email',
      message: 'A propriedade [email] não deve estar em indefinida/vazio!',
    },
  ]

  const checkValidate = isValidateObjectRequest(req, inputs)

  if (Array.isArray(checkValidate)) {
    ok = false

    mensagem = checkValidate.join(', ')
  }

  if (ok) {
    contacts.push({
      id: uuidv4(),
      ...req.body,
    })
  }

  res.send({
    success: ok,
    message: mensagem,
    contact: req.body,
  })
})

function isValidateRequest(req: any, inputs: any[]) {
  if (inputs.length == 0) return false

  for (let i = 0; i < inputs.length; i++) {
    if (req.body[inputs[i]] == undefined || req.body[inputs[i]] == '')
      return false
  }

  return true
}

function isValidateObjectRequest(req: any, inputs: any[]) {
  let message = []

  for (let i = 0; i < inputs.length; i++) {
    if (
      req.body[inputs[i].name] == undefined ||
      req.body[inputs[i].name] == ''
    ) {
      message.push(inputs[i].message)
    }
  }

  return message.length == 0 ? true : message
}

export default router
