import { z } from "zod";

export const addProjectSchema = z.object({
    name: z.string().min(3, "Please enter a valid username").trim()
});

export const updateProjectSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(3, "Please provide a valid project name").trim()
});

export const deleteProjectSchema = z.object({
    id: z.number().positive()
});
