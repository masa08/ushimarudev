import React from 'react';
import Image from 'next/image';
import SidebarTitle from './Title';

type Props = {
  className?: string;
};

const Profile: React.FC<Props> = (props) => {
  return (
    <div className="mb-8">
      <SidebarTitle title="Profile" />
      <div className="text-center">
        <Image
          className="mx-auto rounded-full"
          src="/ushimaru.png"
          alt="self image"
          width={100}
          height={100}
        />
        <p className="mt-5">
          Hello World!
          <br />I am a software engineer based in Japan!
        </p>
      </div>
    </div>
  );
};
export default Profile;
