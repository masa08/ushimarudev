import Link from 'next/link';
import { ChangeThemeButton } from './buttons/ChangeThemeButton';

const Header = () => {
  return (
    <header className="flex justify-between p-5 h-16">
      <div>
        <nav>
          <h1 className="text-xl">
            <Link href={`/`}>ushimaru.dev</Link>
          </h1>
        </nav>
      </div>
      <div>
        <ChangeThemeButton />
        {/* TODO: 言語切り替え */}
      </div>
    </header>
  );
};

export default Header;
