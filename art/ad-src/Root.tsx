import {Composition} from 'remotion';
import {Ad} from './Ad';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Ad"
    component={Ad}
    durationInFrames={1350}
    fps={30}
    width={1920}
    height={1080}
  />
);
