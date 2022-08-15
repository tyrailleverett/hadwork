import create from "zustand";
import { ProjectType } from "../shared/sharedtypes";

interface ProjectState {
    activeProject: ProjectType | null;
    setActiveProject: (project: ProjectType | null) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
    activeProject: null,
    setActiveProject: (project: ProjectType | null) => {
        set(() => ({ activeProject: project }));
        localStorage.setItem("activeProject", JSON.stringify(project));
    }
}));
