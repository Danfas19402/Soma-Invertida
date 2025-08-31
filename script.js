// input: só dígitos e até 4
const numeroEl = document.getElementById("numero");
numeroEl.addEventListener("input", e => {
  e.target.value = e.target.value.replace(/\D/g, "").slice(0,4);
});
document.getElementById("btnCalcular").addEventListener("click", calcular);
document.getElementById("btnLimpar").addEventListener("click", limpar);

// função que gera 1 prêmio seguindo as regras definidas
function gerarPremio(numStr) {
  // garante 4 caracteres
  numStr = numStr.padStart(4, "0");
  const d = numStr.split("").map(Number); // d0,d1,d2,d3

  const s1 = d[0] + d[1];              // para exibir soma completa
  const dig1 = s1 % 10;               // 1º dígito final

  const s2 = d[1] + d[3];
  const dig2 = s2 % 10;               // 2º dígito final

  const s3 = dig2 + dig2;             // "o1 + o1" como você pediu
  const dig3 = s3 % 10;               // 3º dígito final

  const s4 = d[0] + d[3];
  const dig4 = s4 % 10;               // 4º dígito final

  const premio = `${dig1}${dig2}${dig3}${dig4}`.padStart(4,"0");

  const breakdown = [
    `${d[0]} + ${d[1]} = ${s1} → ${dig1}`,
    `${d[1]} + ${d[3]} = ${s2} → ${dig2}`,
    `${dig2} + ${dig2} = ${s3} → ${dig3}`,
    `${d[0]} + ${d[3]} = ${s4} → ${dig4}`
  ];

  return { premio, breakdown };
}

function calcular() {
  const numero = numeroEl.value;
  if (!/^\d{4}$/.test(numero)) {
    document.getElementById("resultado").innerHTML = `<p class="passo">Digite um número válido de 4 dígitos!</p>`;
    return;
  }

  const invertido = numero.split("").reverse().join("");
  let atual = invertido;
  const resultados = [];

  for (let i = 0; i < 7; i++) {
    const r = gerarPremio(atual);
    resultados.push({ index: i+1, base: atual, premio: r.premio, breakdown: r.breakdown });
    atual = r.premio;
  }

  // render
  const lista = resultados.map(r => {
    return `<li>
      <div>
        <div><strong>${r.index}º prêmio</strong> — base: <code>${r.base}</code></div>
        <div class="passo">${r.breakdown.join("  •  ")}</div>
      </div>
      <div style="font-weight:800; font-variant-numeric:tabular-nums">${r.premio}</div>
    </li>`;
  }).join("");

  document.getElementById("resultado").innerHTML = `
    <p class="passo">Número invertido: <strong>${invertido}</strong></p>
    <ul class="premios">${lista}</ul>
    <p class="passo" style="margin-top:12px"><strong>Resultado final (7º prêmio): ${resultados[6].premio}</strong></p>
  `;
}

function limpar() {
  numeroEl.value = "";
  document.getElementById("resultado").innerHTML = "";
  numeroEl.focus();
}
