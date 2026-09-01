import {Composition} from 'remotion';
import {Ad} from './Ad';
import {Load} from './Load';
import {Wall} from './Wall';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Ad" component={Ad} durationInFrames={1350} fps={30} width={1920} height={1080} />
    <Composition id="Load" component={Load} durationInFrames={1200} fps={30} width={1920} height={1080} />
    <Composition id="Wall" component={Wall} durationInFrames={1260} fps={30} width={1920} height={1080} />
  </>
);
