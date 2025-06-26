import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClerkProviderWrapper } from './clerk-provider';
import AuthHeader from './AuthHeader';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Leads',
  description: 'A modern lead management dashboard',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClerkProviderWrapper>
          <AuthHeader />
          {children}
        </ClerkProviderWrapper>
      </body>
    </html>
  );
}
