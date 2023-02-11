import React from 'react';
import SidebarTitle from './Title';

type Props = {
  className?: string;
};

const Hobby: React.FC<Props> = (props) => {
  return (
    <div className="mb-8">
      <SidebarTitle title="Hobby" />
      <div className="text-center">
        <p className="mt-5">Training, Anime, Travelling</p>
      </div>
    </div>
  );
};
export default Hobby;
