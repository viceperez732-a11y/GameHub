"""
GameHub - Backend mínimo (Registro + Inicio de sesión)
--------------------------------------------------------
Solo tiene 4 rutas:
  POST /api/registro   -> crea un usuario nuevo
  POST /api/login       -> valida credenciales e inicia sesión
  GET  /api/perfil      -> devuelve los datos del usuario logueado
                           (si no hay sesión, responde 401)
  POST /api/logout      -> cierra la sesión

El frontend (React) es quien redirige a "/perfil" cuando /api/login
responde éxito (esto ya lo hace IniciarSesion.jsx con navigate('/perfil')).
"""

import os
import re
from datetime import timedelta

import pymysql
from flask import Flask, jsonify, request, session
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret-key")
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=1)

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# CORS con soporte de credenciales para poder usar cookies de sesión
# desde el frontend de React (Vite corre normalmente en el puerto 5173).
CORS(app, supports_credentials=True, origins=[FRONTEND_URL])


# ---------------------------------------------------------------------
# Conexión a la base de datos MySQL
# ---------------------------------------------------------------------
def get_conexion():
    return pymysql.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", 3306)),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", ""),
        database=os.getenv("DB_NAME", "gamehub_db"),
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True,
    )


EMAIL_REGEX = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


# ---------------------------------------------------------------------
# POST /api/registro
# ---------------------------------------------------------------------
@app.route("/api/registro", methods=["POST"])
def registro():
    data = request.get_json(silent=True) or {}
    nombre = (data.get("name") or data.get("nombre") or "").strip()
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    confirm = data.get("confirm") or ""

    # --- Validaciones ---
    if not nombre or not email or not password or not confirm:
        return jsonify({"ok": False, "error": "Completa todos los campos."}), 400

    if not EMAIL_REGEX.match(email):
        return jsonify({"ok": False, "error": "El correo no es válido."}), 400

    if len(password) < 6:
        return jsonify({"ok": False, "error": "La contraseña debe tener al menos 6 caracteres."}), 400

    if password != confirm:
        return jsonify({"ok": False, "error": "Las contraseñas no coinciden."}), 400

    conexion = get_conexion()
    try:
        with conexion.cursor() as cursor:
            cursor.execute("SELECT id FROM usuarios WHERE email = %s", (email,))
            if cursor.fetchone():
                return jsonify({"ok": False, "error": "Ese correo ya está registrado."}), 409

            password_hash = generate_password_hash(password)
            cursor.execute(
                "INSERT INTO usuarios (nombre, email, password_hash) VALUES (%s, %s, %s)",
                (nombre, email, password_hash),
            )
        return jsonify({"ok": True, "mensaje": "Cuenta creada correctamente. ¡Bienvenido a Game Hub!"}), 201
    finally:
        conexion.close()


# ---------------------------------------------------------------------
# POST /api/login
# ---------------------------------------------------------------------
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not email or not password:
        return jsonify({"ok": False, "error": "Por favor llena todos los campos."}), 400

    conexion = get_conexion()
    try:
        with conexion.cursor() as cursor:
            cursor.execute(
                "SELECT id, nombre, email, password_hash, avatar, bio FROM usuarios WHERE email = %s",
                (email,),
            )
            usuario = cursor.fetchone()
    finally:
        conexion.close()

    if not usuario or not check_password_hash(usuario["password_hash"], password):
        return jsonify({"ok": False, "error": "Correo o contraseña incorrectos."}), 401

    # Inicia sesión (cookie httpOnly firmada con SECRET_KEY)
    session.permanent = True
    session["usuario_id"] = usuario["id"]

    return jsonify({
        "ok": True,
        "mensaje": "¡Inicio de sesión exitoso!",
        "redirect": "/perfil",   # el frontend usa esto para navigate('/perfil')
        "usuario": {
            "id": usuario["id"],
            "nombre": usuario["nombre"],
            "email": usuario["email"],
            "avatar": usuario["avatar"],
            "bio": usuario["bio"],
        },
    }), 200


# ---------------------------------------------------------------------
# GET /api/perfil  (ruta protegida, requiere sesión activa)
# ---------------------------------------------------------------------
@app.route("/api/perfil", methods=["GET"])
def perfil():
    usuario_id = session.get("usuario_id")
    if not usuario_id:
        return jsonify({"ok": False, "error": "No has iniciado sesión."}), 401

    conexion = get_conexion()
    try:
        with conexion.cursor() as cursor:
            cursor.execute(
                "SELECT id, nombre, email, avatar, bio, creado_en FROM usuarios WHERE id = %s",
                (usuario_id,),
            )
            usuario = cursor.fetchone()
    finally:
        conexion.close()

    if not usuario:
        session.clear()
        return jsonify({"ok": False, "error": "Usuario no encontrado."}), 404

    return jsonify({"ok": True, "usuario": usuario}), 200


# ---------------------------------------------------------------------
# POST /api/logout
# ---------------------------------------------------------------------
@app.route("/api/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"ok": True, "mensaje": "Sesión cerrada."}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
