import express from "express";
import joi from "joi";
import { ObjectID } from "bson";
import { Project, Member, Account } from "../models";

const router = express();

router.post("/addNewMember", async (req, res) => {
  if (req.session === undefined) return res.json({ code: 1 });
  const schema = joi.object().keys({
    newMember: joi
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
    newMember,
    project
  }: { newMember: string; project: string } = result.value;

  const addingProject = await Project.findById(project);
  if (!addingProject) return res.json({ code: 3 });

  const memberCheck = await Member.find({
    account: req.session!.info._id,
    project
  });

  if (!memberCheck) return res.json({ code: 4 });

  const newMemberAccount = await Account.findById(newMember);
  if (!newMemberAccount) return res.json({ code: 5 });

  const member = await Member.updateOne(
    { account: newMember, project: addingProject._id },
    {},
    { upsert: true }
  );

  return res.json();
});

export default router;
