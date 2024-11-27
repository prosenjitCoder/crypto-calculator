const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const showResult = document.querySelector("#result");

  let riskAmount = parseFloat(document.querySelector("#riskAmount").value);
  let entryPrice = parseFloat(document.querySelector("#entryPrice").value);
  let slPrice = parseFloat(document.querySelector("#slPrice").value);
  let rewardRisk = parseFloat(document.querySelector("#rewardRisk").value);
  let direction = document
    .querySelector('input[name="rad_direction"]:checked')
    .value.toUpperCase();

  if (!riskAmount) {
    riskAmount = 1;
  }

  if (!rewardRisk) {
    rewardRisk = 2;
  }

  if (direction == "LONG" && slPrice > entryPrice) {
    showResult.innerHTML = `<div class="bg-result">
      <span class="red text-center">Stoploss price must be less than entry price!</span>
    </div>`;
    return;
  }

  if (direction == "SHORT" && slPrice < entryPrice) {
    showResult.innerHTML = `<div class="bg-result">
      <span class="red text-center">Stoploss price must be greater than entry price!</span>
    </div>`;
    return;
  }

  if (riskAmount && entryPrice && slPrice && rewardRisk) {
    if (direction == "LONG") {
      // Formula
      let stopLoss = slPrice;
      let SLamount = entryPrice - stopLoss;
      let takeProfit = entryPrice + SLamount * rewardRisk;
      let tokenQuantity = riskAmount / SLamount;
      let positionAmount = tokenQuantity * entryPrice; // Position size
      let stopLossAmount = tokenQuantity * stopLoss;
      let percentageDown = 100 - (stopLoss * 100) / entryPrice;
      let percentageUp = (takeProfit * 100) / entryPrice - 100;
      let percentageDownLossAmount = positionAmount - stopLossAmount;
      let percentageUpProfitAmount =
        tokenQuantity * takeProfit - positionAmount;
      let oneToOnePrice = entryPrice + (entryPrice - stopLoss);

      // Showing results
      showResult.innerHTML = `<div class="bg-result">
      <span class="l_entry">Direction<span style="margin-left:71px;">=</span></span>
      <span class="l_price"><span class="green">${direction}</span></span><br>

      <span class="l_entry">Entry Price<span style="margin-left:60px;">=</span></span>
      <span class="l_price"><span class="l_padding l_padding_blue">$${entryPrice}</span></span><br>

      <span class="l_entry">Position Size<span style="margin-left:47px;">=</span></span>
      <span class="l_price"><span class="l_padding l_padding_gold">${tokenQuantity.toFixed(
        5
      )} ($${positionAmount.toFixed(2)})</span></span><br>

      <span class="l_entry">Take Profit Price<span style="margin-left:18px;">=</span></span>
      <span class="l_price"><span class="green l_padding l_padding_green">$${takeProfit.toFixed(
        5
      )}</span></span><span class="green l_padding l_padding_green box_padding">${rewardRisk}x</span><br>

      <span class="l_entry">Stop Loss Price<span style="margin-left:26px;">=</span></span>
      <span class="l_price"><span class="red l_padding l_padding_red">$${stopLoss.toFixed(
        5
      )}</span></span><span class="red l_padding l_padding_red box_padding">-$${riskAmount}</span><br>

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
    }

    if (direction == "SHORT") {
      // Formula
      let stopLoss = slPrice;
      let SLamount = stopLoss - entryPrice;
      let takeProfit = entryPrice - SLamount * rewardRisk;
      let tokenQuantity = riskAmount / SLamount;
      let positionAmount = tokenQuantity * entryPrice; // Position size
      let stopLossAmount = tokenQuantity * stopLoss;
      let percentageUp = (stopLoss * 100) / entryPrice - 100;
      let percentageDown = 100 - (takeProfit * 100) / entryPrice;
      let percentageDownProfitAmount =
        positionAmount - tokenQuantity * takeProfit;
      let percentageUpLossAmount = stopLossAmount - positionAmount;
      let oneToOnePrice = entryPrice - SLamount;

      // Showing results
      showResult.innerHTML = `<div class="bg-result">
      <span class="l_entry">Direction<span style="margin-left:71px;">=</span></span>
      <span class="l_price"><span class="red">${direction}</span></span><br>

      <span class="l_entry">Entry Price<span style="margin-left:60px;">=</span></span>
      <span class="l_price"><span class="l_padding l_padding_blue">$${entryPrice}</span></span><br>

      <span class="l_entry">Position Size<span style="margin-left:47px;">=</span></span>
      <span class="l_price"><span class="l_padding l_padding_gold">${tokenQuantity.toFixed(
        5
      )} ($${positionAmount.toFixed(2)})</span></span><br>

      <span class="l_entry">Take Profit Price<span style="margin-left:18px;">=</span></span>
      <span class="l_price"><span class="green l_padding l_padding_green">$${takeProfit.toFixed(
        5
      )}</span></span><span class="green l_padding l_padding_green box_padding">${rewardRisk}x</span><br>

      <span class="l_entry">Stop Loss Price<span style="margin-left:26px;">=</span></span>
      <span class="l_price"><span class="red l_padding l_padding_red">$${stopLoss.toFixed(
        5
      )}</span></span><span class="red l_padding l_padding_red box_padding">-$${riskAmount}</span><br>

      <span class="l_entry">Stop Loss Hit<span style="margin-left:44px;">=</span></span>
      <span class="l_price"><span class="red" style="position:relative;">$${percentageUpLossAmount.toFixed(
        2
      )} (${percentageUp.toFixed(
        2
      )}%) <span style="position:absolute;top:-10px;right:-12%;font-size:21px">&uarr;</span></span></span><br>

    <span class="l_entry">Take Profit Hit<span style="margin-left:36px;">=</span></span>
      <span class="l_price"><span class="green" style="position:relative;">$${percentageDownProfitAmount.toFixed(
        2
      )} (${percentageDown.toFixed(
        2
      )}%) <span style="position:absolute;top:-8px;right:-12%;font-size:21px">&darr;</span></span></span><br>

      <span class="l_entry">(1 : 1) Profit at<span style="margin-left:45px;">=</span></span>
      <span class="l_price"><span class="riskReward">$${oneToOnePrice.toFixed(
        5
      )}</span></span><br>
    `;
    }
  } else {
    showResult.innerHTML = `<div class="bg-result">
      <span class="normal red">Missing Inputs</span>
    </div>`;
  }
});
