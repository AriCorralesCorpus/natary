function verificarPermiso(...permisosPermitidos) {

    return (req, res, next) => {

        const permisosUsuario = req.user.permisos || [];

        const autorizado = permisosPermitidos.some(p =>
            permisosUsuario.includes(p)
        );

        if (!autorizado) {

            return res.status(403).json({
                message: "No tienes permisos para realizar esta acción."
            });

        }

        next();

    };

}

module.exports = verificarPermiso;