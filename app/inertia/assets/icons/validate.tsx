import { SVGProps } from 'react'
import { JSX } from 'react/jsx-runtime'

export const ValidateIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="48px"
      height="48px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          strokeWidth="2"
          d="M20,15 C19,16 21.25,18.75 20,20 C18.75,21.25 16,19 15,20 C14,21 13.5,23 12,23 C10.5,23 10,21 9,20 C8,19 5.25,21.25 4,20 C2.75,18.75 5,16 4,15 C3,14 1,13.5 1,12 C1,10.5 3,10 4,9 C5,8 2.75,5.25 4,4 C5.25,2.75 8,5 9,4 C10,3 10.5,1 12,1 C13.5,1 14,3 15,4 C16,5 18.75,2.75 20,4 C21.25,5.25 19,8 20,9 C21,10 23,10.5 23,12 C23,13.5 21,14 20,15 Z M7,12 L10,15 L17,8"
        ></path>{' '}
      </g>
    </svg>
  )
}
