import { z } from "zod";

export const addTodoSchema = z.object({
    name: z.string().min(3, "Please enter a valid todo").trim(),
    projectId: z.number().positive()
});

export const updateTodoSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(3, "Please provide a valid project name").trim(),
    status: z.string().min(1, "Please provide a status").trim(),
    project_id: z.number().positive(),
    created_at: z.string().trim()
});

export const deleteTodoSchema = z.object({
    id: z.number().positive()
});
