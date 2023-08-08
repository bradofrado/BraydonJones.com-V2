import { api } from "../api"

export const useGetExperienceItems = () => {
    return api.experience.getExperienceItems.useQuery();
}