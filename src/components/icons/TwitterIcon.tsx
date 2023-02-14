import { Twitter } from 'iconoir-react';

type Props = {
  className?: string;
};

const TwitterIcon: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <a
      href="https://twitter.com/ushimaru08"
      className={className}
      target="_blank"
      rel="noreferrer"
    >
      <Twitter />
    </a>
  );
};
export default TwitterIcon;
