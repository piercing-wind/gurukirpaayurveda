'use server';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const client = new SNSClient({
   region: 'ap-south-1',
   credentials: {
      accessKeyId: process.env.ACCTO_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.ACCTO_AWS_SECRET_ACCESS_KEY!
   }
});

export const SendOTP = async () => {
   const params = {
      Message: `Your OTP is 696969`,
      PhoneNumber: '918847674817',
      // MessageAttributes: {
      //    'AWS.SNS.SMS.SMSType': {
      //       DataType: 'String',
      //       StringValue: 'Transactional'
      //    }
      // }
   };

   try {
      const data = await client.send(new PublishCommand(params));
      console.log('Message sent. MessageId:', data);
   } catch (err) {
      console.error('Error sending message:', err);
   }
};