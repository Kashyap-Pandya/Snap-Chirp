import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
//controller
import { register } from "./controllers/auth.js";
//route
import authRoutes from "./routes/auth.js";
//module url configuration

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//config
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//file storage

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/assets");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

//routes with files

app.post("/auth/register", upload.single("picture"), register);

app.post("/auth", authRoutes);
//mongoose setup

const PORT = process.env.PORT || 8000;
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(PORT, () =>
			console.log(`server is listening on port : ${PORT}`)
		);
	})
	.catch((error) => console.log(`${error} did not connect`));
