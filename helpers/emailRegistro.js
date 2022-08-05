import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const {nombre, email, token} = datos;

    const info = await transport.sendMail({
        from: 'APV - Administrador de Paciente de Veterinaria',
        to: email,
        subject: 'Comprueba tu cuenta en APV',
        text: 'Comprueba tu cuenta en APV',
        html: `<p>Hola ${nombre} comprueba tu cuenta en APV</p>
            <p>Tu cuenta esta lista, solo debes comprobarla haciendo click en el siguiente enlace <a href='${process.env.FRONTEND_URL}/confirmar/${token}'>Comprobar cuenta</a></p>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    })
}

export default emailRegistro;