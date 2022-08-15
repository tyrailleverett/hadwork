import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../db/db";
import { updateTodoSchema } from "../../../shared/todozodchema";
import { authOptions } from "../auth/[...nextauth]";

const updateTodo = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).end();
    }
    if (req.method === "PUT") {
        try {
            const todo = updateTodoSchema.parse(req.body.data);

            const updatedTodo = await prisma.todo.update({
                where: { id: todo.id },
                data: {
                    name: todo.name,
                    status: todo.status,
                    project_id: todo.project_id,
                    created_at: todo.created_at
                }
            });

            res.status(200).json(updatedTodo);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    res.status(404).json({
                        error: "Not able to find todo"
                    });
                }
            } else {
                res.status(400).json(error);
            }
        }
    }
};

export default updateTodo;
