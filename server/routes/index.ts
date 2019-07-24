import express from "express";
import auth from "./auth";
import project from "./project";

const router = express();

router.use("/auth", auth);
router.use("/project", project);

router.get(
  "/heart_beat",
  async (req: express.Request, res: express.Response) => {
    res.send();
  }
);

export default router;
