const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const showResult = document.querySelector("#result");

  let accountSize = parseFloat(document.querySelector("#accountSize").value);
  let risk = parseFloat(document.querySelector("#risk").value);
  let dailyTrade = parseFloat(document.querySelector("#dailyTrade").value);
  let tradingDays = parseFloat(document.querySelector("#tradingDays").value);
  let rewardRisk = parseFloat(document.querySelector("#rewardRisk").value);
  let winningRatio = parseFloat(document.querySelector("#winningRatio").value);

  if (!rewardRisk) {
    rewardRisk = 1.5;
  }

  if (!winningRatio) {
    winningRatio = 50;
  }

  if (
    accountSize &&
    risk &&
    dailyTrade &&
    tradingDays &&
    rewardRisk &&
    winningRatio
  ) {
    // Formula
    let riskAmount = accountSize * (risk / 100);
    let monthlyTrades = dailyTrade * tradingDays;
    let winningTrades = monthlyTrades * (winningRatio / 100);
    let lossingTrades = monthlyTrades * ((100 - winningRatio) / 100);
    let winningAmount = winningTrades * (riskAmount * rewardRisk);
    let lossingAmount = lossingTrades * riskAmount;
    let profit = winningAmount - lossingAmount;

    // Showing results
    showResult.innerHTML = `<div class="bg-result">
      <span class="l_entry">Monthly Profit<span style="margin-left:30px;">=</span></span>
      <span class="l_price"><span class="green">$${profit.toFixed(
        2
      )}</span></span><br>

      <span class="l_entry">Risk Per Trade<span style="margin-left:30px;">=</span></span>
      <span class="l_price"><span class="red">$${riskAmount.toFixed(
        2
      )}</span></span><br>

      <span class="l_entry">Monthly Trades<span style="margin-left:17px;">=</span></span>
      <span class="l_price"><span class="">${monthlyTrades}</span></span><br>

      <span class="l_entry">Winning Trades<span style="margin-left:15px;">=</span></span>
      <span class="l_price"><span class="">${Math.ceil(
        winningTrades
      )}</span></span><br>

      <span class="l_entry">Lossing Trades<span style="margin-left:22px;">=</span></span>
      <span class="l_price"><span class="">${Math.floor(
        lossingTrades
      )}</span></span><br>
      </div>
    `;
  } else {
    showResult.innerHTML = `<div class="bg-result">
      <span class="normal red">Missing Inputs</span>
    </div>`;
  }
});
