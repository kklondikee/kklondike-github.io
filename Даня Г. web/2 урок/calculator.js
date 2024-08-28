function clearDisplay() { 
    document.getElementById('display').value = ''; 
}

function deleteLast() { 
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function appendToDisplay(value) {  // Исправлено: удален лишний символ "p"
    let display = document.getElementById('display'); 
    display.value += value; // Исправлено: добавлена точка с запятой
}

function calculateResult() {  // Исправлено: правильное название функции
    let display = document.getElementById('display');
    try {  
        display.value = eval(display.value); 
    } catch (e) {  
        display.value = 'Error'; 
    }
}
