// ** I. 網頁載入時：讀取並填入儲存的數據 (輸入和輸出) **
document.addEventListener('DOMContentLoaded', function() {
    const dogBirthdateInput = document.getElementById('dogBirthdate');
    const dogSizeSelect = document.getElementById('dogSize');
    const resultDiv = document.getElementById('result'); // 取得結果區塊

    // 1. 讀取儲存的日期
    const savedDate = localStorage.getItem('dogBirthdate');
    if (savedDate) {
        dogBirthdateInput.value = savedDate;
    }

    // 2. 讀取儲存的體型
    const savedSize = localStorage.getItem('dogSize');
    if (savedSize) {
        dogSizeSelect.value = savedSize;
    }
    
    // 3. 讀取儲存的結果文字
    const savedResultText = localStorage.getItem('dogResultText');
    if (savedResultText) {
        resultDiv.textContent = savedResultText;
        
        // 4. 讀取儲存的結果顏色
        const savedResultColor = localStorage.getItem('dogResultColor');
        if (savedResultColor) {
            resultDiv.style.color = savedResultColor;
        }
    }
});


document.getElementById('calculateBtn').addEventListener('click', function() {
    const input = document.getElementById('dogBirthdate').value;
    const size = document.getElementById('dogSize').value;

    if (!input) {
        alert("請先輸入狗狗的出生日期！"); 
        return;
    }
    
    // ⚠️ 新增此處的檢查 ⚠️
    if (!size) {
        alert("請選擇狗狗的體型！");
        return;
    }

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
    
    // ** II. 計算成功後：儲存當前輸入的數據 **
    localStorage.setItem('dogBirthdate', input);
    localStorage.setItem('dogSize', size);


    // 計算狗的實際年齡 (以年為單位，帶小數點)
    let dogAgeYears = (today - birthDate) / (1000 * 60 * 60 * 24 * 365.25);
    let humanAgeFormatted;
    
    // 統一格式化狗年齡，保留一位小數點
    const dogAgeDisplay = dogAgeYears.toFixed(1); 

    // --- 換算邏輯 ---
    if (dogAgeYears < 1) {
        // 幼犬期換算 (使用月齡內插法，結果更貼近常識)
        const totalDays = (today - birthDate) / (1000 * 60 * 60 * 24);
        const dogMonths = Math.round(totalDays / (365.25 / 12));
        
        if (dogMonths <= 6) {
            humanAgeFormatted = Math.round(dogMonths * 1.6);
        } else {
            humanAgeFormatted = Math.round(10 + (dogMonths - 6) * (5/6));
        }
        humanAgeFormatted = Math.max(1, humanAgeFormatted); 

    } else {
        // 成犬期換算 (使用修正後的對數公式： k * ln(DogAge) + BaseAge)
        let baseAge = 15; // 1歲時的基礎人類年齡
        let k = 20;       // 調整係數
        
        switch(size) {
            case 'small':  k = 18; break; // 小型犬
            case 'medium': k = 20; break;
            case 'large':  k = 23; break; // 大型犬
            case 'giant':  k = 25; break; // 巨型犬
        }
        
        humanAgeFormatted = Math.round(k * Math.log(dogAgeYears) + baseAge);
    }

    // --- 顯示結果 ---
    const resultDiv = document.getElementById('result');
    const resultText = `狗狗現在大約是 ${dogAgeDisplay} 歲的狗年齡\n換算人類年齡大約是 ${humanAgeFormatted} 歲`;
    resultDiv.textContent = resultText;

    // --- 顏色漸變 (使用狗的實際年齡 years 來判斷) ---
    if (dogAgeYears < 2) {
        resultDiv.style.color = '#28a745'; 
    } else if (dogAgeYears < 10) {
        resultDiv.style.color = '#ffc107'; 
    } else {
        resultDiv.style.color = '#ff5733'; 
    }
    
    // ** III. 新增：儲存計算結果和顏色 **
    localStorage.setItem('dogResultText', resultText);
    localStorage.setItem('dogResultColor', resultDiv.style.color);
});