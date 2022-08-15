import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../db/db";
import { addTodoSchema } from "../../../shared/todozodchema";
import { authOptions } from "../auth/[...nextauth]";

const addTodo = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).end();
    }
    if (req.method === "POST") {
        try {
            const { name, projectId } = addTodoSchema.parse(req.body);
            await prisma.todo.create({
                data: {
                    name,
                    project_id: projectId
                }
            });

            res.status(201).end();
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    res.status(409).json({
                        error: "Todo already exists"
                    });
                }
            } else {
                res.status(400).json(error);
            }
        }
    }
};

export default addTodo;
