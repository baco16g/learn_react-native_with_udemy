import { Request, Response } from 'express'
import * as admin from 'firebase-admin'

const velifyOneTimePassword = async (req: Request, res: Response) => {
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: 'Phone and code must be provided' })
  }

  const phone = `+81${String(req.body.phone).replace(/[^\d]/g, '')}`
  const code = parseInt(req.body.code, 10)

  await admin
    .auth()
    .getUser(phone)
    .catch(err => res.status(422).send({ error: err }))

  const ref = admin
    .database()
    .ref(`users/${phone}`)

  const user = await ref
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => res.status(422).send({ error: err }))

  if (user.code !== code || !user.codeValid) {
    return res.status(422).send({ error: 'Code not valid' })
  }

  ref.update({ codeValid: false })

  const token = await admin
    .auth()
    .createCustomToken(phone)
    .catch(err => res.status(422).send({ error: err }))

  return res.send({ token })
}

export { velifyOneTimePassword }
