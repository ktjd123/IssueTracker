import express from "express";
import joi from "joi";
import { Project, Member, Issue } from "../models";

const router = express();

router.get("/list", async (req, res) => {
  if (req.session === undefined) return res.json({ code: 1 });

  const membered = await Member.find(
    { account: req.session!.info._id },
    { project: true }
  ).lean();

  let projects: Array<Object> = [];

  for (let i = 0; i < membered.length; i++) {
    const project = await Project.findById(membered[i].project).lean();
    const issuecount = await Issue.countDocuments({
      project: membered[i].project
    }).lean();

    project.issueCount = issuecount;
    projects.push(project);
  }

  return res.json(projects);
});

router.post("/new", async (req, res) => {
  if (req.session === undefined) return res.json({ code: 1 });
  const schema = joi.object().keys({
    title: joi
      .string()
      .trim()
      .required()
  });

  const result = joi.validate(req.body, schema);

  if (result.error) return res.json({ code: 2 });

  const { title }: { title: string } = result.value;

  const newProject = new Project({
    title
  });

  const newMember = new Member({
    account: req.session!.info._id,
    project: newProject._id
  });

  await newProject.save();
  await newMember.save();

  return res.json();
});

export default router;
