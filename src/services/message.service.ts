import Message, { IMessage } from '../models/message.model';

export const getMessagesByPhone = async (phoneId: string): Promise<IMessage[]> => {
  const messages: IMessage[] = await Message.find({phone_number_id: phoneId});
  return messages;
};
