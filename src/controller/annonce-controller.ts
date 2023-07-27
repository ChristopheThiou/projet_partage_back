import { Router, query } from "express";
import { annonceRepo } from "../repository/annonce-repo";
import { checkId } from "../middleware";
import Joi from "joi";

export const annonceController = Router();

annonceController.get("/", async (req, res) => {
  if (req.query.search) {
    const annonces = await annonceRepo.search(req.query.search);
    res.json(annonces);
    return;
  }
  const annonces = await annonceRepo.findAll();
  res.json(annonces);
});

annonceController.get("/:name", async (req, res) => {
  const annonce = await annonceRepo.findByName(req.params.name);
  if (!annonce) {
    res.status(404).end("Not Found");
    return;
  }
  res.json(annonce);
});

annonceController.get("/id/:id", checkId, async (req, res) => {
  const annonce = await annonceRepo.findById(req.params.id);
  if (!annonce) {
    res.status(404).end("Not Found");
    return;
  }
  res.json(annonce);
});

annonceController.post("/", async (req, res) => {
  const validation = annonceValidation.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    res.status(400).json(validation.error);
    return;
  }
  if (await annonceRepo.findById(req.body._id)) {
    res.status(400).json({ error: "annonce already exist" });
    return;
  }
  const annonce = await annonceRepo.persist(req.body);
  res.status(201).json(annonce);
});

annonceController.delete("/:id", checkId, async (req, res) => {
  await annonceRepo.remove(req.params.id);
  res.status(204).end();
});

annonceController.patch("/:id", checkId, async (req, res) => {
  const validation = annoncePatchValidation.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    res.status(400).json(validation.error);
    return;
  }
  await annonceRepo.update(req.params.id, req.body);
  res.json(req.body);
});

const annonceValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  comment: Joi.string().required(),
  status: Joi.string().required(),
  type: Joi.string().required(),
});

const annoncePatchValidation = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  comment: Joi.string(),
  status: Joi.string(),
  type: Joi.string(),
});
