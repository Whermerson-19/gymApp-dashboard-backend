import nodemailer from "nodemailer";
import MailTemplateProvider, {
  IParseMailTemplate,
} from "../MailTemplateProvider";

interface IMailContact {
  name: string;
  address: string;
}

interface ISendMailData {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class MailProvider {
  public async sendEmail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailData): Promise<void> {
    const mailTemplateProvider = new MailTemplateProvider();

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
      tls: { rejectUnauthorized: false },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || "@GymAcademy",
        address: from?.address || "contato@gymacademy.com.br",
      },
      to: {
        name: to.name,
        address: to.address,
      },
      subject,
      html: await mailTemplateProvider.parse(templateData),
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Previwe URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
