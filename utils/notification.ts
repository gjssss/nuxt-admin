import type { NotificationHandle } from 'element-plus'

const _notification: any = (message: string, title?: string) => {
  return ElNotification({
    title,
    message,
    duration: 2000,
  })
}
_notification.success = (message: string, title?: string) => {
  return ElNotification({
    title,
    message,
    type: 'success',
    duration: 2000,
  })
}
_notification.warning = (message: string, title?: string) => {
  return ElNotification({
    title,
    message,
    type: 'warning',
    duration: 2000,
  })
}
_notification.info = (message: string, title?: string) => {
  return ElNotification({
    title,
    message,
    type: 'info',
    duration: 2000,
  })
}
_notification.error = (message: string, title?: string) => {
  return ElNotification({
    title,
    message,
    type: 'error',
    duration: 2000,
  })
}

export const notify: NotificationType = _notification

interface NotificationType {
  (message: string, title?: string): NotificationHandle
  success: (message: string, title?: string) => NotificationHandle
  warning: (message: string, title?: string) => NotificationHandle
  info: (message: string, title?: string) => NotificationHandle
  error: (message: string, title?: string) => NotificationHandle
}
