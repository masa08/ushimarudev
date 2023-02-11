const Footer = () => {
  return (
    <footer className="flex justify-between p-5 bg-white dark:bg-gray-800">
      <p className="text-gray-500 dark:text-gray-400 py-2">ushimaru.dev</p>
      <ul className="flex">
        <li className="p-2">
          <a href="" className="text-gray-500 dark:text-gray-400">
            Twitter
          </a>
        </li>
        <li className="p-2">
          <a href="" className="text-gray-500 dark:text-gray-400">
            Github
          </a>
        </li>
        <li className="p-2">
          <a href="" className="text-gray-500 dark:text-gray-400">
            LinkedIn
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
