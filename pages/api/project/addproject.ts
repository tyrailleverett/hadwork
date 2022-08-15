import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../db/db";
import { addProjectSchema } from "../../../shared/projectzodschema";
import { authOptions } from "../auth/[...nextauth]";

const addProject = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).end();
    }
    if (req.method === "POST") {
        try {
            const id = session.user.id;
            const { name } = addProjectSchema.parse(req.body);
            const addedProject = await prisma.project.create({
                data: { name, user_id: id },
                include: { todo: true }
            });

            res.status(201).json(addedProject);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    res.status(409).json({
                        error: "Project already exists"
                    });
                }
            } else {
                res.status(400).json(error);
            }
        }
    }
};

export default addProject;
