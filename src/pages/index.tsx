import Header from "~/utils/components/base/header";
import { ImagePanel } from "~/utils/components/image-panel";
import {Navbar} from '~/utils/components/navigation/navbar';

export default function Home() {
  return (
    <>
      <ImagePanel image="/braydon-shot.jpeg" alt="Man on table" center>
      <Header level={1}>Hello, I&#39;m Braydon</Header>
          <p className="text-gray-500 text-xl">I&#39;m a software developer with many passions and hobbies 
            currently studying at Brigham Young University</p>
      </ImagePanel>
      <ImagePanel image="/dave.jpeg" alt="Dave Grow" center reverse>
        <Header level={1}>Skills</Header>
      </ImagePanel>
    </>
  );
}