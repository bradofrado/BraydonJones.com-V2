import { api } from "../api"

export const useGetAbout = () => {
    return api.about.getAbout.useQuery();
}