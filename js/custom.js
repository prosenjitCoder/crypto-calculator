const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const showResult = document.querySelector("#result");

  let riskAmount = parseFloat(document.querySelector("#riskAmount").value);
  let entryPrice = parseFloat(document.querySelector("#entryPrice").value);
  let stopLoss = parseFloat(document.querySelector("#stopLoss").value);
  let takeProfit = parseFloat(document.querySelector("#takeProfit").value);

  if (riskAmount && entryPrice && stopLoss && takeProfit) {
    // Formula
    let SLamount = entryPrice - stopLoss;
    let tokenQuantity = riskAmount / SLamount;
    let positionAmount = tokenQuantity * entryPrice; // Position size
    let stopLossAmount = tokenQuantity * stopLoss;
    let percentageDown = 100 - (stopLoss * 100) / entryPrice;
    let percentageUp = (takeProfit * 100) / entryPrice - 100;
    let percentageDownLossAmount = positionAmount - stopLossAmount;
    let percentageUpProfitAmount = tokenQuantity * takeProfit - positionAmount;
    let oneToOnePrice = entryPrice + (entryPrice - stopLoss);
    let ratio = parseFloat(
      (percentageUpProfitAmount / percentageDownLossAmount).toFixed(2)
    );
    let riskRewardRadio = `1 : ${ratio}`;

    // Showing results
    showResult.innerHTML = `<div class="bg-result">
      <span class="l_entry">Position Size<span style="margin-left:18px;">=</span></span>
      <span class="l_price"><span class="">$${positionAmount.toFixed(
        2
      )}</span></span><br>

      <span class="l_entry">Stop Loss Hit<span style="margin-left:15px;">=</span></span>
      <span class="l_price"><span class="red" style="position:relative;">$${percentageDownLossAmount.toFixed(
        2
      )} (${percentageDown.toFixed(
      2
    )}%) <span style="position:absolute;top:-10px;right:-12%;font-size:21px">&darr;</span></span></span><br>

    <span class="l_entry">Take Profit Hit<span style="margin-left:7px;">=</span></span>
      <span class="l_price"><span class="green" style="position:relative;">$${percentageUpProfitAmount.toFixed(
        2
      )} (${percentageUp.toFixed(
      2
    )}%) <span style="position:absolute;top:-8px;right:-12%;font-size:21px">&uarr;</span></span></span><br>
  
      <span class="l_entry">Risk : Reward<span style="margin-left:13px;">=</span></span>
      <span class="l_price"><span class="riskReward">${riskRewardRadio}</span></span><br>

      <span class="l_entry">(1 : 1) Profit at<span style="margin-left:16px;">=</span></span>
      <span class="l_price"><span class="riskReward">$${oneToOnePrice.toFixed(
        5
      )}</span></span><br>
      `;

    if (ratio >= 1.5) {
      document.querySelector(".riskReward").classList.add("green");
    } else {
      document.querySelector(".riskReward").classList.add("red");
    }
  } else {
    showResult.innerHTML = `<div class="bg-result">
      <span class="normal">Missing Inputs</span>
    </div>`;
  }
});
