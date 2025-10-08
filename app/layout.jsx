import { Inter } from 'next/font/google';
import Header from './components/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'VCET-EVENTGO',
  description: 'The official event hub for VCET.',
};

// This must be a default export of a React component.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}

