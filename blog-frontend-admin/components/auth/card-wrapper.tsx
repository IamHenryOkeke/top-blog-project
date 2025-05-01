import Link from 'next/link'
import React, { ReactNode } from 'react'

type CardWrapperProps = {
  title: string
  description?: string
  children: ReactNode
  footerPara?: string,
  footerLink?: {
    href: string
    text: string
  }
}

export default function CardWrapper({ title, description, footerPara, footerLink, children }: CardWrapperProps) {
  return (
    <div className="w-[350px] md:w-[400px] bg-white/5 border border-accent-100 rounded-lg shadow-md p-6 space-y-4">
      <div className="text-center">
        <h2 className="font-medium text-3xl">{title}</h2>
        <p>{description || ""}</p>
      </div>
      <div className="space-y-6">
        {children}
      </div>
      <div>
        <p className="w-full text-sm text-center">{footerPara} <Link className="hover:underline" href={footerLink?.href || ""}>{footerLink?.text}</Link></p>
      </div>
    </div>
  )
}