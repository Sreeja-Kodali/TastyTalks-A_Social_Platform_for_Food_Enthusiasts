import { chatAPI } from './api';

export const getMessages = (room) => chatAPI.getMessages(room);
export const sendMessage = (message, room) => chatAPI.sendMessage(message, room);
export const deleteMessage = (id) => chatAPI.deleteMessage(id);
