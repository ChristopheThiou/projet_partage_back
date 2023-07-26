import { Router } from "express";
import { empruntRepo } from "../repository/emprunt-repo";
import { checkId } from "../middleware";
import Joi from "joi";

export const empruntController = Router();

empruntController.get("/", async (req, res) => {
  const emprunts = await empruntRepo.findAll();
  res.json(emprunts);
});


empruntController.get("/:id", checkId, async (req, res) => {
  const emprunt = await empruntRepo.findById(req.params.id);
  if (!emprunt) {
    res.status(404).end("Not Found");
    return;
  }
  res.json(emprunt);
});

empruntController.post("/", async (req, res) => {
  const validation = empruntValidation.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(400).json(validation.error);
    return;
  }
  if (await empruntRepo.findById(req.body._id)) {
    res.status(400).json({ error: "emprunt already exist" });
    return;
  }
  const emprunt = await empruntRepo.persist(req.body);
  res.status(201).json(emprunt);
});

empruntController.delete("/:id", checkId, async (req, res) => {
  await empruntRepo.remove(req.params.id);
  res.status(204).end();
});

empruntController.patch("/:id", checkId, async (req, res) => {
  const validation = empruntPatchValidation.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    res.status(400).json(validation.error);
    return;
  }
  await empruntRepo.update(req.params.id, req.body);
  res.json(req.body);
});

const empruntValidation = Joi.object({
  accepted: Joi.boolean().required(),
  rendu: Joi.boolean().required(),
  duration: Joi.string().required(),
  user: Joi.object({
    _id: Joi.any().required(),
    name: Joi.string().required(),
})
});

const empruntPatchValidation = Joi.object({
    accepted: Joi.boolean(),
  rendu: Joi.boolean(),
  duration: Joi.string(),
  user: Joi.object({
    _id: Joi.any(),
    name: Joi.string(),
})
});
