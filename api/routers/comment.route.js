import express from "express";
import {
  createComment,
  getComments,
} from "../controllers/comment.controller.js";
import { isAuthenticated } from "../utils/auth.middleware.js";

const router = express.Router();

router.post("/create", isAuthenticated, createComment);
router.get("/getPostComments/:postId", getComments);

export default router;
