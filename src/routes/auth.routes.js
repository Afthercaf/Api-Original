import { Router } from "express";
import {
  renderSignUp,
  signUp,
  renderSignIn,
  signIn,
  logout,
} from "../controllers/auth.controller.js";
import { validator } from "../middlewares/validator.middleware.js";
import { signinSchema, signupSchema } from "../schemas/auth.schema.js";

const router = Router();

router.get("/signup", renderSignUp);
router.post("/signup", validator(signupSchema), signUp);

router.get("/signin", renderSignIn);
router.post("/signin", validator(signinSchema), signIn);

router.get("/logout", logout);

export default router;
