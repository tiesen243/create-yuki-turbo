'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@yuki/ui/components/toast'
import { useToast } from '@yuki/ui/hooks/use-toast'
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
} from '@yuki/ui/icons'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          {props.variant === 'success' && <CircleCheckIcon size={20} />}
          {props.variant === 'warning' && <CircleAlertIcon size={20} />}
          {props.variant === 'info' && <InfoIcon size={20} />}
          {props.variant === 'error' && <TriangleAlertIcon size={20} />}

          <div className="grid grow gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
