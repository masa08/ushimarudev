import Footer from '@/components/Footer';
import Header from '@/components/Header';
import './globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="ja"
      className="bg-white dark:bg-gray-900 text-black dark:text-white"
    >
      <head />
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
