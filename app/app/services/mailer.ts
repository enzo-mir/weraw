import env from '#start/env'
import mail from '@adonisjs/mail/services/main'

export const mailerService = async () => {
  return await mail.send((message) => {
    message
      .to(env.get('SMTP_USERNAME'))
      .from('info@example.org')
      .subject('Verify your email address')
      .text('Hello there')
  })
}
