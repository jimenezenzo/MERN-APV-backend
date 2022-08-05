import Express from "express";
import { actualizarPaciente, agregarPaciente, eliminarPaciente, obtenerPaciente, obtenerpacientes } from "../controllers/pacienteController.js";
import checkAuth from "../middlewares/authMiddleware.js";

const router = Express.Router();

router.route("/")
    .post(checkAuth, agregarPaciente)
    .get(checkAuth ,obtenerpacientes);


router.route("/:id")
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente)    

export default router;