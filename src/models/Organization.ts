import { model, Model, Schema, Document } from 'mongoose';

export interface Organization extends Document {
  name: string;
  emailDomain: string;
  users: [string];
  serverAddress: string;
}

const OrganizationSchema: Schema = new Schema({
  name: { type: String },
  emailDomain: { type: String },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  notifications: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Notification'
    }
  ],
  serverAddress: { type: String }
});

export const Organization: Model<Organization> = model<Organization>(
  'Organization',
  OrganizationSchema
);
