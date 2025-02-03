import env from '#start/env'
import mail from '@adonisjs/mail/services/main'

export const mailerService = (data: { name: string; createdAt: string; url: string }) => {
  mail.sendLater((message) => {
    message
      .to(env.get('SMTP_USERNAME'))
      .from('info@example.org')
      .subject('Galerie finie !')
      .htmlView('template/email', { ...data })
  })
}
