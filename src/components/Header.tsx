const Header = () => {
  return (
    <header className="flex justify-between p-5">
      <div>
        <nav>
          <h1>
            <a href="" className="py-2">
              ushimaru.dev
            </a>
          </h1>
          {/* TODO: darkmode切り替え */}
          {/* TODO: 言語切り替え */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
