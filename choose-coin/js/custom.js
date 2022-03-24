const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const showResult = document.querySelector("#result");

  let currentPrice = parseFloat(document.querySelector("#currentPrice").value);
  let highPrice = parseFloat(document.querySelector("#highPrice").value);
  let lowPrice = parseFloat(document.querySelector("#lowPrice").value);
  let percentageDown = parseFloat(
    document.querySelector("#percentageDown").value
  );

  let downPercentage, priceAtDownPercentage, content;

  if (currentPrice && highPrice && lowPrice) {
    // Formula
    downPercentage = (
      ((highPrice - currentPrice) / (highPrice - lowPrice)) *
      100
    ).toFixed(2);

    priceAtDownPercentage = (
      highPrice -
      (highPrice - lowPrice) * (percentageDown / 100)
    ).toFixed(2);

    if (percentageDown) {
      content = `<div class="bg-result">
      <span class="l_entry downPercentageLabel">Price down from 24H high<span style="margin-left:33px;">=</span></span>
      <span class="l_price"><span class="downPercentage">${downPercentage}%</span></span><br>
      
      <span class="l_entry">Price at <strong>${percentageDown}%</strong> down from high<span style="margin-left:13px;">=</span></span>
      <span class="l_price"><span class="">$${priceAtDownPercentage}</span></span><br>
      </div>
      `;
    } else {
      content = `<div class="bg-result">
      <span class="l_entry downPercentageLabel">Price down from 24H high<span style="margin-left:33px;">=</span></span>
      <span class="l_price"><span class="downPercentage">${downPercentage}%</span></span><br>
      </div>
      `;
    }
    // Showing results
    showResult.innerHTML = content;
  } else {
    showResult.innerHTML = `<div class="bg-result">
      <span class="normal">Missing Inputs</span>
    </div>`;
  }
  if (downPercentage < 50) {
    document.querySelector(".downPercentageLabel").classList.add("red");
    document.querySelector(".downPercentage").classList.add("red");
  } else {
    document.querySelector(".downPercentageLabel").classList.add("green");
    document.querySelector(".downPercentage").classList.add("green");
  }
});
