'use client'

import Link from 'next/link'
import { useState } from 'react';

export default function Navbar() {
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blogs' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="px-4 sm:px-6 py-4 md:py-5 lg:px-10 p-6 bg-white shadow-md">
      <div className='flex justify-between items-center'>
        <Link href="/" className="text-xl md:text-2xl font-bold text-accent hover:text-primary">
          <h1>My Blog</h1>
        </Link>
        <div className="space-x-6 hidden md:flex ">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-primary hover:underline hover:text-accent">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="md:hidden flex items-center cursor-pointer">
          <button
            onClick={toggleMenu}
            className="relative w-8 h-8 focus:outline-none"
          >
            <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-black transform transition duration-300 ease-in-out"
              style={{
                translate: isOpen ? '-50% -50%' : '-50% -8px',
                rotate: isOpen ? "45deg" : "0deg",
              }}
            />
            <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-black transform transition duration-300 ease-in-out"
              style={{
                translate: '-50% -50%',
                opacity: isOpen ? "0" : "1",
              }}
            />
            <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-black transform transition duration-300 ease-in-out"
              style={{
                translate: isOpen ? '-50% -50%' : '-50% 7px',
                rotate: isOpen ? "-45deg" : "0deg",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"}`}>
        <div className="flex flex-col items-center bg-white space-y-4 py-4 hover:text-primary font-medium text-sm">
          {
            navLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)
          }
        </div>
      </div>
    </nav>
  )
}
