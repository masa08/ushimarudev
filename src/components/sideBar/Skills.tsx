import React from 'react';
import SidebarTitle from './Title';

type Props = {
  className?: string;
};

const Skills: React.FC<Props> = (props) => {
  return (
    <div className="mb-8">
      <SidebarTitle title="Skills" />
      <div className="text-center">
        <p className="mt-5">JavaScript, TypeScript, Dart, React, Flutter</p>
      </div>
    </div>
  );
};
export default Skills;
