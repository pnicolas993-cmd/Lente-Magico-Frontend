// Servidor de prueba para simular el backend de Lente Magico
const jsonServer = require("json-server");
const bcrypt = require("bcryptjs"); // Importamos la librería de encriptación

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();


server.use(middlewares);
server.use(jsonServer.bodyParser);

const db = router.db;

// -------------------------------------------------------
// Crear usuario administrador si no existe (Con Contraseña Encriptada)
// -------------------------------------------------------
const ADMIN_CORREO = "admin@mail.com";
const ADMIN_PASSWORD = "1234";
const ID_AUTORIZACION_ADMIN = 1; // 1 = Administrador en la tabla autorizaciones

const adminExists = db.get("usuarios").find({ correo: ADMIN_CORREO }).value();

if (!adminExists) {
    const usuarios = db.get("usuarios").value() || [];
    const nuevoId = usuarios.length > 0
        ? Math.max(...usuarios.map(u => Number(u.id || 0))) + 1
        : 1;

    // Generamos el Hash seguro para la contraseña "1234" antes de guardarla
    const salt = bcrypt.genSaltSync(10);
    const adminPasswordHash = bcrypt.hashSync(ADMIN_PASSWORD, salt);

    // Crear el usuario admin con el hash seguro
    db.get("usuarios")
        .push({
            id: String(nuevoId),
            login: "admin",
            correo: ADMIN_CORREO,
            password: adminPasswordHash, // Guardamos la versión encriptada de forma segura
            activar_usuario: true,
            clave_idioma: "es",
            clave_activacion: "ACT-ADMIN",
            llave_reinicio: null,
            hora_reinicio: null
        })
        .write();

    // Asociar el usuario admin con la autorizacion de Administrador
    db.get("autorizacion_usuario")
        .push({
            id: String(db.get("autorizacion_usuario").value()?.length + 1 || 1),
            id_autorizacion: ID_AUTORIZACION_ADMIN,
            id_sistema_usuario: String(nuevoId)
        })
        .write();
    console.log(`Usuario admin creado exitosamente con contraseña encriptada.`);
} else {
    console.log("El usuario admin ya existe, no se vuelve a crear.");
}

// -------------------------------------------------------
// INTERCEPTORES: Encriptar contraseñas automáticas del CRUD
// -------------------------------------------------------

// Al crear un nuevo usuario desde el Frontend
server.post("/usuarios", (req, res, next) => {
    if (req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
    }
    next();
});

// Al editar un usuario desde el Frontend
server.put("/usuarios/:id", (req, res, next) => {
    if (req.body.password) {
        // Solo encriptamos si es texto plano (no un hash de bcrypt existente)
        if (!req.body.password.startsWith("$2a$") && !req.body.password.startsWith("$2b$")) {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
        }
    }
    next();
});

// -------------------------------------------------------
// Ruta de login -> POST /api/auth/login
// -------------------------------------------------------
server.post("/api/auth/login", async (req, res) => {
    const { correo, contrasena, contraseña, password } = req.body;
    const claveIngresada = contrasena || contraseña || password;

    if (!correo || !claveIngresada) {
        return res.status(400).json({ mensaje: "Debes enviar correo y contraseña." });
    }

    try {
        const usuario = db.get("usuarios").find({ correo }).value();

        if (!usuario) {
            return res.status(401).json({ mensaje: "Credenciales incorrectas." });
        }

        const hashAlmacenado = usuario.password || usuario.contraseña;

        // Comparación segura con Bcrypt
        const esValida = await bcrypt.compare(claveIngresada, hashAlmacenado);

        if (!esValida) {
            return res.status(401).json({ mensaje: "Credenciales incorrectas." });
        }

        if (usuario.activar_usuario === false) {
            return res.status(403).json({ mensaje: "El usuario no está activado." });
        }

        const relacion = db.get("autorizacion_usuario")
            .find({ id_sistema_usuario: String(usuario.id) })
            .value();

        const autorizacion = relacion && relacion.id_autorizacion 
            ? db.get("autorizaciones").find({ id: String(relacion.id_autorizacion) }).value() 
            : null;

        const { password: _omit1, contraseña: _omit2, ...usuarioSinPassword } = usuario;

        return res.status(200).json({
            mensaje: "¡Ingreso exitoso!",
            token: "fake-jwt-token-lente-magico",
            usuario: usuarioSinPassword,
            rol: autorizacion ? autorizacion.nombre : "Sin rol asignado"
        });

    } catch (error) {
        console.error("Error en el proceso de login:", error);
        return res.status(500).json({ mensaje: "Error interno en el servidor." });
    }
});

// Rutas normales de json-server (CRUD)
server.use(router);

server.listen(3000, () => {
    console.log("===================================================");
    console.log(" Servidor de Lente Mágico corriendo en el puerto 3000");
    console.log(" Endpoint de Login: http://localhost:3000/api/auth/login");
    console.log("===================================================");
});