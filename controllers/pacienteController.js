import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario;

    try {
        const pacienteGuardado = await paciente.save();
        return res.status(201).json(pacienteGuardado);
    } catch (error) {
        console.error(error.message)
    }
};

const obtenerpacientes = async (req, res) => {
   
    const pacientes = await Paciente.find()
                        .where('veterinario')
                        .equals(req.veterinario);

    return res.status(200).json(pacientes);
};

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg: 'Paciente no encontrado'});
    }

    if(paciente.veterinario.id.toString() !== req.veterinario.id.toString()){
        return res.status(401).json({msg: 'Error, accion no valida'});
    }

    return res.json(paciente);
};

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg: 'Paciente no encontrado'});
    }

    if(paciente.veterinario._id.toString() !== req.veterinario.id.toString()){
        return res.status(401).json({msg: 'Error, accion no valida'});
    }

    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save();
        return res.json(pacienteActualizado);
    } catch (error) {
        console.error(error.message)
    }
};

const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg: 'Paciente no encontrado'});
    }

    if(paciente.veterinario._id.toString() !== req.veterinario.id.toString()){
        return res.status(401).json({msg: 'Error, accion no valida'});
    }

    try {
        await paciente.deleteOne();
        
        res.json({msg: 'Paciente eliminado'});
    } catch (error) {
        console.error(error.message)
    }
};

export {
    agregarPaciente,
    obtenerpacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}