import { userAPI } from './api';

export const getNotifications = (userId) => userAPI.getNotifications(userId);
export const markNotificationRead = (notificationId) => userAPI.markNotificationRead(notificationId);
