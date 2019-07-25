import express from "express";
import auth from "./auth";
import project from "./project";
import issue from "./issue";
import member from "./member";

const router = express();

router.use("/auth", auth);
router.use("/project", project);
router.use("/issue", issue);
router.use("/member", member);

router.get("/heart_beat", async (_: express.Request, res: express.Response) => {
  res.send();
});

export default router;
