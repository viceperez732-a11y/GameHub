# GameHub - Guía de instalación (léela completa antes de empezar)

Sigue estos pasos EN ORDEN. No te saltes ninguno.

## 0. Requisitos previos

- Tener instalado **Python 3.10+**
- Tener instalado **Node.js** (con npm)
- Tener instalado **MySQL** (y MySQL Workbench, opcional pero recomendado)

## 1. Clona el repositorio

```bash
git clone <URL-del-repositorio>
cd GameHub
```

## 2. Crea la base de datos en MySQL

Abre MySQL Workbench, conéctate a tu servidor local, abre una nueva pestaña de
consulta (SQL), copia y pega TODO el contenido de `backend/schema.sql`, y
ejecútalo (ícono del rayo ⚡). Esto crea la base `gamehub_db` y la tabla
`usuarios`.

## 3. Configura el backend

> ⚠️ **IMPORTANTE**: todos los comandos de esta sección se hacen **DENTRO**
> de la carpeta `backend`. Si los corres en la carpeta raíz de `GameHub` por
> error, se crea un `venv` en el lugar equivocado y nada va a funcionar bien.

```bash
cd backend
python -m venv venv
```

Actívalo:
- **Windows (PowerShell):** `.\venv\Scripts\activate`
- **Mac/Linux:** `source venv/bin/activate`

Debes ver `(venv)` al inicio de la línea de tu terminal. Si no lo ves, no
sigas, repite este paso.

Instala las dependencias:

```bash
pip install -r requirements.txt
```

Configura tus variables de entorno:

```bash
copy .env.example .env     # en Windows
cp .env.example .env       # en Mac/Linux
```

Abre el archivo `.env` que se creó y coloca tu contraseña real de MySQL en
`DB_PASSWORD`. Las demás líneas normalmente se dejan igual si usas `root` y
`localhost`.

## 4. Configura el frontend

Desde la **raíz** del proyecto (sal de `backend` con `cd ..`):

```bash
npm install
```

## 5. Cómo correr el proyecto (cada vez que trabajes en él)

Necesitas **dos terminales abiertas al mismo tiempo**:

**Terminal 1 — Backend:**
```bash
cd backend
.\venv\Scripts\activate      # Windows
python app.py
```
Debe decir: `Running on http://127.0.0.1:5000`

**Terminal 2 — Frontend:**
```bash
npm run dev
```
Debe decir: `Local: http://localhost:5173/`

Abre `http://localhost:5173` en tu navegador. Con ambas terminales corriendo
al mismo tiempo, ya puedes registrarte e iniciar sesión.

## 6. Errores comunes (y cómo evitarlos)

| Error | Causa | Solución |
|---|---|---|
| `ModuleNotFoundError: No module named 'flask'` (o pymysql, etc.) | Corriste `pip install` en un `venv` distinto al que usas para correr `python app.py`, o VS Code auto-activó un venv viejo | Verifica que `(venv)` en la terminal corresponda al de `backend/venv`. Corre `.\venv\Scripts\activate` manualmente ahí dentro. |
| `'cryptography' package is required...` | Falta un paquete para la autenticación de MySQL 8 | Ya está agregado en `requirements.txt`, solo asegúrate de correr `pip install -r requirements.txt` completo. |
| `No se pudo conectar con el servidor` (en el navegador) | El backend (`python app.py`) no está corriendo | Revisa que la Terminal 1 siga abierta y diga `Running on...` |
| `python -m venv venv venv` da error | Escribiste "venv" dos veces por accidente | El comando correcto es: `python -m venv venv` (una sola vez al final) |
| Ejecutaste `python -m venv venv` en la carpeta raíz de `GameHub` en vez de en `backend` | Te faltó hacer `cd backend` primero | Borra esa carpeta `venv` mal ubicada y repite el paso 3 completo, empezando con `cd backend` |

## 7. Qué NO subir a Git

La carpeta `backend/venv` **nunca se sube** a GitHub (pesa mucho y cada quien
crea la suya). Debe estar en el `.gitignore`. Si no está, agrégale esta línea:

```
backend/venv/
```

Tampoco subas tu archivo `.env` con tu contraseña real — solo se sube
`.env.example` como plantilla.
