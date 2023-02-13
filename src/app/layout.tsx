import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MyThemeProvider from '@/providers/ThemeProvider';

import './globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head />
      <body>
        <MyThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </MyThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
