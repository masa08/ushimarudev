const Header = () => {
  return (
    <header className="flex justify-between p-5 bg-white dark:bg-gray-800">
      <div>
        <nav>
          <h1>
            <a href="" className="text-gray-500 dark:text-gray-400 py-2">
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
