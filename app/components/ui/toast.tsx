'use client'

import React from 'react'
import { Transition } from '@headlessui/react'
import clsx from 'clsx'

interface ToastProps {
  toast: {
    id: string
    title: string
    description?: string
    variant?: 'default' | 'destructive' | 'success' | 'warning'
  }
  onClose: () => void
}

const variantStyles: Record<string, string> = {
  default: 'bg-gray-800 text-white',
  destructive: 'bg-red-600 text-white',
  success: 'bg-green-600 text-white',
  warning: 'bg-yellow-600 text-white',
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  return (
    <Transition
      show={true}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={clsx(
          'max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
          variantStyles[toast.variant || 'default']
        )}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {/* Optional: Add variant-specific icon here */}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium">{toast.title}</p>
              {toast.description && <p className="mt-1 text-sm">{toast.description}</p>}
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={onClose}
                className="bg-transparent rounded-md inline-flex text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="sr-only">Close</span>
                {/* SVG Icon for Close (X) */}
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default Toast