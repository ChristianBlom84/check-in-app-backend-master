import { model, Model, Schema, Document } from 'mongoose';

export interface Subscriber extends Document {
  name: string;
  email: string;
  pushToken: string;
  organization?: string;
}

const SubscriberSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pushToken: {
    type: String,
    required: true,
    unique: true
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  }
});

export const Subscriber: Model<Subscriber> = model<Subscriber>(
  'Subscriber',
  SubscriberSchema
);
