import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { perPagePDF, rowsColPDF} from "./services/docs.service.js";

import { handler as ssrHandler } from "./pages/dist/server/entry.mjs";

//Dotenv configuration
dotenv.config();

//frontend path
const static_path = process.env.DIST_PATH;

//Express configuration
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", express.static(static_path));
app.use(ssrHandler);

//Multer configuration
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

//Routes
app.post("/perPage", upload.array("images"), async (req, res) => {
  try {
    const { files } = req;
    const mode_data = JSON.parse(req.body.mode_data);
    const template = {
      type: "perPage",
      value: mode_data.value,
    };
    const { mode } = req.body;
    res.setHeader("Content-Type", "application/pdf");
    await perPagePDF(files, template, mode, res);
    console.log("finish");
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Error al crear el pdf",
    });
  }
});

app.post("/rowscol", upload.array("images"), async (req, res) => {
  try {
    const { files } = req;
    const mode_data = JSON.parse(req.body.mode_data);
    const template = {
      type: "rowscol",
      value: mode_data,
    };
    const { mode } = req.body;
    res.setHeader("Content-Type", "application/pdf");
    await rowsColPDF(files, template, mode, res);
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Error al crear el pdf",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
