const States = Object.freeze({
    Clear : Symbol('clear'), 
    Numeric : Symbol('number'),
    Constant : Symbol('constant'),
    Function : Symbol('funtion'),
    Operator : Symbol('operator'),
    CloseBracket : Symbol('closeParen'),
});

let state = States.Clear;

const display = document.querySelector('#real-input');
display.textContent = '';
const suggested = document.querySelector('#suggested-input');
suggested.textContent = '0';

let inputStack = [];
let suggestedStack = [];

const addInput = (name) => {
    inputStack = [...inputStack, name];
    display.textContent += Operators[name].display;
}

document.querySelector('#clear').addEventListener('click', () => {
    inputStack = [];
    display.textContent = '';
    suggestedStack = [];
    suggested.textContent = '0';
    state = States.Clear;
});

document.querySelectorAll('.btn.number').forEach(button => {
    button.addEventListener('click', () => {
        if (state == States.Clear) {
            suggested.textContent = '';
        }
        if (state == States.Constant || state == States.CloseBracket) {
            addInput('*');
        }

        if (state != States.Numeric) {
            inputStack = [...inputStack, ''];
        }
        if (button.textContent != '.' || !inputStack.at(-1).includes('.')) {
            inputStack[inputStack.length-1] += button.textContent;
            display.textContent += button.textContent;
        }
        state = States.Numeric;
    });
});

document.querySelectorAll('.btn.const').forEach(button => {
    button.addEventListener('click', () => {
        if (state == States.Clear) {
            suggested.textContent = '';
        }
        if (state == States.Numeric || state == States.Constant || state == States.CloseBracket) {
            addInput('*');
        }
        addInput(button.textContent);
        state = States.Constant;
    });
});

document.querySelectorAll('.btn.close').forEach(button => {
    button.addEventListener('click', () => {
        if (!suggestedStack.length || state != States.Numeric && state != States.Constant && state != States.CloseBracket) {
            return;
        }
        addInput(button.textContent);
        suggestedStack.pop();
        suggested.textContent = suggestedStack.join('');
        state = States.CloseBracket;
    });
});

document.querySelectorAll('.btn.func').forEach(button => {
    button.addEventListener('click', () => {
        if (state == States.Clear) {
            suggested.textContent = '';
        }
        if (state == States.Numeric || state == States.Symbol || state == States.CloseBracket) {
            addInput('*');
        }
        addInput(button.textContent);
        suggestedStack = [...suggestedStack, ')']
        suggested.textContent = suggestedStack.join('');
        state = States.Function;
    });
});

document.querySelectorAll('.btn.op').forEach(button => {
    button.addEventListener('click', () => {
        if (state == States.Clear) {
            inputStack = [suggested.textContent];
            display.textContent = suggested.textContent;
            suggested.textContent = '';
        } else if (state != States.Numeric && state != States.Constant && state != States.CloseBracket) {
            return;
        }
        addInput(button.textContent);
        state = States.Operator;
    });
});

document.querySelector('#eq').addEventListener('click', () => {
    let result = evaluate([...inputStack, ...suggestedStack]);
    suggestedStack = [];
    inputStack = [];
    display.textContent = '';
    suggested.textContent = result;
    state = States.Clear;
});

const KeyBinds = Object.freeze({
    s : 'sin',
    c : 'cos',
    t : 'tan',
    p : 'π',
    e : 'e',
    a : 'Ans',
    l : 'ln',
    g : 'log',
    q : 'sqrt',
    Enter : '=',
    Backspace : 'C',
});

document.addEventListener('keydown', (event) => {
    const key = event.key in KeyBinds ? KeyBinds[event.key] : event.key;
    const button = Array.from(document.querySelectorAll('.btn'))
                        .find(button => button.textContent == key);
    console.log(key);
    console.log(button);
    if (button) {
        button.click();
    }
});

// document.querySelectorAll('.btn').forEach(button => {
//     button.addEventListener('click', () => {
//         console.log(state)
//         console.log(inputStack.join(','));
//     });
// });
