// import { Router } from "express";
// import { registerUser } from "../controllers/user.controller.js";

// const router = Router();

// router.route('/register').get(registerUser);

// export default router;

import express from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// POST or GET depending on what you want
router.post("/register",
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1,

        },
        {
            name: 'coverImage',
            maxCount: 1
        }
    ]) ,

registerUser);  
// or if you want GET
// router.get("/register", registerUser);

export default router;
