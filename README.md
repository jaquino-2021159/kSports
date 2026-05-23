# SportKinal-IN6BM

Administrador de Servidores - API de Gestión Administrativa
API RESTful para gestión administrativa de campos deportivos, reservas y torneos en la plataforma KinalSports.

📋 Descripción
Servicio backend que proporciona endpoints para que administradores gestionen campos deportivos, confirmen/rechacen reservas, administren torneos y equipos. Consume el servicio de autenticación para validar permisos de administrador.

🛠¦ Pila de tecnología
Tiempo de ejecución: Nodo.js 18+ (ESM)
Marco: Express 5.x
Base de datos: MongoDB 6.0+
ODM: Mangosta 8.x
Autenticación: JWT (validación contra auth-service)
Validacion: validador expreso
Almacenamiento: Cloudinary (imágenes de campos)
Documentación: Swagger (swagger-ui-express)
Seguridad: Casco, CORS, Limitación de Tarifa
🚀 Instalación
# Desde la raza del monorepo
instalación pnpm

# O especificamente este servicio
instalación de administrador de servidor de filtro pnpm
⚙¦ Variables de Entorno
Crear archivo .env en servidor-administrador/:

# Servidor
NODO_ENV=desarrollo
PUERTO=3002

# MongoDB
URI_MONGODB=mongodb://localhost:27017/kinalsports

# Configuración JWT
JWT_SECRET=tu-clave-secreta-aqui
JWT_ISSUER=KinalSportsAuth
JWT_AUDIENCIA=KinalSportsAPI

# Cloudinary (subir de imágenes de campos)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
CARPETA_CLOUDINARIA=kinalDeportes/campos
CLOUDINARY_TEAMS_FOLDER=kinalSports/equipos
📂 Estructura
servidor-administrador/
├── configuraciones/
│ ├── app.js # Configuración principal del servidor
│ ├── db.js # Conexión MongoDB
│ ├── cors-configuration.js # Configuración CORS
│ └── casco-configuración.js # Encabezados de seguridad
middlewares ├──/
│ ├── validar-JWT.js # Verificación de tokens
│ ├── validate-role.js # Verificación de roles (ADMIN)
│ ├── field-validators.js # Validadores de campos deportivos
│ ├── reserva-validators.js # Validadores de reservas
│ ├── reserva-conflicto.js # Validación de conflictos
│ ├── file-uploader.js # Multer + Cloudinary
│ └── handle-errors.js # Manejo centralizado de errores
├── src/
│ ├── campos/
│ │ ├── field.controller.js # Controladores de campos
│ │ ├── field.model.js # Modelo de campo deportivo
│ │ └── field.routes.js # Rutas de campos
│ ├── reservas/
│ │ ├── reserva.controller.js # Controladores de reservas
│ │ ├── reserva.model.js # Modelo de reserva
│ │ └── reserva.routes.js # Rutas de reservas
│ ├── equipos/
│ │ ├── team.controller.js # Controladores de equipo
│ │ ├── team.model.js # Modelo de equipos deportivos
│ │ └── team.routes.js # Rutas de equipos
│ └── torneos/
│ ├── tournament.controller.js # Controladores de torneos
│ ├── tournament.model.js # Modelo de torneo
│ └── tournament.routes.js # Rutas de torneos
└── index.js # Punto de entrada
🎯 Scripts Disponibles
# Desarrollo con auto-reload
pnpm --filtro servidor-admin dev

# Producción
pnpm --filtro servidor-admin inicio

# Lint
pnpm --filtro servidor-admin pelusa
pnpm --filtro servidor-admin pelusa:arreglar

# Formato
pnpm - formato filtro servidor-administrador
pnpm --filtro formato servidor-admin: comprobar
Principales de puntos finales de 🔌
Campos Deportivos
Metodo	Punto final	Descripción	Autenticación
OBTENER	/kinalSportsAdmin/v1/fields	Listar todos los campos	Administrador
OBTENER	/kinalSportsAdmin/v1/fields/:id	Obtener campo por ID	Administrador
PUBLICAR	/kinalSportsAdmin/v1/fields	Crear nuevo campo	Administrador
PONER	/kinalSportsAdmin/v1/fields/:id	Actualizar campo	Administrador
PONER	/kinalSportsAdmin/v1/fields/:id/activate	Activar campo	Administrador
PONER	/kinalSportsAdmin/v1/fields/:id/desactive	Campo desactivar	Administrador
Reservas
Metodo	Punto final	Descripción	Autenticación
OBTENER	/kinalSportsAdmin/v1/reservas	Listar todas las reservas	Administrador
OBTENER	/kinalSportsAdmin/v1/reservations/:id	Obtener reserva por ID	Administrador
PONER	/kinalSportsAdmin/v1/reservations/:id/confirm	Confirmar reserva	Administrador
Equipos deportivos
Metodo	Punto final	Descripción	Autenticación
OBTENER	/kinalSportsAdmin/v1/equipos	Listar todos los equipos	Administrador
OBTENER	/kinalSportsAdmin/v1/teams/:id	Obtener un equipo por ID	Administrador
PUBLICAR	/kinalSportsAdmin/v1/equipos	Crear un nuevo equipo	Administrador
PONER	/kinalSportsAdmin/v1/teams/:id	Actualizar datos del equipo	Administrador
PONER	/kinalSportsAdmin/v1/teams/:id/activate	Activar equipo	Administrador
PONER	/kinalSportsAdmin/v1/teams/:id/deactivate	Desactivar equipo	Administrador
ELIMINAR	/kinalSportsAdmin/v1/teams/:id	Eliminar equipo	Administrador
Torneos
Método	Endpoint	Descripción	Auth
GET	/kinalSportsAdmin/v1/tournaments	Listar todos los torneos	Admin
GET	/kinalSportsAdmin/v1/tournaments/:id	Obtener un torneo por ID	Admin
POST	/kinalSportsAdmin/v1/tournaments	Crear un nuevo torneo	Admin
PUT	/kinalSportsAdmin/v1/tournaments/:id	Actualizar datos del torneo	Admin
PUT	/kinalSportsAdmin/v1/tournaments/:id/activate	Activar torneo	Admin
PUT	/kinalSportsAdmin/v1/tournaments/:id/deactivate	Desactivar torneo	Admin
DELETE	/kinalSportsAdmin/v1/tournaments/:id	Eliminar torneo	Admin
Ejemplo de Requests Campo
Crear Campo:

PUBLICAR http://localhost:3002/kinalSportsAdmin/v1/fields
Tipo de contenido: multiparte/formulario-datos

{
  "nombre del campo": "Cancha Fútbol 11",
  "descripción": "Cancha de fútbol tamaño reglamentario",
  "tipo de campo": "NATURAL",
  "capacidad": "FUTBOL_11",
  "precioPorHora": 150,00,
  "imagen": <archivo>
}
Listar Reservas:

OBTENER http://localhost:3002/kinalSportsAdmin/v1/reservations?estado=PENDIENTE
Confirmar Reserva:

PONER http://localhost:3002/kinalSportsAdmin/v1/reservations/507f1f77bcf86cd799439011/confirm
Tipo de contenido: aplicación/json

{
  "confirmado por": "ID de usuario-administrador"
}
🗄¦ Modelos de Base de Datos
Campo (Campo Deportivo)
{
  _id: Id de objeto,
  nombre del campo: Cadena (requerido, máx 100),
  descripción: Cadena (máx 500),
  tipo de campo: Cadena (enumerar: 'NATURAL', 'SINTETICA', 'CONCRETO'),
  capacidad: Cadena (enumerar: 'FUTBOL_5', 'FUTBOL_7', 'FUTBOL_11'),
  precioPorHora: Número (requerido, min 0),
  foto: Cadena (Cloudinario URL),
  es activo: booleano (predeterminado: verdadero),
  creado en: Fecha,
  actualizado en: Fecha
}
Reserva (Reserva)
{
  _id: Id de objeto,
  ID de usuario: Cadena (UUID del autenticación-servicio),
  ID de campo: Id de objeto (ref: Campo),
  hora de inicio: Fecha (requerido),
  hora de finalización: Fecha (requerido),
  estado: Cadena (enumerar: 'PENDIENTE', 'CONFIRMADO', 'CANCELADO', 'COMPLETADO', 'NO_SHOW'),
  confirmación: {
    confirmedAt: Date,
    confirmedBy: String
  },
  lastModifiedBy: String,
  createdAt: Date,
  updatedAt: Date
}
Team (Equipo Deportivo)
Listar todo:

GET http://localhost:3002/kinalSportsAdmin/v1/teams
Listar todo:

GET http://localhost:3002/kinalSportsAdmin/v1/teams/67af2c9082b48b2be88bb72d
Crear un quipo:

PUBLICAR http://localhost:3002/kinalSportsAdmin/v1/teams

{
  "nombre del equipo": „Los Halcones",
  "nombre del administrador": „Carlos López",
  "categoría": „FUTBOL_11",
  "color uniforme": "Azul",
  "logotipo": <archivo>    # OPCIONAL
}
Actualizar equipo:

PONER http://localhost:3002/kinalSportsAdmin/v1/teams/67af2c9082b48b2be88bb72d

{
  "nombre del equipo": „Los Halcones FC",
  "nombre del administrador": „Eduardo Pérez",
  "categoría": „FUTBOL_11",
  "color uniforme": „Negro",
  "logotipo": <archivo>    # OPCIONAL (reemplaza el anterior)
}
Activar equipo:

PONER http://localhost:3002/kinalSportsAdmin/v1/teams/67af2c9082b48b2be88bb72d/activate
Desactivar equipo:

PONER http://localhost:3002/kinalSportsAdmin/v1/teams/67af2c9082b48b2be88bb72d/deactivate
Eliminar equipo:

ELIMINAR http://localhost:3002/kinalSportsAdmin/v1/teams/67af2c9082b48b2be88bb72d
Torneo (Torneo)
Listar todo:

OBTENER http://localhost:3002/kinalSportsAdmin/v1/tournaments
Listar todo:

OBTENER http://localhost:3002/kinalSportsAdmin/v1/tournaments/67af2c9082b48b2be88bb72d
Crear un torneo:

POST http://localhost:3002/kinalSportsAdmin/v1/tournaments

{
  "tournamentName": "Copa de Campeones",
  "category": "FUTBOL_11",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "location": "Ciudad de Guatemala",
  "description": "Torneo de fútbol de la ciudad de Guatemala",
  "logo": <file>    # OPCIONAL
}
Actualizar torneo:

PUT http://localhost:3002/kinalSportsAdmin/v1/tournaments/67af2c9082b48b2be88bb72d

{
  "tournamentName": "Copa de Campeones",
  "category": "FUTBOL_11",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "location": "Ciudad de Guatemala",
  "description": "Torneo de fútbol de la ciudad de Guatemala",
  "logotipo": <archivo>    # OPCIONAL (reemplaza el anterior)
}
Activar torneo:

PONER http://localhost:3002/kinalSportsAdmin/v1/tournaments/67af2c9082b48b2be88bb72d/activate
Desactivar torneo:

PONER http://localhost:3002/kinalSportsAdmin/v1/tournaments/67af2c9082b48b2be88bb72d/deactivate
Eliminar torneo:

ELIMINAR http://localhost:3002/kinalSportsAdmin/v1/tournaments/67af2c9082b48b2be88bb72d
🔐 Autenticación y Autorización
Este servicio NO maneja autenticación directamente. Consume el servicio de autenticación mediante:

Middleware validar-JWT.js: Verifica token JWT en encabezado Autorización: Portador <token>
Middleware validar-role.js: Valida que el usuario tiene rol ADMINISTRADOR
Flujo de autenticación:

Cliente → [JWT Token] → server-admin → validar-JWT → decodifica token →
verifica rol ADMIN → permite acceso
🔗 Dependencias con Otros Servicios
nodo de autenticación/servicio de autenticación: Valida tokens JWT y obtiene información de usuario
usuario-servidor: Puede compartir modelos de Reserva (usuarios crean, administradores confirm)
administrador-cliente: Frontend que consume todos estos puntos finales
🛡¦ Validaciones y Seguridad
Validacion de conflictos: No permite reservas superpuestas en el mismo campo
Validacion de horarios: Valida que startTime < endTime y duración mínima
Limitación de tarifas: 100 solicitudes por 15 minutos
Desinfección: express-validator desinfecta todos los insumos
CORS: Solo orígenes permitidos en .env
📊 Swagger / Documentación API
Nota: Swagger aun no está configurado en este servicio.

🧪 Pruebas
# Pruebas de ejecución (cuando estén implementados)
pnpm --filtro servidor-admin prueba
📝 Notas de Desarrollo
El servidor lucha en el puerto definido en .env (predeterminado: 3002)
Las rutas están prefijadas con /api
Todas las rutas requieren autenticación JWT con rol ADMIN
Las imágenes de campos se suben automatiamente a Cloudinary
MongoDB se conecta automáticamente al iniciar el servidor
Los errores se manejan centralmente y devuelven JSON estructurado
🚀 Próximas Funcionalidades
 CRUD completo de torneos
 Gestión de equipos
 Informes y estadísticas
 Notificaciones push/email al confirmar reservas
 Dashboard de métricas (reservas por mes, ingresos, etc.)
