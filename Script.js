const games = [
  {name:"PSCA", icon:"🎮"},
  {name:"Football", icon:"⚽"}
];

const settingData = {
  sistema: [
    ["Idioma","Português Brasileiro"],
    ["Ocultar a barra de navegação","☑"],
    ["Ajuste do tamanho da interface do usuário (DPI)","-1"],
    ["Limpar o cenário de fundo da interface do usuário","☑"],
    ["Cenário de fundo transparente da interface do usuário","☑"],
    ["Posição da tela de notificação","No centro do topo"],
    ["Animação do cenário de fundo da interface do usuário","Símbolos flutuantes"],
    ["Tema","Padrão"],
    ["Tonalidade da Cor","0.00"]
  ],
  graficos: [["Backend","WebGL / WebGPU"],["Modo de renderização","Automático"],["Resolução","1x PSP"],["Frameskip","Desativado"],["VSync","Ativado"]],
  controles: [["Controles na tela","Ativados"],["Opacidade","70%"],["Mapeamento","Configurar..."],["Vibração","Ativada"]],
  audio: [["Volume","100%"],["Latência","Automática"],["Áudio","Ativado"]],
  rede: [["Guia de início rápido pro multiplayer","↗"],["Ativar rede/WLAN","☑"],["Endereço do MAC","Aleatório"],["Multiplayer do Ad Hoc","Disponível no modo compatível"],["Apelido","PPSSPP WEB"]],
  ferramentas: [["Gerenciar dados","Abrir"],["Salvar estado","Criar"],["Carregar estado","Abrir"],["Reiniciar emulador","Executar"]],
  procurar: [["Pasta de jogos","ms:/PSP/GAME"],["Adicionar jogo","Procurar..."]]
};

const $ = s => document.querySelector(s);
const gameGrid = $("#gameGrid"), allGames = $("#allGames");

function renderGames(target){
  target.innerHTML = games.map((g,i)=>`
    <div class="game">
      <div class="cover">${g.icon}</div>
      <div class="game-name">${g.name}</div>
      <button class="play" onclick="playGame(${i})">▶ Jogar</button>
    </div>`).join("");
}
renderGames(gameGrid); renderGames(allGames);

document.querySelectorAll(".tab").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
    $("#"+btn.dataset.page).classList.add("active");
  };
});

function openSettings(){
  document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
  $("#settings").classList.add("open");
  loadSettings("sistema");
}
$("#settingsBtn").onclick=openSettings;
$("#backBtn").onclick=()=>{
  $("#settings").classList.remove("open");
  $("#recentes").classList.add("active");
};

document.querySelectorAll(".settings-menu button").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll(".settings-menu button").forEach(x=>x.classList.remove("selected"));
    btn.classList.add("selected");
    loadSettings(btn.dataset.setting);
  };
});

function loadSettings(key){
  $("#settingsTitle").textContent = key[0].toUpperCase()+key.slice(1);
  $("#settingsRows").innerHTML=(settingData[key]||[]).map(r=>`
    <div class="setting-row">
      <div>${r[0]}</div><div class="setting-value">${r[1]}</div>
    </div>`).join("");
}

$("#addGameBtn").onclick=()=>$("#fileInput").click();
$("#fileInput").onchange=e=>{
  [...e.target.files].forEach(file=>{
    games.push({name:file.name, icon:file.name.toLowerCase().endsWith(".exe")?"🪟":"🎮"});
  });
  renderGames(gameGrid); renderGames(allGames);
};

$("#reloadBtn").onclick=()=>{
  renderGames(gameGrid); renderGames(allGames);
};

window.playGame = function(i){
  $("#nowPlaying").textContent=games[i].name;
  $("#player").classList.add("open");
};
$("#exitPlayer").onclick=()=>$("#player").classList.remove("open");

document.addEventListener("keydown",e=>{
  if(e.key==="Escape") $("#player").classList.remove("open");
});
  
