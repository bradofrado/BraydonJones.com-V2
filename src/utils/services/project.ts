import { api } from "../api"

export const useGetProjectItems = () => {
    return api.project.getProjectItems.useQuery();
}