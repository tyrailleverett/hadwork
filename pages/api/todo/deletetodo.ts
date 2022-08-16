import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../db/db";
import { deleteTodoSchema } from "../../../shared/todozodchema";
import { authOptions } from "../auth/[...nextauth]";

const deleteTodo = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).end();
    }
    if (req.method === "DELETE") {
        try {
            const { id } = deleteTodoSchema.parse(req.body.todo);

            const deletedTodo = await prisma.todo.delete({
                where: { id }
            });

            res.status(200).json(deletedTodo);
        } catch (error) {
            res.status(400).json(error);
        }
    }
};

export default deleteTodo;
