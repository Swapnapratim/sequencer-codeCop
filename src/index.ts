import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import api from "./api";
import vertex from "./vertex";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(api.constants.apiRoute, api.routes.vertexRoutes);

let newVertex = new vertex.Vertex();
api.controllers.VertexApp = newVertex;

app.listen(api.constants.port, function () {
  console.log(`Vertex are running on port ${api.constants.port}!`);
});
