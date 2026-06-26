UrbanIA 🚀

Plataforma inteligente de monitoreo urbano desarrollada con React y Django que utiliza visión artificial para detectar residuos, contenedores y zonas críticas en espacios urbanos.

📌 Descripción

UrbanIA permite analizar imágenes urbanas mediante inteligencia artificial, clasificando automáticamente elementos detectados y generando reportes visuales para facilitar la gestión urbana.

El sistema fue diseñado como proyecto Full Stack integrando:

Frontend moderno con React
Backend REST con Django
Procesamiento de imágenes con IA
Integración con Roboflow
Visualización geográfica mediante mapas interactivos
🧠 Tecnologías utilizadas
Frontend
React
JavaScript
Tailwind CSS
MapLibre GL
Vite
Backend
Django
Django REST Framework
Python
Inteligencia Artificial
Roboflow API
Base de datos
SQLite (desarrollo)
Herramientas
Git
GitHub
Linux
Docker (conocimientos aplicados)
⚙️ Funcionalidades
Dashboard
Resumen de actividad urbana
Estadísticas generales
Visualización de reportes
Mapa interactivo
Reportes
Carga de imágenes
Vista previa
Gestión de reportes
Historial de análisis
Inteligencia Artificial
Detección automática de residuos
Identificación de contenedores
Clasificación de imágenes
Nivel de confianza por detección
Análisis
Métricas generales
Categorías detectadas
Distribución de resultados
Confianza promedio
Configuración
Estado del backend
Estado del motor de IA
Información del sistema
🏗️ Arquitectura

Frontend (React)
↓
Backend (Django REST API)
↓
Servicio de IA (Roboflow)
↓
Resultados procesados + visualización

🚀 Instalación
Backend
git clone https://github.com/agustinafilosofia20-stack/Urbania.git

cd Urbania

python -m venv312 .venv

source .venv/bin/activate
# Windows:
.venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
Frontend
cd frontend

npm install

npm run dev
🔐 Variables de entorno
Backend (.env)
ROBOFLOW_API_KEY=TU_API_KEY
DJANGO_SECRET_KEY=TU_SECRET_KEY
DEBUG=True
Frontend
VITE_API_URL=http://127.0.0.1:8000
📊 Estado actual

Proyecto funcional:

Sistema de autenticación local
Dashboard operativo
Gestión de reportes con imágenes
Integración con Roboflow
Mapa interactivo con MapLibre
Estadísticas automáticas
Backend Django conectado con frontend React
🚀 Próximas mejoras
Migración a PostgreSQL
Deploy en producción
CI/CD automatizado
Gestión de usuarios y roles
Historial avanzado de reportes
Métricas geográficas avanzadas
Exportación de reportes
Optimización del modelo IA
 
 👩‍💻 Autor
María Agustina
Full Stack Developer (Junior)
