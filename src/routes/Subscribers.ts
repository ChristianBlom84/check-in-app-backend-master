/* eslint-disable prettier/prettier */
import { Subscriber } from './../models/subscriber';
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
    
    const emailDomain = subscriberData.email.slice(subscriberData.email.indexOf('@'));

		console.log(emailDomain);

		const subscriber = await Subscriber.findOne({
			pushToken: subscriberData.pushToken
		});

		if (!subscriber) {
			await Subscriber.create(subscriberData);
			return res.status(CREATED).json(subscriberData);
		}

		return res
			.status(BAD_REQUEST)
			.json({ error: 'Device already registered.' });
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
