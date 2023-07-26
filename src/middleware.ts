import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";


export const checkId = (req: Request, res: Response, next: NextFunction) => {
    if (req.params.id && !ObjectId.isValid(req.params.id)) {
        res.status(400).end('Invalid id');
    } else {
        next();
    }
}