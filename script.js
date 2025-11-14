document.getElementById('calculateBtn').addEventListener('click', function() {
  const input = document.getElementById('dogBirthdate').value;
  const size = document.getElementById('dogSize').value;

  if (!input) {
    alert("請先輸入狗狗的出生日期！");
    return;
  }

  const birthDate = new Date(input);
  const today = new Date();

  if (birthDate > today) {
    alert("輸入的日期不可以超過今天！");
    return;
  }

  let dogAge = (today - birthDate) / (1000 * 60 * 60 * 24 * 365.25);

  let humanAgeFormatted;

  if (dogAge < 1) {
    // 1歲以下簡單換算：每個月 ≈ 1.25 歲人類
    humanAgeFormatted = Math.round(dogAge * 15);
  } else {
    // 根據體型調整公式倍數
    let multiplier = 16;
    switch(size) {
      case 'small': multiplier = 14; break;
      case 'medium': multiplier = 16; break;
      case 'large': multiplier = 18; break;
      case 'giant': multiplier = 20; break;
    }
    humanAgeFormatted = Math.round(multiplier * Math.log(dogAge) + 31);
  }

  const dogAgeFormatted = dogAge.toFixed(1);

  const resultDiv = document.getElementById('result');
  resultDiv.textContent = `狗狗現在大約 ${dogAgeFormatted} 歲的狗年齡\n換算人類年齡大約是 ${humanAgeFormatted} 歲`;

  // 顏色漸變
  if (dogAge < 5) {
    resultDiv.style.color = '#28a745';
  } else if (dogAge < 15) {
    resultDiv.style.color = '#ffc107';
  } else {
    resultDiv.style.color = '#ff5733';
  }
});
