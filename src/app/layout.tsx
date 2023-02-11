import Footer from '@/components/Footer';
import Header from '@/components/Header';
import './globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <head />
      <body>
        <Header />
        <main className="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
