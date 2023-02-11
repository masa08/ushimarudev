import React from 'react';
import SidebarTitle from './Title';

type Props = {
  className?: string;
};

const Contacts: React.FC<Props> = (props) => {
  return (
    <div className="mb-8">
      <SidebarTitle title="Contacts" />
      <div className="text-center">
        <p>Twitter, Github, LinkedIn</p>
      </div>
    </div>
  );
};
export default Contacts;
