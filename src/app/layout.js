import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClerkProviderWrapper } from './clerk-provider';
import Header from './header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Lead Dashboard',
  description: 'A modern lead management dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClerkProviderWrapper>
          <Header />
          {children}
        </ClerkProviderWrapper>
      </body>
    </html>
  );
}
