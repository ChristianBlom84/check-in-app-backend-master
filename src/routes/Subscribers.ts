/* eslint-disable prettier/prettier */
import { Subscriber } from './../models/subscriber';
import { Organization } from '../models/Organization';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { logger } from '@shared';

interface SubscriberData {
  pushToken: string;
  name: string;
  email: string;
}

// Init shared
const router = Router();

/******************************************************************************
 *          Register Expo Push Token - "POST /api/subscribers/register"
 ******************************************************************************/
router.post('/register', async (req: Request, res: Response) => {
	try {
    const subscriberData: SubscriberData = req.body;

    const emailDomain = subscriberData.email.slice(subscriberData.email.indexOf('@') + 1);

    console.log(emailDomain);

    const organization = await Organization.findOne({ emailDomain });

    if (!organization) {
      return res.status(404).json({ error: 'Could not find an organization with that email domain.'});
    }

		console.log(organization);

		return res
			.status(OK)
			.json({ serverAddress: organization.serverAddress });
	} catch (err) {
		logger.error(err.message, err);
		return res.status(BAD_REQUEST).json({
			error: err.message
		});
	}
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
