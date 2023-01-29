import Twilio from 'twilio';
import type { NextApiRequest, NextApiResponse } from 'next';
import { VerificationAttemptContext } from 'twilio/lib/rest/verify/v2/verificationAttempt';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = Twilio(accountSid, authToken);

interface NextApiRequestWithPhone extends NextApiRequest {
  body: {
    phone: string;
    short_code: string;
  };
}

export default async function verifyCode(
  req: NextApiRequestWithPhone,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { short_code: shortCode, phone } = req.body;
    if (!shortCode) {
      return res.status(400).json({
        reason: 'Must supply short code to verify phone number',
      });
    }
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
        .verificationChecks.create({ to: `+1${phone}`, code: shortCode });

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
