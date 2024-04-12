/* eslint-disable no-const-assign */
const urlPageTitle = "JS Single Page Application Router";

// create document click that watches the nav links only
document.addEventListener("click", (e) => {
	const { target } = e;
	if (!target.matches("nav a")) {
		return;
	}
	e.preventDefault();
	urlRoute();
});

// create an object that maps the url to the template, title, and description
const urlRoutes = {
	404: {
		template: "/templates/404.html",
		title: "404 | " + urlPageTitle,
		description: "Page not found",
	},
	"/": {
		template: "/templates/index.html",
		title: "Home | " + urlPageTitle,
		description: "This is the home page",
	},
	"/nuevaSolicitud": {
		template: "/templates/nuevaSolicitud.html",
		title: "Nueva Solicitud | " + urlPageTitle,
		description: "Nueva Solicitud",
	},
	"/misSolicitudes": {
		template: "/templates/misSolicitudes.html",
		title: "Mis Solicitudes | " + urlPageTitle,
		description: "This is the solcitudes page",
	},
	"/agregarUsuarios": {
		template: "/templates/admin_Roles_y_Usuarios/agregarUsuarios.html",
		title: "Agregar usuarios | " + urlPageTitle,
		description: "This is the agregar usuarios page",
	},
	"/adminRoles": {
		template: "/templates/admin_Roles_y_Usuarios/adminRoles.html",
		title: "Administrar Roles | " + urlPageTitle,
		description: "This is the Administrar Roles page",
	},
	"/logEventos": {
		template: "/templates/Auditoria_Procesos/logEventos.html",
		title: "Administrar Roles | " + urlPageTitle,
		description: "This is the Administrar Roles page",
	},
	"/snapSolicitudes": {
		template: "/templates/Auditoria_Procesos/snapSolicitudes.html",
		title: "Administrar Roles | " + urlPageTitle,
		description: "This is the Administrar Roles page",
	},
	"/miPerfil": {
		template: "/templates/miPerfil.html",
		title: "Mi Perfil | " + urlPageTitle,
		description: "Mi Perfil",
	},
};

// create a function that watches the url and calls the urlLocationHandler
const urlRoute = (event) => {
	event = event || window.event; // get window.event if event argument not provided
	event.preventDefault();
	// window.history.pushState(state, unused, target link);
	window.history.pushState({}, "", event.target.href);
	urlLocationHandler();
};

// create a function that handles the url location
const urlLocationHandler = async () => {
	const location = window.location.pathname; // get the url path
	// if the path length is 0, set it to primary page route
	if (location.length == 0) {
		location = "/";
	}
	// get the route object from the urlRoutes object
	const route = urlRoutes[location] || urlRoutes["404"];
	// get the html from the template
	const html = await fetch(route.template).then((response) => response.text());
	// set the content of the content div to the html
	document.getElementById("content").innerHTML = html;
	// set the title of the document to the title of the route
	document.title = route.title;
	// set the description of the document to the description of the route
	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", route.description);
};

// add an event listener to the window that watches for url changes
window.onpopstate = urlLocationHandler;
// call the urlLocationHandler function to handle the initial url
window.route = urlRoute;
// call the urlLocationHandler function to handle the initial url
urlLocationHandler();
