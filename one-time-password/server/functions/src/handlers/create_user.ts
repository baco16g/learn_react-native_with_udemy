import { Request, Response } from 'express'
import * as admin from 'firebase-admin'

const createUser = async (req: Request, res: Response) => {
  // Verify the user provided a phone
  if (!req.body.phone) {
    return res.status(422).send({ error: 'Bad Input '})
  }

  // Format the phone number to remove dashed and parens
  const phone = `+81${String(req.body.phone).replace(/[^\d]/g, '')}`

  // Create a new user account using that phone number
  const user = await admin
    .auth()
    .createUser({ uid: phone })
    .catch(err => res.status(422).send({ error: err }))

  // Respond to user request, saying the account was made
  return res.send(user)
}

export { createUser }
