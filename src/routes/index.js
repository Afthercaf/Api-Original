import { Router } from "express";
import authRoutes from "./auth.routes.js";
import indexRoutes from "./index.routes.js";
import linksRoutes from "./links.routes.js";
import userRoutes from "./user.routes.js";
import adminRoutes from "./admin.ruotes.js";
import redirectRoutes from "./redirection.routes.js";

const router = Router();

router.use(indexRoutes);
router.use(authRoutes);
router.use("/links", linksRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use(redirectRoutes);

export default router;
