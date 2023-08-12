import { useGetAbout } from "~/utils/services/about"

export const AboutDisplay = () => {
    const query = useGetAbout();
    if (query.isLoading || query.isError) {
        return <></>
    }
    const aboutItem = query.data;
    return <>
        <p className="">
            {aboutItem.description}
        </p>
    </>
}