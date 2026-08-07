const games = [];

const pages = document.querySelectorAll(".page");
const tabs = document.querySelectorAll(".tab");

const gameFile = document.getElementById("gameFile");
const selectGame = document.getElementById("selectGame");

const gameList = document.getElementById("gameList");
const allGames = document.getElementById("allGames");

const settings = document.getElementById("settings");

const settingsTitle =
    document.getElementById("settingsTitle");

const settingsRows =
    document.getElementById("settingsRows");


/* CONFIGURAÇÕES */

const configuration = {

    sistema: [
        ["Idioma", "Português Brasileiro"],
        ["Tela cheia", "Ativado"],
        ["Interface", "Padrão"],
        ["Tema", "Padrão"]
    ],

    graficos: [
        ["Backend", "WebGL / WebGPU"],
        ["Resolução", "1x PSP"],
        ["VSync", "Ativado"],
        ["Frameskip", "Desativado"],
        ["Filtro", "Automático"]
    ],

    controles: [
        ["Controles na tela", "Ativados"],
        ["Opacidade", "70%"],
        ["Mapeamento", "Configurar"],
        ["Vibração", "Ativada"]
    ],

    audio: [
        ["Áudio", "Ativado"],
        ["Volume", "100%"],
        ["Latência", "Automática"]
    ],

    rede: [
        ["WLAN", "Ativado"],
        ["Apelido", "PPSSPP WEB"],
        ["MAC", "Automático"]
    ],

    ferramentas: [
        ["Salvar estado", "Disponível"],
        ["Carregar estado", "Disponível"],
        ["Reiniciar", "Disponível"]
    ],

    procurar: [
        ["Pasta", "ms:/PSP/GAME"],
        ["Selecionar jogo", "Procurar"]
    ]

};


/* ABRIR PÁGINA */

function openPage(id) {

    pages.forEach(page => {

        page.classList.remove("active");

    });

    const page = document.getElementById(id);

    if (page) {

        page.classList.add("active");

    }
}


/* ABAS */

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(t =>
            t.classList.remove("active")
        );

        tab.classList.add("active");

        openPage(tab.dataset.page);

    });

});


/* PROCURAR JOGO */

selectGame.addEventListener("click", () => {

    gameFile.click();

});


/* ARQUIVO SELECIONADO */

gameFile.addEventListener("change", event => {

    const file = event.target.files[0];

    if (!file) return;

    const game = {

        name: file.name,

        file: file,

        url: URL.createObjectURL(file)

    };

    games.push(game);

    renderGames();

    openGame(game);

});


/* LISTAR JOGOS */

function renderGames() {

    if (games.length === 0) {

        gameList.innerHTML = `
            <div class="empty">
                Nenhum jogo carregado.
                <br>
                <small>
                    Clique em "Procurar".
                </small>
            </div>
        `;

        allGames.innerHTML = "";

        return;

    }


    const html = games.map((game, index) => {

        return `

        <div class="game">

            <div class="cover">
                🎮
            </div>

            <div class="game-name">
                ${escapeHTML(game.name)}
            </div>

            <button
                class="play"
                onclick="openGameByIndex(${index})">

                ▶ Jogar

            </button>

        </div>

        `;

    }).join("");


    gameList.innerHTML = html;

    allGames.innerHTML = html;

}


/* SEGURANÇA DO NOME */

function escapeHTML(text) {

    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* ABRIR JOGO */

window.openGameByIndex = function(index) {

    openGame(games[index]);

};


function openGame(game) {

    document.getElementById("gameTitle")
        .textContent = game.name;

    document.getElementById("emulator")
        .classList.add("open");

    /*
     * Aqui entra o carregamento do emulador
     * WebAssembly real.
     *
     * Exemplo de estrutura:
     *
     * emulator/
     *   ppsspp.js
     *   ppsspp.wasm
     *
     * O navegador não executa uma ISO
     * diretamente sem um emulador.
     */

    console.log(
        "Jogo selecionado:",
        game.name
    );

    console.log(
        "Arquivo:",
        game.url
    );

}


/* FECHAR */

document
    .getElementById("closeGame")
    .addEventListener("click", () => {

        document
            .getElementById("emulator")
            .classList.remove("open");

    });


/* CONFIGURAÇÕES */

document
    .getElementById("settingsButton")
    .addEventListener("click", () => {

        pages.forEach(page =>
            page.classList.remove("active")
        );

        settings.classList.add("open");

        loadSettings("sistema");

    });


/* MENU CONFIGURAÇÕES */

document
    .querySelectorAll(".settings-menu button[data-setting]")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".settings-menu button")
                .forEach(b =>
                    b.classList.remove("selected")
                );

            button.classList.add("selected");

            loadSettings(
                button.dataset.setting
            );

        });

    });


function loadSettings(category) {

    settingsTitle.textContent =
        category.charAt(0).toUpperCase()
        + category.slice(1);

    const rows =
        configuration[category] || [];

    settingsRows.innerHTML =
        rows.map(row => `

            <div class="setting-row">

                <span>
                    ${row[0]}
                </span>

                <span class="setting-value">
                    ${row[1]}
                </span>

            </div>

        `).join("");

}


/* VOLTAR */

document
    .getElementById("backSettings")
    .addEventListener("click", () => {

        settings.classList.remove("open");

        openPage("recentes");

        tabs.forEach(t =>
            t.classList.remove("active")
        );

        document
            .querySelector('[data-page="recentes"]')
            .classList.add("active");

    });


/* ATUALIZAR */

document
    .getElementById("refreshButton")
    .addEventListener("click", () => {

        renderGames();

    });


/* TELA CHEIA */

document
    .getElementById("homeButton")
    .addEventListener("click", () => {

        if (!document.fullscreenElement) {

            document.documentElement
                .requestFullscreen()
                .catch(() => {});

        } else {

            document.exitFullscreen();

        }

    });


/* BOTÕES VIRTUAIS */

document
    .querySelectorAll(".controls button[data-key]")
    .forEach(button => {

        button.addEventListener("pointerdown", () => {

            console.log(
                "Tecla:",
                button.dataset.key
            );

        });

    });
