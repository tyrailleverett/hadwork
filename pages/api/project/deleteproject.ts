import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../db/db";
import { deleteProjectSchema } from "../../../shared/projectzodschema";
import { authOptions } from "../auth/[...nextauth]";

const deleteProject = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).end();
    }
    if (req.method === "DELETE") {
        try {
            const { id } = deleteProjectSchema.parse(req.body);
            const deletedProject = await prisma.project.delete({
                where: { id }
            });
            res.status(200).json(deletedProject);
        } catch (error) {
            res.status(400).json(error);
        }
    }
};

export default deleteProject;
