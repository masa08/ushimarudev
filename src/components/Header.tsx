import Link from 'next/link';

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
          {/* TODO: darkmode切り替え */}
          {/* TODO: 言語切り替え */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
