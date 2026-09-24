# GameHub - Backend (Registro + Inicio de sesión)

Backend mínimo en **Python (Flask)** con base de datos **MySQL**. Solo maneja
dos cosas: registro de usuarios e inicio de sesión. Al iniciar sesión
correctamente, responde con `redirect: "/perfil"` para que React navegue
a la página de perfil (esto ya está conectado en `IniciarSesion.jsx`).

## 1. Estructura

```
GameHub-backend/
├── app.py                     # Servidor Flask con las 4 rutas
├── requirements.txt           # Dependencias de Python
├── schema.sql                 # Script para crear la base de datos y tabla
├── .env.example                # Variables de entorno de ejemplo
└── frontend-actualizado/
    ├── Registro.jsx            # Reemplaza al original en src/pages/
    └── IniciarSesion.jsx       # Reemplaza al original en src/pages/
```

## 2. Preparar la base de datos MySQL

Con MySQL corriendo localmente:

```bash
mysql -u root -p < schema.sql
```

Esto crea la base `gamehub_db` y la tabla `usuarios`.

## 3. Configurar el backend

```bash
cd GameHub-backend
python -m venv venv
source venv/bin/activate      # En Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Edita .env y coloca tu usuario/contraseña real de MySQL
```

## 4. Ejecutar el servidor

```bash
python app.py
```

El backend queda corriendo en `http://localhost:5000`.

## 5. Rutas disponibles

| Método | Ruta            | Descripción                                    |
|--------|-----------------|-------------------------------------------------|
| POST   | `/api/registro` | Crea un usuario (`name`, `email`, `password`, `confirm`) |
| POST   | `/api/login`    | Inicia sesión (`email`, `password`) → responde `redirect: "/perfil"` |
| GET    | `/api/perfil`   | Devuelve los datos del usuario logueado (requiere sesión activa) |
| POST   | `/api/logout`   | Cierra la sesión                                |

Ejemplo de respuesta exitosa de `/api/login`:

```json
{
  "ok": true,
  "mensaje": "¡Inicio de sesión exitoso!",
  "redirect": "/perfil",
  "usuario": { "id": 1, "nombre": "Pedro", "email": "pedro@correo.com", "avatar": null, "bio": null }
}
```

## 6. Conectar con el frontend (React)

1. Copia los archivos de `frontend-actualizado/` dentro de tu proyecto React,
   reemplazando los originales en `src/pages/`:
   - `Registro.jsx`
   - `IniciarSesion.jsx`

   Ya vienen editados para llamar al backend real (antes solo simulaban el
   registro/login) y mantienen la redirección a `/perfil` al iniciar sesión.

2. Asegúrate de correr el frontend con Vite normalmente:

   ```bash
   npm run dev
   ```

   Por defecto corre en `http://localhost:5173`, que ya está permitido en el
   CORS del backend (`FRONTEND_URL` en `.env`). Si usas otro puerto, actualiza
   esa variable.

3. Con el backend (`python app.py`) y el frontend (`npm run dev`) corriendo
   al mismo tiempo, prueba:
   - Ir a `/registro` y crear una cuenta.
   - Ir a `/iniciar-sesion` e ingresar con esa cuenta → te redirige a `/perfil`.

## 7. Notas de seguridad

- Las contraseñas se guardan con hash (`werkzeug.security`), nunca en texto plano.
- La sesión se maneja con cookies firmadas (`SECRET_KEY`); cámbiala en producción.
- Este backend solo cubre registro/login a propósito, tal como se pidió —
  no incluye edición de perfil, catálogo, rentas, etc. Esas rutas se pueden
  agregar después siguiendo el mismo patrón.
