// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  mostrarComentariosPublicados();

  // Capturar envío del formulario
  document.addEventListener("submit", async function (e) {
    if (e.target && e.target.id === "formulario-comentario") {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim() || "Anónimo";
      const comentario = document.getElementById("comentario").value.trim();

      if (!comentario) return; // evitar comentarios vacíos

      try {
        // Enviar comentario al backend en Vercel
        await fetch("/api/nuevo-comentario", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, comentario })
        });

        // Refrescar lista de comentarios
        mostrarComentariosPublicados();
        e.target.reset();
      } catch (error) {
        console.error("Error al enviar comentario:", error);
      }
    }
  });
});

// Mostrar comentarios publicados desde GitHub Issues
async function mostrarComentariosPublicados() {
  const lista = document.getElementById("lista-publicados");
  if (!lista) return;

  const owner = "TU_USUARIO"; // tu usuario de GitHub
  const repo = "TU_REPO";     // tu repositorio donde guardás los comentarios

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`);
    const issues = await response.json();

    // Orden descendente por fecha
    issues.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    lista.innerHTML = "";
    issues.forEach(issue => {
      const item = document.createElement("li");
      item.innerHTML = `
        <strong>${issue.user.login}</strong> 
        (${new Date(issue.created_at).toLocaleString('es-AR')})<br>
        <p>${issue.title}</p>
      `;
      lista.appendChild(item);
    });
  } catch (error) {
    console.error("Error al cargar comentarios:", error);
  }
}

