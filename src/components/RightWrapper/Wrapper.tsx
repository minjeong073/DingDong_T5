import { Advertisement, Root } from './styled';
import adImg from '../../assets/image/advertisement.png';

export const RightWrapper = () => {
  return (
    <Root>
      <Advertisement src={adImg} alt="광고" />
    </Root>
  );
};
