import { useGetAbout } from "~/utils/services/about"

export const AboutDisplay = () => {
    const query = useGetAbout();
    if (query.isLoading || query.isError) {
        return <></>
    }
    const aboutItem = query.data;
    return <>
        <div className="flex flex-col gap-4">
            {aboutItem.descriptions.map((description, i) => <p key={i}>
                {description}
            </p>)}
        </div>
    </>
}