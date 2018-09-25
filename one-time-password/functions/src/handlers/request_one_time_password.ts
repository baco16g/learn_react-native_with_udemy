import { Request, Response } from 'express'
import * as admin from 'firebase-admin'
import twilio from '../twilio'
import * as config from '../../config.json'

const requestOneTimePassword = async (req: Request, res: Response) => {
  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number' })
  }

  const phone = `+81${String(req.body.phone).replace(/[^\d]/g, '')}`

  await admin
    .auth()
    .getUser(phone)
    .catch(err => res.status(422).send({ error: err }))

  const code = Math.floor(Math.random() * 8999 + 1000)

  await twilio.messages
    .create({
      body: `Your code is ${code}`,
      to: phone,
      from: config.twilio.phone
    })
    .catch(err => res.status(422).send(err))

  await admin
    .database()
    .ref(`users/${phone}`)
    .update({ code: code, codeValid: true })
    .catch(err => res.status(422).send(err))

  return res.send({ success: true })
}

export { requestOneTimePassword }
