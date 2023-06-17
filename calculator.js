const Operators = Object.freeze({
    '+' : { level: 4, name: 'plus', display: '+', function: (a, b) => a + b },
    '-' : { level: 4, name: 'minus', display: '-', function: (a, b) => a - b },
    '*' : { level: 3, name: 'times', display: '*', function: (a, b) => a * b },
    '/' : { level: 3, name: 'divide', display: '/', function: (a, b) => a / b },
    '^' : { level: 2, name: 'pow', display: '^', function: (a, b) => a ** b },
    '%' : { level: 2, name: 'mod', display: '%', function: (a, b) => a % b },
    '!' : { level: 2, name: 'factorial', display: '!', function: (a, b=1) => a * b },
    '(' : { level: 1, name: 'openParen', display: '(', function: (a=1, b) => a * b },
    sin : { level: 1, name: 'sin', display: 'sin(', function: (a=1, b) => a * Math.sin(b) },
    cos : { level: 1, name: 'cos', display: 'cos(', function: (a=1, b) => a * Math.cos(b) },
    tan : { level: 1, name: 'tan', display: 'tan(', function: (a=1, b) => a * Math.tan(a) },
    ln : { level: 1, name: 'ln', display: 'ln(', function: (a=1, b) => a * Math.log(a) },
    log : { level: 1, name: 'log', display: 'log(', function: (a=1, b) => a * Math.log10(a) },
    sqrt : { level: 1, name: 'sqrt', display: 'sqrt(', function: (a=1, b) => a * Math.sqrt(a) },
    π : { name: 'pi', display: 'π' },
    e : { name: 'e', display: 'e' },
    'Ans' : { name: 'ans', display: 'Ans'},
    ')' : { name: 'closedParen', display: ')' },
});

let expression = [];
let ans = 0;

const evaluate = (input) => {
    expression = input;
    ans = evalAS();
    return ans;
};

const evalAS = () => {
    let a = evalMD();
    if (match('+')) {
        a = evalAS() + a;
    } else if (match('-')) {
        a = evalAS() - a;
    }
    //console.log(a);
    return a;
}

const evalMD = () => {
    let a = evalE();
    if (match('*')) {
        a = evalMD() * a;
    } else if (match('/'))  {
        a = evalMD() / a;
    }
    //console.log(a);
    return a;
}

const evalE = () => {
    let a = evalF();
    if (match('^')) {
        a = evalE() ** a;
    } else if (match('%')) {
        a = evalE() % a;
    } else if (match('!')) {
        a = a;
    }
    //console.log(a);
    return a;
}

const evalF = () => {
    let a = evalP();
    if (match('sin')) {
        a = Math.sin(a);
    } else if (match('cos')) {
        a = Math.cos(a);
    } else if (match('tan')) {
        a = Math.tan(a);
    } else if (match('log')) {
        a = Math.log10(a);
    } else if (match('ln')) {
        a = Math.log(a);
    } else if (match('sqrt')) {
        a = Math.sqrt(a);
    } else if (match('(')) {
        a = a;
    }
    //console.log(a);
    return a;
}

const evalP = () => {
    let a;
    if (match(')')) {
        a = evalAS();
    } else if (match('π')) {
        a = Math.PI;
    } else if (match('e')) {
        a = Math.E;
    } else if (match('Ans')) {
        a = ans;
    } else {
        a = parseNum();
    }
    //console.log(a);
    return a;
}

const parseNum = () => +expression.pop();

const match = (symbol) => {
    if (expression.at(-1) === symbol) {
        expression.pop();
        return true;
    }
    return false;
}
