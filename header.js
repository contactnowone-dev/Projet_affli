async function chargerConfiguration() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();

        document.querySelectorAll('.site-name').forEach(el => el.textContent = config.nomSite);
        document.querySelectorAll('.site-slogan').forEach(el => el.textContent = config.slogan);

        const menuList = document.getElementById('menu-list');
        if (menuList) {
            menuList.innerHTML = '';
            config.menu.forEach(item => {
                const li = document.createElement('li');
                li.className = "menu-item";
                const a = document.createElement('a');
                a.href = item.lien;
                a.textContent = item.nom;
                a.style.backgroundImage = `url('${item.image}')`;
                li.appendChild(a);
                menuList.appendChild(li);
            });
        }

        const grid = document.getElementById('grid-produits');
        if (grid) {
            const pagePath = window.location.pathname.split("/").pop() || "index.html";
            const categorie = pagePath.replace(".html", "");

            if (categorie !== "index" && config.produits[categorie]) {
                grid.innerHTML = '';
                config.produits[categorie].forEach(prod => {
                    grid.innerHTML += `
                        <article class="produit-card">
                            <img src="${prod.image}" class="produit-image">
                            <div class="produit-info">
                                <h3>${prod.titre}</h3>
                                <p>${prod.prix}</p>
                                <a href="${prod.link}" class="btn-affiliation" target="_blank">Acheter</a>
                            </div>
                        </article>`;
                });
            }
        }
        document.getElementById('footer-year').textContent = new Date().getFullYear();
    } catch (e) { console.error(e); }
}
chargerConfiguration();