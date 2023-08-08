import { AboutDisplay } from "~/utils/components/info-section/about/about-display";
import { ExperienceDisplay } from "~/utils/components/info-section/experience/experience-list";
import { ProjectDisplay } from "~/utils/components/info-section/projects/project-list";


export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-16">
        <div>
          <AboutDisplay/>
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




