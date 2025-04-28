import Link from 'next/link'

export default function Navabr() {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blogs' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]
  return (
    <nav className="px-4 sm:px-6 py-2 md:py-5 lg:px-10 flex justify-between items-center p-6 bg-white shadow-md">
      <Link href="/" className="text-2xl font-bold text-accent hover:text-primary">
        <h1>My Blog</h1>
      </Link>
      <div className="space-x-6">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} className="text-primary hover:underline hover:text-accent">
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}
