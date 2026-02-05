// Lista de artículos con fecha y hora de publicación
  const articulos = [
    { nombre: "articulo1.html", titulo: "Artículo 1", fecha: "2026-02-04T21:00:00" },
    { nombre: "articulo2.html", titulo: "Artículo 2", fecha: "2026-02-09T21:00:00" },
    { nombre: "articulo3.html", titulo: "Artículo 3", fecha: "2026-02-15T21:00:00" },
    { nombre: "articulo4.html", titulo: "Artículo 4", fecha: "2026-02-26T21:00:00" },
    { nombre: "articulo5.html", titulo: "Artículo 5", fecha: "2026-03-02T21:00:00" },
    { nombre: "articulo6.html", titulo: "Artículo 6", fecha: "2026-03-08T21:00:00" },
    { nombre: "articulo7.html", titulo: "Artículo 7", fecha: "2026-03-14T21:00:00" },
    { nombre: "articulo8.html", titulo: "Artículo 8", fecha: "2026-03-20T21:00:00" },
    { nombre: "articulo9.html", titulo: "Artículo 9", fecha: "2026-03-26T21:00:00" },
    { nombre: "articulo10.html", titulo: "Artículo 10", fecha: "2026-04-01T21:00:00" },
    // Agregá más artículos según tu cronograma editorial
  ];

  const ahora = new Date();
  const contenedor = document.getElementById("lista-articulos");
  const mensaje = document.getElementById("mensaje-proximo");

  let siguiente = null;

  // Mostrar artículos cuya fecha ya pasó
  articulos.forEach(articulo => {
    const fechaPublicacion = new Date(articulo.fecha);
    if (ahora >= fechaPublicacion) {
      const li = document.createElement("li");
      li.innerHTML = `<a href="articulos/${articulo.nombre}">${articulo.titulo}</a>`;
      contenedor.appendChild(li);
    } else if (!siguiente || fechaPublicacion < new Date(siguiente.fecha)) {
      siguiente = articulo;
    }
  });

  // Mostrar el próximo artículo programado
  if (mensaje && siguiente) {
    const fecha = new Date(siguiente.fecha);
    mensaje.textContent = `${siguiente.titulo} estará disponible el ${fecha.toLocaleDateString('es-AR')} a las ${fecha.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}`;
  }
