    let current = '0', prev = '', op = null, reset = false;

    function updateDisplay() {
    let disp = current;
    if (disp !== 'Error' && disp.replace('-','').replace('.','').length > 10)
    disp = parseFloat(current).toPrecision(8);
    document.getElementById('result').textContent = disp;
    const sym = op === '*' ? '×' : op === '/' ? '÷' : op === '-' ? '−' : op;
    document.getElementById('expr').textContent = prev && op ? prev + ' ' + sym : '';
}

    function inputNum(n) {
    if (reset) { current = n; reset = false; }
    else current = current === '0' ? n : current + n;
    updateDisplay();
}

    function inputDot() {
    if (reset) { current = '0.'; reset = false; }
    else if (!current.includes('.')) current += '.';
    updateDisplay();
}

    function inputOp(o) {
    if (op && !reset) calculate(true);
    prev = current; op = o; reset = true;
    updateDisplay();
}

    function calculate(chain) {
    if (!op || !prev) return;
    const a = parseFloat(prev), b = parseFloat(current);
    let res;
    if (op === '+') res = a + b;
    else if (op === '-') res = a - b;
    else if (op === '*') res = a * b;
    else if (op === '/') res = b === 0 ? NaN : a / b;
    if (isNaN(res)) { current = 'Error'; op = null; prev = ''; reset = true; }
    else {
    current = parseFloat(res.toPrecision(10)).toString();
    if (!chain) { op = null; prev = ''; } else prev = current;
    reset = true;
}
    updateDisplay();
}

    function ac() {
    current = '0'; prev = ''; op = null; reset = false;
    updateDisplay();
}
