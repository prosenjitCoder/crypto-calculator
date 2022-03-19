const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const showResult = document.querySelector("#result");

  let tokenAmount = parseFloat(document.querySelector("#tokenAmount").value);
  let buyingPrice = parseFloat(document.querySelector("#buyingPrice").value);
  let sellingPrice = parseFloat(document.querySelector("#sellingPrice").value);
  let sellingPercentage = parseFloat(
    document.querySelector("#sellingPercentage").value
  );

  let radioValue = document.querySelector(
    'input[name="rad_method"]:checked'
  ).value;

  if (radioValue == "rad_price") {
    sellingPercentage = true;
  }

  if (radioValue == "rad_percentage") {
    if (isNaN(sellingPercentage)) {
      sellingPercentage = 5;
    }
    sellingPrice = true;
  }
  if (tokenAmount && buyingPrice && sellingPrice && sellingPercentage) {
    // Formula
    if (radioValue == "rad_price") {
      let profitLoss, profitLossPercentage;

      let totalBuyingPrice = tokenAmount * buyingPrice;
      let totalSellingPrice = tokenAmount * sellingPrice;
      let profitLossAmount = totalSellingPrice - totalBuyingPrice;

      if (profitLossAmount > 0) {
        profitLoss = Math.abs(profitLossAmount);
        profitLossPercentage = (profitLoss * 100) / totalBuyingPrice;

        // Showing results
        showResult.innerHTML = `<div class="bg-result">
      <span class="l_entry">Total Buying Price<span style="margin-left:11px;">=</span></span>
      <span class="l_price"><span class="">$${totalBuyingPrice.toFixed(
        2
      )}</span></span><br>
  
      <span class="l_entry">Total Selling Price<span style="margin-left:13px;">=</span></span>
      <span class="l_price"><span class="">$${totalSellingPrice.toFixed(
        2
      )}</span></span><br>
  
      <span class="l_entry">Profit<span style="margin-left:110px;">=</span></span>
      <span class="l_price"><span class="green" style="position:relative;">$${profitLoss.toFixed(
        2
      )} (${profitLossPercentage.toFixed(
          2
        )}%) <span style="position:absolute;top:-12px;right:-12%;font-size:25px">&uarr;</span></span></span><br>
      </div>
      `;
      } else {
        profitLoss = Math.abs(profitLossAmount);
        profitLossPercentage = (profitLoss * 100) / totalBuyingPrice;

        // Showing results
        showResult.innerHTML = `<div class="bg-result">
      <span class="l_entry">Total Buying Price<span style="margin-left:11px;">=</span></span>
      <span class="l_price"><span class="">$${totalBuyingPrice.toFixed(
        2
      )}</span></span><br>
  
      <span class="l_entry">Total Selling Price<span style="margin-left:13px;">=</span></span>
      <span class="l_price"><span class="">$${totalSellingPrice.toFixed(
        2
      )}</span></span><br>
  
      <span class="l_entry">Loss<span style="margin-left:117px;">=</span></span>
      <span class="l_price"><span class="red" style="position:relative;">$${profitLoss.toFixed(
        2
      )} (${profitLossPercentage.toFixed(
          2
        )}%) <span style="position:absolute;top:-12px;right:-12%;font-size:25px">&darr;</span></span></span><br>
      </div>
      `;
      }
    }

    if (radioValue == "rad_percentage") {
      let totalBuyingPrice = tokenAmount * buyingPrice;
      let sellingPriceOnProfit =
        buyingPrice + buyingPrice * (sellingPercentage / 100);
      let totalSellingPriceOnProfit = tokenAmount * sellingPriceOnProfit;
      let profitAmount = totalSellingPriceOnProfit - totalBuyingPrice;

      let sellingPriceOnLoss =
        buyingPrice - buyingPrice * (sellingPercentage / 100);
      let totalSellingPriceOnLoss = tokenAmount * sellingPriceOnLoss;
      let lossAmount = totalBuyingPrice - totalSellingPriceOnLoss;

      // Showing results
      showResult.innerHTML = `<div class="bg-result">
      <span class="l_entry">Total Buying Price<span style="margin-left:11px;">=</span></span>
      <span class="l_price"><span class="">$${totalBuyingPrice.toFixed(
        2
      )}</span></span><br>

      <span class="l_entry green">Total Selling Price<span style="margin-left:13px;">=</span></span>
      <span class="l_price"><span class="green">$${totalSellingPriceOnProfit.toFixed(
        2
      )}</span></span><br>

      <span class="l_entry green">Profit<span class="profit_equal" style="margin-left:110px;">=</span></span>
      <span class="l_price"><span class="green" style="position:relative;">$${profitAmount.toFixed(
        2
      )} (Sell <span style="position:relative;top:-1px;">&rarr;</span> $${sellingPriceOnProfit.toFixed(
        5
      )}) (${sellingPercentage}%) <span style="position:absolute;top:-12px;right:-7%;font-size:25px">&uarr;</span></span></span><br>


      <span class="l_entry red">Total Selling Price<span style="margin-left:13px;">=</span></span>
      <span class="l_price"><span class="red">$${totalSellingPriceOnLoss.toFixed(
        2
      )}</span></span><br>

      <span class="l_entry red">Loss<span class="loss_equal" style="margin-left:117px;">=</span></span>
      <span class="l_price"><span class="red" style="position:relative;">$${lossAmount.toFixed(
        2
      )} (Sell <span style="position:relative;top:-1px;">&rarr;</span> $${sellingPriceOnLoss.toFixed(
        5
      )}) (${sellingPercentage}%) <span style="position:absolute;top:-12px;right:-7%;font-size:25px">&darr;</span></span></span><br>
    </div>
`;
    }
  } else {
    showResult.innerHTML = `<div class="bg-result">
      <span class="normal">Missing Inputs</span>
    </div>`;
  }
});

function showHideInput(value) {
  let radValuePrice = document.querySelector("#show_hide_price");
  let radValuePercentage = document.querySelector("#show_hide_percentage");
  if (value == "rad_price") {
    document.querySelector("#sellingPercentage").value = "";
    radValuePrice.style.display = "block";
    radValuePercentage.style.display = "none";
  }

  if (value == "rad_percentage") {
    document.querySelector("#sellingPrice").value = "";
    radValuePrice.style.display = "none";
    radValuePercentage.style.display = "block";
  }
}
