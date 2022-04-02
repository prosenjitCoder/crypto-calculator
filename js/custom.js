const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const showResult = document.querySelector("#result");

  let riskAmount = parseFloat(document.querySelector("#riskAmount").value);
  let entryPrice = parseFloat(document.querySelector("#entryPrice").value);
  let swingLowPrice = parseFloat(
    document.querySelector("#swingLowPrice").value
  );
  let atrValue = parseFloat(document.querySelector("#atrValue").value);
  let rewardRisk = parseFloat(document.querySelector("#rewardRisk").value);

  if (!riskAmount) {
    riskAmount = 5;
  }

  if (!rewardRisk) {
    rewardRisk = 1.5;
  }

  if (riskAmount && entryPrice && swingLowPrice && atrValue && rewardRisk) {
    // Formula
    let stopLoss = swingLowPrice - atrValue;
    let SLamount = entryPrice - stopLoss;
    let takeProfit = entryPrice + SLamount * rewardRisk;
    let tokenQuantity = riskAmount / SLamount;
    let positionAmount = tokenQuantity * entryPrice; // Position size
    let stopLossAmount = tokenQuantity * stopLoss;
    let percentageDown = 100 - (stopLoss * 100) / entryPrice;
    let percentageUp = (takeProfit * 100) / entryPrice - 100;
    let percentageDownLossAmount = positionAmount - stopLossAmount;
    let percentageUpProfitAmount = tokenQuantity * takeProfit - positionAmount;
    let oneToOnePrice = entryPrice + (entryPrice - stopLoss);

    // Showing results
    showResult.innerHTML = `<div class="bg-result">
      <span class="l_entry">Position Size<span style="margin-left:47px;">=</span></span>
      <span class="l_price"><span class="">$${positionAmount.toFixed(
        2
      )}</span></span><br>

      <span class="l_entry">Stop Loss Price<span style="margin-left:26px;">=</span></span>
      <span class="l_price"><span class="red">$${stopLoss.toFixed(
        5
      )}</span></span><br>

      <span class="l_entry">Take Profit Price<span style="margin-left:18px;">=</span></span>
      <span class="l_price"><span class="green">$${takeProfit.toFixed(
        5
      )}</span></span><br>

      <span class="l_entry">Stop Loss Hit<span style="margin-left:44px;">=</span></span>
      <span class="l_price"><span class="red" style="position:relative;">$${percentageDownLossAmount.toFixed(
        2
      )} (${percentageDown.toFixed(
      2
    )}%) <span style="position:absolute;top:-10px;right:-12%;font-size:21px">&darr;</span></span></span><br>

    <span class="l_entry">Take Profit Hit<span style="margin-left:36px;">=</span></span>
      <span class="l_price"><span class="green" style="position:relative;">$${percentageUpProfitAmount.toFixed(
        2
      )} (${percentageUp.toFixed(
      2
    )}%) <span style="position:absolute;top:-8px;right:-12%;font-size:21px">&uarr;</span></span></span><br>

      <span class="l_entry">(1 : 1) Profit at<span style="margin-left:45px;">=</span></span>
      <span class="l_price"><span class="riskReward">$${oneToOnePrice.toFixed(
        5
      )}</span></span><br>
      `;
  } else {
    showResult.innerHTML = `<div class="bg-result">
      <span class="normal">Missing Inputs</span>
    </div>`;
  }
});
