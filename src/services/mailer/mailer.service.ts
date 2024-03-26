import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ICreateEmail } from './interfaces/createEmail.interface';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail( { roomId, timeStart, duration, summaryEvent, fio, email, phoneNumber }: ICreateEmail): Promise<string> {

    await this.mailerService.sendMail({
      to: "fakeroot94@gmail.com", // Specify the recipient email address here
      subject: 'Заявка на бронирование',
      template: 'confirmation',
      context: {
        roomId,
        timeStart,
        duration,
        summaryEvent,
        fio,
        email,
        phoneNumber
      },
    });
    return 'email sent';
  }
}
