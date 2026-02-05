document.addEventListener("DOMContentLoaded", () => {
  mostrarComentariosPublicados();

  document.addEventListener("submit", async function (e) {
    if (e.target && e.target.id === "formulario-comentario") {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim() || "Anónimo";
      const comentario = document.getElementById("comentario").value.trim();

      if (!comentario) return;

      try {
        await fetch("/api/nuevo-comentario", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, comentario })
        });

        mostrarComentariosPublicados();
        e.target.reset();
      } catch (error) {
        console.error("Error al enviar comentario:", error);
      }
    }
  });
});

async function mostrarComentariosPublicados() {
  const lista = document.getElementById("lista-publicados");
  if (!lista) return;

  const owner = "AWilly0897";
  const repo = "Pensamiento-Abierto2";

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`);
    const issues = await response.json();

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

