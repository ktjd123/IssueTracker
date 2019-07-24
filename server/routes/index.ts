import express from "express";
import auth from "./auth";
import project from "./project";
import issue from "./issue";

const router = express();

router.use("/auth", auth);
router.use("/project", project);
router.use("/issue", issue);

router.get(
  "/heart_beat",
  async (req: express.Request, res: express.Response) => {
    res.send();
  }
);

export default router;
