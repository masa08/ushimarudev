import React from 'react';
import GithubIcon from '../icons/GIthubIcon';
import LinkedInIcon from '../icons/LinkedInIcon';
import TwitterIcon from '../icons/TwitterIcon';
import SidebarTitle from './Title';

type Props = {
  className?: string;
};

const Contacts: React.FC<Props> = (props) => {
  return (
    <div className="mb-8">
      <SidebarTitle title="Contacts" />
      <div className="flex justify-start">
        <TwitterIcon className="mr-2" />
        <GithubIcon className="mr-2" />
        <LinkedInIcon className="mr-2" />
      </div>
    </div>
  );
};
export default Contacts;
