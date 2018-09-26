import * as twilio from 'twilio'
import * as config from '../config.json'

export default twilio(
  config.twilio.accountSid,
  config.twilio.authToken
)
