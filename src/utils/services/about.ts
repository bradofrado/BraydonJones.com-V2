import { api } from "../api"

export const useGetAbout = () => {
    return api.about.getAbout.useQuery();
}

export const useGetSkills = () => {
    return api.about.getSkills.useQuery();
}