import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateApiKey(): string {
  const prefix = 'sk_live_'
  const randomPart =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  return prefix + randomPart
}
