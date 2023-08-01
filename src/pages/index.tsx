import Header from "~/utils/components/base/header";
import { ImagePanel } from "~/utils/components/image-panel";
import {Navbar} from '~/utils/components/navigation/navbar';

export default function Home() {
  return (
    <>
      <ImagePanel image="/dave.jpeg" alt="Man on table" center>
        <div className="flex gap-8 flex-col w-[50%] m-auto">
          <Header level={1}>Hello, I&#39;m Braydon</Header>
          <p className="text-gray-500 text-xl">I&#39;m a software developer with many passions and hobbies 
            currently studying at Brigham Young University</p>
        </div>
      </ImagePanel>
    </>
  );
}