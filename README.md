# Grupo 1 – Sistema de Gestión de artículos para el hogar

## Participante:
- Agustin Cauzi
- Juan Diaz
- Federico Johannson
- Facundo Beduino
- Alejo Marrero
- Deian Pla


**Curso:** Desarrollo y Arquitecturas Web (2025)  
**Profesor:** Sebastián Nicolás Luna (<sebastian.luna@uai.edu.ar>)  
**Módulo:** Gestión de artículos para el hogar

---

## 📖 Descripción

Este repositorio contiene el **sistema de administración de usuarios y privilegios**, junto al **módulo de “Gestión de artículos para el hogar”** desarrollado por el **Grupo 1**.  
- Un **backend RESTful** implementado con **ASP NET Web API** para manejar usuarios, autenticación y autorización.
- Un **frontend** basado en **ASP NET MVC** para la interfaz de usuario y el módulo de “Gestión de artículos para el hogar”.
- Total la **documentacion** del sistema.

---

## 🚀 Funcionalidades

1. **Login / Logout**  
   - Inicio de sesión con emisión de JWT y refresh token.  
2. **Gestión de Usuarios**  
   - Crear, editar, ver y dar de baja usuarios.  
   - Asignación de roles y privilegios.  
3. **Control de Acceso**  
   - Middleware que valida permisos antes de cada operación.  
4. **Módulo Artículos**  
   - **Listar** todos los artículos (rol “lector”).  
   - **Crear** nuevos artículos (rol “creador”).  
   - **Editar** artículos existentes (rol “editor”).  
   - **Eliminar** artículos (rol “borrador”).  

---

## 🛠️ Tecnologías

- **Backend:** C# · ASP .NET Web Forms  
- **Base de datos:** SQL Server (Schema y DER incluidos)  
- **Frontend:** Javascript (React) · CSS  Framework (Tailwind)
- **Autenticación:** JWT + Refresh Tokens  

---

## 📂 Estructura del Proyecto



