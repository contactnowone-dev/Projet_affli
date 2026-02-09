// Fonction pour charger la configuration
async function loadConfig() {
    try {
        const response = await fetch("config.json");
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const config = await response.json();

        // 1. Mise à jour des textes
        document.querySelector(".site-name").textContent = config.site.nom;
        document.querySelector(".site-slogan").textContent = config.style.slogan;

        // 2. Mise à jour du Logo
        const logo = document.querySelector(".logo");
        if (config.site.logo) {
            logo.src = config.site.logo;
            logo.style.width = config.media.logo_size || "60px";
        }

        // 3. Couleur du Header
        document.getElementById("header").style.backgroundColor = config.couleurs.header;

        // 4. Construction du Menu
        const menuList = document.getElementById("menu-list");
        menuList.innerHTML = ""; // On nettoie le menu existant

// --- DANS LA BOUCLE config.menu.categories.forEach ---
config.menu.categories
    .sort((a, b) => a.ordre - b.ordre)
    .forEach(cat => {
        const li = document.createElement("li");
        li.classList.add("menu-item");

        // On crée un lien autour de l'icône et du texte
        const link = document.createElement("a");
        link.href = cat.lien; // Utilise le lien défini dans le JSON
        link.style.textDecoration = "none"; // Enlève le soulignement bleu
        link.style.color = "inherit"; // Garde la couleur définie
        link.style.display = "flex";
        link.style.alignItems = "center";
        link.style.gap = "10px";

        link.innerHTML = `
            <img src="${cat.icone}" class="menu-icon" alt="">
            <span>${cat.nom}</span>
        `;

        li.appendChild(link);
        menuList.appendChild(li);
    });

    } catch (error) {
        console.error("Erreur Nowone ! Impossible de charger le JSON :", error);
        document.querySelector(".site-name").textContent = "Erreur de chargement";
    }
}

// Lancement de la fonction
loadConfig();