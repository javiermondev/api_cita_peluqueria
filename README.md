# Creación de aplicación para gestión de citas para una peluqueria

El proyecto se ha llevado a cabo con React, Vite y Supabase (para la pequeña base de datos)

# Proyecto (Aplicación para citas de una peluquería)

## 1.- Introducción

El proyecto consiste en la creación de una aplicación para coger citas para una peluqueria. Con la creación de 2 roles, cliente y administrador.

## 2.- Objetivos del proyecto

Creacón de una aplicación para coger citas y administrar la gestión de las mismas por parte del administrador. Para ahorrar tiempo y facilitar la solicitud de las mismas a los clientes.

## 3.- Justificación del proyecto

Este proyecto se desarrolló con el objetivo de aprender y practicar tecnologías modernas como React, Supabase, y despliegue en Vercel. Me permitió experimentar con bases de datos en tiempo real, autenticación de usuarios y gestión de interfaces interactivas.
Además de aprender teoría, se buscó crear una aplicación funcional que simulara un sistema de reservas de citas, integrando interacción con el usuario, manejo de datos y visualización de información.
Aunque el proyecto surgió como un ejercicio de aprendizaje, también tiene potencial como prototipo de una aplicación real, demostrando cómo se puede gestionar un sistema de reservas de manera eficiente y visualmente atractiva.

## 4.- Recursos utilizados
	
    4.1.- Entornos de desarrollo

    Para la realización del proyecto he utilizado Visual Studio Code para el desarrollo del mismo

	4.2.- Lenguajes de programación

    El principal lenguaje utilizado a sido Javascript y he utilizado React para su desarrollo

	4.3.- Utilidades

    He empleado el uso de herramientas como: 
    - Supabase como backend, que me ha servido para autenticación de usuarios, base de datos PostgreSQL y funciones para insertar, leer y actualizar datos como CRUD.
    - Chatgpt para la resolución de problemas y avanzar más rápido en la realización del proyecto.
    - Git y Github para el control de versiones y el alojamiento del repositorio
    - Vercel: Para desplegar la aplicación web de manera gratuita.

## 5.- Tecnologías de desarrollo

Lenguajes de programación
- JavaScript – para la lógica del frontend y manejo de eventos.
- HTML / JSX – estructura de las páginas en React.
- CSS – estilos visuales, incluyendo Tailwind o CSS puro.
Frameworks y librerías
- React – librería para construir la interfaz interactiva.
- FullCalendar – para mostrar y manejar el calendario de citas.
- Bootstrap / clases de CSS – para botones, tablas y layout.
Bases de datos y backend
- Supabase – base de datos PostgreSQL + autenticación + API para CRUD.
- Supabase Auth – manejo de usuarios y sesiones.
Plataformas y despliegue
- Vercel – hosting y despliegue del proyecto web.
- Git / GitHub – control de versiones y repositorio remoto.
Otras herramientas
- Visual Studio Code – entorno de desarrollo.
- NPM / Node.js – gestión de dependencias y scripts de desarrollo.

## 6.- Diseño del proyecto

Diseño visual (UI / UX)
- Uso de FullCalendar para mostrar las fechas y facilitar la selección de citas.
- Tablas para listar usuarios y citas, con estilos diferenciados por filas (clara/oscura) para mejorar la legibilidad.
- Botones claros y consistentes (verde para acciones principales, rojo para errores).
- Modal para mostrar horas disponibles de forma centralizada y evitar saturar la pantalla.
- Layout responsivo y sencillo: header con saludo y logout, contenido principal centrado.
Diseño lógico / arquitectónico
- Componentes separados: Dashboard, AdminPanel, Login, etc.
- Estados y hooks de React para manejar datos dinámicos (useState, useEffect).
- Integración con Supabase para manejar usuarios, citas y autenticación.
Funciones específicas para:
- Reservar citas (reservarHora)
- Consultar horas ocupadas (cargarHoras)
- Cancelar citas (modificarCita)
- Flujos de usuario claros:
- Clientes: ver calendario → seleccionar hora → reservar.
- Admin: ver usuarios → ver/modificar citas → cancelar.
Flujo de datos
- Frontend en React se comunica con Supabase vía API para lectura y escritura.
- Datos de usuarios y citas cargados al montar componentes o al cambiar de pestaña.
- Control de errores y mensajes en UI (setMensaje) para informar al usuario.

## 7.- Lógica/codificación del proyecto

1️⃣ Estructura del código
Componentes principales:
- Dashboard: interfaz para clientes, mostrar calendario y reservar citas.
- AdminPanel: gestión de usuarios y citas para administradores.
- Login y Register: autenticación de usuarios.
- Estilos: centralizados en fondoGlobal.css y algunas clases específicas para tablas, botones y modales.
- Librerías utilizadas: React, FullCalendar, Supabase, React Router.

2️⃣ Gestión de estados y hooks
- useState: para almacenar información dinámica como usuario, perfil, citas, horas ocupadas y mensajes.
- useEffect: para cargar datos al montar el componente o al cambiar estados relevantes (usuario, pestaña activa).
- Flujos condicionales: redirección de usuarios admin a /recordbook, control de citas únicas por usuario, actualización de mensajes en UI.

3️⃣ Integración con Supabase
- Autenticación: creación, login y logout de usuarios.
CRUD de citas:
- Create: reservar cita solo si la persona no tiene otra cita activa (cliente_id único).
- Read: cargar citas y usuarios para mostrar en tablas.
- Update: modificar estado de cita (cancelar).
- Delete: opcional, no implementado pero posible vía Supabase.
- Control de errores: mensajes al usuario si intenta duplicar cita, seleccionar hora ocupada o falla alguna operación en la base de datos.

4️⃣ Lógica del proyecto
Clientes:
- Seleccionan fecha en el calendario.
- Cargan horas disponibles.
- Reservan una hora, evitando duplicados.
- Reciben confirmación en pantalla.
Administradores:
- Visualizan todos los usuarios registrados.
- Visualizan y modifican citas (cancelar o marcar como ocupadas).
- Los cambios actualizan la base de datos y la interfaz de forma instantánea.

## 8.- Despliegue web del proyecto

El proyecto lo he desplegado con Vercel, utilizando como Base de datos Supabase. Supabase afrece una serie de ventajas, entre ellas la rápidez para poder crear todo que ahora mismo era lo que quería. Supabase tiene una serie de ventajas, entre ellas: 
- Utiliza base real de PostgreSQL
- Empleo para este proyecto el plan free
- Ofrece autenticación integrada y tiene buen nivel en cuanto a seguridad
- Tiene un panel visual fácil de asimilar
- Integra bien con React

## 9.- Manual de usuario

Pantalla inicial:
- Registro 
- Login de sesión

Pantalla de registro:
Cuenta con un formulario de registro para poder identificar al cliente. Dicho formulario cuenta con algunas reestricciones como un número de caracteres mínimos para la contraseña y una dirección de correo que será única en la base de datos, como identificador único para cada cliente.

Pantalla de Login:
Aparece un calendario, para que el usuario pueda coger su cita. En la parte superior damos la bienvenida al usuario registrado, con un hola + nombre, junto con la fecha de la cita que tenga solicitada de tenerla. Si el usuario aún no tiene tambien sale el mensaje poniendo que no tiene citas pendientes.

Para poder seleccionar la fecha de la cita, el cliente pulsará sobre el dia seleccionado y seleccionará una de las horas disponibles y esa hora ya quedará reservada. Pendiente de aprobar o cancelar por el administrador (aunque falta implementar esta parte). Cada usuario ahora mismo tiene limitado a sólo poder seleccionar una cita en la base de datos para no masificar ni permitir que cualquiera registre todas las horas que quiera y poner un poco de limites aunque será el administrador como ya he dicho, el que acepte o cancele las solicitudes de los clientes.

## 10.- Conclusiones

Empece el proyecto hace tiempo pero lo tuve que parar por motivos laborales y unos meses depues lo he retomado para terminarlo aunque todavía quedan cosas por pulir pero puede estar desarrollado a un 90% salvo pequeñas cosas que todavía son mejorables y que se pueden implementar más adelante.

Algunas cosas que faltan por terminar o mejorar.
- El administrador debe poder aceptar o cancelar las citas desde el panel de administración. El css está terminado pero faltaría implementar esto y que al usuario le saliera algún mensaje, ya que actualmente en la base de datos se gurdan las citas como pendiente. Pudiendo tambien guardarse como aceptadas o canceladas. En otros proyectos si tengo esto implementado pero aquí por falta de tiempo no pude hacerlo y estaría pendiente de hacerse.

- El diseño quizás tambien podría ser mejorable



## Autor

**Javier Montaño**  
📧 Email: javimtdaw@gmail.com 
