import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material';
import theme from '@/theme';


export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider theme={theme}>
          {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
