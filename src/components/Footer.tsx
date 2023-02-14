import { GitHub, LinkedIn, Twitter } from 'iconoir-react';
import GithubIcon from './icons/GIthubIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import TwitterIcon from './icons/TwitterIcon';

const Footer = () => {
  return (
    <footer className="flex justify-between p-5">
      <p className=" py-2">ushimaru.dev</p>
      <ul className="flex">
        <li className="p-2">
          <TwitterIcon />
        </li>
        <li className="p-2">
          <GithubIcon />
        </li>
        <li className="p-2">
          <LinkedInIcon />
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
