/* eslint-disable prettier/prettier */
import { Organization } from '../models/Organization';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import { logger } from '@shared';

interface SubscriberData {
  pushToken: string;
  name: string;
  email: string;
}

// Init shared
const router = Router();

/******************************************************************************
 *      Get Correct Server Address - "POST /api/subscribers/address"
 ******************************************************************************/
router.post('/address', async (req: Request, res: Response) => {
	try {
    const { email } = req.body;

    const emailDomain = email.slice(email.indexOf('@') + 1);

    console.log(emailDomain);

    const organization = await Organization.findOne({ emailDomain });

    if (!organization) {
      return res.status(404).json({ error: 'Could not find an organization with that email domain.'});
    }

		console.log(organization);

		let trimmedServerAddress = '';

		if (organization.serverAddress.substr(-1) === '/') {
			trimmedServerAddress = organization.serverAddress.substr(0, organization.serverAddress.length - 1);
		}

		return res
			.status(OK)
			.json({ serverAddress: trimmedServerAddress ? trimmedServerAddress : organization.serverAddress });
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
