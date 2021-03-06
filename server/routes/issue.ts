import express from "express";
import mongoose from "mongoose";
import joi from "joi";
import { Issue, Member, Project } from "../models";

const router = express();

router.get("/toggleOpen/:id", async (req, res) => {
  if (req.session === undefined) return res.json({ code: 1 });
  const schema = joi.object().keys({
    id: joi
      .string()
      .trim()
      .required()
  });

  const result = joi.validate(req.params, schema);

  if (result.error) return res.json({ code: 2 });

  const { id }: { id: string } = result.value;

  const issue = await Issue.findById(id);
  const project = await Project.findById(issue!.project);
  const member = await Member.findOne({
    project: project!._id,
    account: req.session!.info._id
  });
  if (!member) return res.json({ code: 3 });

  issue!.open = !issue!.open;

  await issue!.save();

  return res.json();
});

router.get("/detail/:id", async (req, res) => {
  if (req.session === undefined) return res.json({ code: 1 });
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id) !== true)
    return res.json({ code: 1 });

  const issue = await Issue.findById(id);

  issue!.viewCount += 1;

  await issue!.save();

  return res.json(issue);
});

router.get("/list/:id", async (req, res) => {
  if (req.session === undefined) return res.json({ code: 1 });
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id) !== true)
    return res.json({ code: 2 });

  const project = await Project.findById(id).lean();
  const member = await Member.findOne({
    account: req.session!.info._id,
    project: project._id
  }).lean();
  if (!member) return res.json({ code: 3 });

  const issues = await Issue.find(
    { project: project._id },
    { title: true, viewCount: true, open: true }
  )
    .sort({ open: -1, _id: -1 })
    .lean();

  return res.json(issues);
});

router.post("/new", async (req, res) => {
  if (req.session === undefined) return res.json({ code: 1 });

  const schema = joi.object().keys({
    title: joi
      .string()
      .trim()
      .required(),
    content: joi
      .string()
      .trim()
      .required(),
    project: joi
      .string()
      .trim()
      .required()
  });

  const result = joi.validate(req.body, schema);

  if (result.error) return res.json({ code: 2 });

  const {
    title,
    content,
    project
  }: { title: string; content: string; project: string } = result.value;

  if (mongoose.Types.ObjectId.isValid(project) === false)
    return res.json({ code: 3 });

  const memberCheck = await Member.findOne({
    project,
    account: req.session!.info._id
  });

  if (!memberCheck) return res.json({ code: 4 });

  const newIssue = new Issue({ title, content, project });

  await newIssue.save();

  return res.json();
});

export default router;
