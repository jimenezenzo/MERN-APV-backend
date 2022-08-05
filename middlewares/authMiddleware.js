import Jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
    // let token;

    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

    //     try {
    //         token = req.headers.authorization.split(' ')[1];
    //         const decode = Jwt.verify(token, process.env.JWT_SECRET);
           
    //         req.veterinario = await Veterinario.findById(decode.id).select("-password -confirmado -token")

    //         next()
    //     } catch (error) {
    //         return res.status(403).json({error: "Token no valido"});
    //     }
    // }

    // if(!token){
    //     const error = new Error("Token no valido o inexistente");
    //     return res.status(403).json({error: error.message})
    // }

        try {
            const token = req.headers.authorization.split(' ')[1];
            const decode = Jwt.verify(token, process.env.JWT_SECRET);
           
            req.veterinario = await Veterinario.findById(decode.id).select("-password -confirmado -token")

            next()
        } catch (error) {
            return res.status(403).json({error: "Token no valido"});
        }
       
    //next();
};

export default checkAuth;