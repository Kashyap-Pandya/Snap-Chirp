import express from "express";

import {
	getUser,
	getUserFriends,
	addRemoveFriend,
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//read

router.get("/:id", verifyToken, getUser);
router.get("/:id/Friends", verifyToken, getUserFriends);

//Update

router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
