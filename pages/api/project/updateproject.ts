import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../db/db";
import { updateProjectSchema } from "../../../shared/projectzodschema";
import { authOptions } from "../auth/[...nextauth]";

const updateProject = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).end();
    }
    if (req.method === "PATCH") {
        try {
            const { name, id } = updateProjectSchema.parse(req.body.data);
            const updatedProject = await prisma.project.update({
                where: { id },
                data: { name },
                include: { todo: true }
            });

            res.status(200).json(updatedProject);
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

export default updateProject;
