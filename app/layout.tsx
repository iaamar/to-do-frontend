import './globals.css';
import { Inter } from 'next/font/google';
import { PlusCircleIcon, RocketLaunchIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gray-900 text-gray-100">
      <body className={`${inter.className}`}>
        <div className="min-h-screen flex flex-col bg-[#1a1a1a]">
          <header className="bg-[#0d0d0d] text-white py-4">
            <div className="flex justify-center items-center min-h-[20vh]">
              <RocketLaunchIcon className="w-12 h-12 text-[#4ea8de]" />
              <h1 className="text-4xl font-bold text-center text-[#4ea8de]">Todo</h1>
              <h1 className="text-4xl font-bold text-center text-[#5f60ce]">App</h1>
            </div>
          </header>
          
          <main className="flex-grow w-1/2 container mx-auto px-4 py-8 bg-[#1a1a1a]">{children}</main>
        </div>
      </body>
    </html>
  );
}
