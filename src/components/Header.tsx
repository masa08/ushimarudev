import Link from 'next/link';
import { ChangeThemeButton } from './buttons/ChangeThemeButton';

const Header = () => {
  return (
    <header className="flex justify-between p-5">
      <div>
        <nav>
          <h1>
            <Link href={`/`} className="py-2">
              ushimaru.dev
            </Link>
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
