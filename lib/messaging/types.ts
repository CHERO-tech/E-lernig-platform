export interface Message {
  id: string;
  senderId: 'me' | string;
  text: string;
  sentAt: number;
}

export interface Conversation {
  id: string;
  participantId: string;
  messages: Message[];
  unread: number;
  pinned: boolean;
}

export interface UserMessages {
  conversations: Conversation[];
}

export interface MessagingContextType {
  conversations: Conversation[];
  sendMessage: (participantId: string, text: string) => void;
  markConversationRead: (participantId: string) => void;
  getConversationByParticipant: (participantId: string) => Conversation | undefined;
}
