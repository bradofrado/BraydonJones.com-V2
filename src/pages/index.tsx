import { ExperienceDisplay } from "~/utils/components/experience/experience-list";
import { ProjectDisplay } from "~/utils/components/projects/project-list";


export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-16">
        <div>
          <p>In 2014 when I was 14, I read my first book on programming and fell in love. Since then, I&#39;ve worked on 
            projects ranging from Unity 3D games to websites made completely from scratch.
          </p>
        </div>
        <div className="">
          <ExperienceDisplay/>
        </div>
        <div>
          <ProjectDisplay/>
        </div>
      </div>
    </>
  );
}




