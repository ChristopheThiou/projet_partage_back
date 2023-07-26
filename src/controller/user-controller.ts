import { Router } from "express";
import { userRepo } from "../repository/user-repo";
import { checkId } from "../middleware";
import Joi from "joi";

export const userController = Router();

userController.get("/", async (req, res) => {
  const users = await userRepo.findAll();
  res.json(users);
});

userController.get("/:name", async (req, res) => {
  const user = await userRepo.findByName(req.params.name);
  if (!user) {
    res.status(404).end("Not Found");
    return;
  }
  res.json(user);
});

userController.get("/id/:id", checkId, async (req, res) => {
  const user = await userRepo.findById(req.params.id);
  if (!user) {
    res.status(404).end("Not Found");
    return;
  }
  res.json(user);
});

userController.post("/", async (req, res) => {
  const validation = userValidation.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(400).json(validation.error);
    return;
  }
  if (await userRepo.findById(req.body._id)) {
    res.status(400).json({ error: "User already exist" });
    return;
  }
  req.body.role = "ROLE_USER";
  const user = await userRepo.persist(req.body);
  res.status(201).json(user);
});

userController.delete("/:id", checkId, async (req, res) => {
  await userRepo.remove(req.params.id);
  res.status(204).end();
});

userController.patch("/:id", checkId, async (req, res) => {
  const validation = userPatchValidation.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    res.status(400).json(validation.error);
    return;
  }
  await userRepo.update(req.params.id, req.body);
  res.json(req.body);
});

const userValidation = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  listEmprunt: Joi.string(),
  listAnnonce: Joi.string()
});

const userPatchValidation = Joi.object({
  name: Joi.string(),
  address: Joi.string(),
  listEmprunt: Joi.string(),
  listAnnonce: Joi.string()
});
