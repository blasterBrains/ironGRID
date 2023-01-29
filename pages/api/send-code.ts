import Twilio from 'twilio';
import type { NextApiRequest, NextApiResponse } from 'next';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = Twilio(accountSid, authToken);

interface NextApiRequestWithPhone extends NextApiRequest {
  body: {
    phone: string;
  };
}

export default async function sendCode(
  req: NextApiRequestWithPhone,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({
        reason: 'Must supply phone number to send verification code to',
      });
    }
    if (!serviceSid) {
      return res.status(500).json({
        reason: 'Cannot verify Twilio Service',
      });
    }
    try {
      const { status, valid } = await client.verify.v2
        .services(serviceSid)
        .verifications.create({ to: `+1${phone}`, channel: 'sms' });

      return res.status(200).json({
        status,
        valid,
      });
    } catch (err) {
      return res.status(401).json({
        status: 'error',
        details: err,
      });
    }
  }
}
