
const symbols = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G"];
const symbolColors = ['initial-value', 'inserted-value', 'solver-value'];
// const symbolColors = ["black", "blue", "green"];
// even, odd, pressed
const squareColors = ["azure", "snow", "lightgrey"];

// oletuksena 9x9-sudoku: sideLength = 3, fullLength = 9
let sideLength = 3;
let fullLength = sideLength * sideLength;

const grid = document.querySelector('.grid');
grid.classList.add('grid9x9');
let squares = Array.from(document.querySelectorAll('.grid div'));
let activeSquare;
// oletuksena ei aktiivista ruutua, 
let activeSquareCoord = -1;





// väritetään ruutuja aluksi
// käytetäänkö css-luokkia väritykseen??
// mikä väri tulee mihinkäkin ruutuun?
function bgColor(coord) {
    let sqNum = coordToSqNum(coord);
    let xSq = sqNum % sideLength;
    let ySq = Math.floor(sqNum / sideLength);
    if((xSq + ySq) % 2 === 0) {
        return 'even-squares';
        // return squareColors[0];
    }
    else {
        return 'odd-squares';
        // return squareColors[1];
    }
}
// ja eikun värittämään
function colorSquares() {
    for(let i = 0; i < squares.length; i++) {
        squares[i].classList.add(bgColor(i));
        // squares[i]
    }
}


// valitaan muokattava ruutu klikkaamalla
function clickSquare(e) {
    const target = e.currentTarget;
    // console.log(target);
    // const pressedSquare = document.querySelector('pressed'); ei toimi
    // console.log(pressedSquare); ei toimi
    // console.log(activeSquare);
    if(activeSquareCoord > -1) {
        // jos aiemmin oli valittu ruutu, poistetaan valinta
        deactivate(activeSquareCoord);
        activeSquareCoord = squares.indexOf(target);
        // activeSquare.classList.remove('pressed');
        // activeSquare.classList.add(bgColor(activeSquareCoord));
        if(target === activeSquare) {
            // jos klikattiin samaa ruutua toistamiseen, ei aktiivista ruutua
            activeSquareCoord = -1;
            return;
        }
    }
    activeSquareCoord = squares.indexOf(target);
    // target.classList.remove(bgColor(activeSquareCoord));
    // target.classList.add('pressed');
    activate(activeSquareCoord);
    activeSquare = target;
    }

// aluksi väritetään ruudut ja lisätään klikki-toiminto
function initiateSquares() {
    colorSquares();
    squares.forEach(square => {
        square.addEventListener('click', clickSquare);
    });
}

initiateSquares();


// luo tyhjä sudoku (tyhjät ruudut nollia)
function createEmptySudoku(sLength) {
    let sudoku = [];
    for(let i = 0; i < Math.pow(sLength,4); i++) {
        sudoku.push(0);
    }
    return sudoku;
}

let initialValueMode = true;
function toggleIVM() {
    if(initialValueMode) {
        initialValueMode = false;
        initialValueBtn.innerHTML = "Alkuarvomoodi on pois päältä";
        initialValueBtn.classList.remove('initial-btn');
        initialValueBtn.classList.add('normal-btn');
    }
    else {
        initialValueMode = true;
        initialValueBtn.innerHTML = "Alkuarvomoodi on päällä";
        initialValueBtn.classList.remove('normal-btn');
        initialValueBtn.classList.add('initial-btn');
    }
}

let sudokuOG = createEmptySudoku(sideLength);
let sudokuCurr = createEmptySudoku(sideLength);





// deaktivoidaan tai aktivoidaan ruutu (koordinaattien perusteella)
function deactivate(coord) {
    squares[coord].classList.remove('pressed');
    squares[coord].classList.add(bgColor(coord));
}

function activate(coord) {
    squares[coord].classList.remove(bgColor(coord));
    squares[coord].classList.add('pressed');
}

function switchColor(coord, mode) {
    if(mode === 0) {
        squares[coord].classList.remove(symbolColors[1]);
        squares[coord].classList.remove(symbolColors[2]);
        squares[coord].classList.add(symbolColors[0]);
    }
    else if(mode === 1) {
        squares[coord].classList.remove(symbolColors[0]);
        squares[coord].classList.remove(symbolColors[2]);
        squares[coord].classList.add(symbolColors[1]);
    }
    else if(mode === 2) {
        squares[coord].classList.remove(symbolColors[1]);
        squares[coord].classList.remove(symbolColors[0]);
        squares[coord].classList.add(symbolColors[2]);
    }
    else {
        console.log("invalid mode argument");
    }
}

// NÄPPÄINKOMENNOT
// kenties aktiivista ruutua voisi liikutella nuolinäppäimillä??
// numerot ruutuihin tai pois
function keyPressed(e) {
    // jonkin ruudun on oltava aktiivisena
    if(activeSquareCoord !== -1) {
        // tab siirtää aktiivista ruutua eteenpäin (ei toimi)
        // if(e.keyCode === 9) {
        //     activeSquare.classList.remove('pressed');
        //     activeSquare.classList.add('notPressed');
        //     if(activeSquareCoord < squares.length) {
        //         activeSquareCoord++;
        //     }
        //     else {
        //         activeSquareCoord = 0;
        //     }
        //     activeSquare = squares[activeSquareCoord];
        //     activeSquare.classList.remove('notPressed');
        //     activeSquare.classList.add('pressed');
        // }
        
        // nuolinäppäimillä aktiivinen ruutu liikkuu (L-U-R-D)
        if(e.keyCode === 37) {
            if(activeSquareCoord % fullLength !== 0) {
                deactivate(activeSquareCoord);
                activeSquareCoord--;
                activeSquare = squares[activeSquareCoord];
                activate(activeSquareCoord);
            }
        }
        else if(e.keyCode === 38) {
            if(activeSquareCoord >= fullLength) {
                deactivate(activeSquareCoord);
                activeSquareCoord -= fullLength;
                activeSquare = squares[activeSquareCoord];
                activate(activeSquareCoord);
            }
        }
        else if(e.keyCode === 39) {
            // sallitaanko ruudukon kierto?
            // if(activeSquareCoord % fullLength === fullLength - 1) {
            if(activeSquareCoord !== fullLength * fullLength - 1) {
                deactivate(activeSquareCoord);
                activeSquareCoord++;
                activeSquare = squares[activeSquareCoord];
                activate(activeSquareCoord);
            }
        }
        else if(e.keyCode === 40) {
            if(activeSquareCoord < fullLength * (fullLength - 1)) {
                deactivate(activeSquareCoord);
                activeSquareCoord += fullLength;
                activeSquare = squares[activeSquareCoord];
                activate(activeSquareCoord);
            }
        }
        // backspace/delete tyhjää ruudun
        else if(e.keyCode === 8 || e.keyCode === 46) {
            if(initialValueMode) {
                activeSquare.innerHTML = "";
                sudokuOG[activeSquareCoord] = 0;
                sudokuCurr[activeSquareCoord] = 0;
                checkErrors(sudokuOG, true);
            }
            else {
                if(!activeSquare.classList.contains('initial-value')) {
                    activeSquare.innerHTML = "";
                    sudokuCurr[activeSquareCoord] = 0;
                    checkErrors(sudokuCurr, true);
                }
            }
            
        }
        else {
            // ja numerot 1-9 ruutuun
            const limit = Math.min(9, fullLength);
            for(let i = 1; i <= limit; i++) {
                if(e.keyCode === 48 + i){
                    if(initialValueMode) {
                        // activeSquare.classList.remove('inserted-value');
                        // activeSquare.classList.remove('solver-value');
                        // activeSquare.classList.add('initial-value');
                        switchColor(activeSquareCoord, 0);
                        sudokuOG[activeSquareCoord] = i;
                    }
                    else {
                        // activeSquare.classList.remove('initial-value');
                        // activeSquare.classList.remove('solver-value');
                        // activeSquare.classList.add('inserted-value');
                        switchColor(activeSquareCoord, 1);
                    }
                    // activeSquare.innerHTML = `${i.toString()}`;
                    activeSquare.innerHTML = symbols[i - 1];
                    sudokuCurr[activeSquareCoord] = i;
                    checkErrors(sudokuCurr, true);
                    return;
                }
            }
            // kirjaimia painamalla suuremmat numerot (16x16-tilanteessa)
            for(let i = 0; i < fullLength - limit; i++) {
                if(e.keyCode === 65 + i) {
                    if(initialValueMode) {
                        sudokuOG[activeSquareCoord] = 10 + i;
                        switchColor(activeSquareCoord, 0);
                    }
                    else {
                        switchColor(activeSquareCoord, 1);
                    }
                    activeSquare.innerHTML = symbols[9 + i];
                    sudokuCurr[activeSquareCoord] = 10 + i;
                    checkErrors(sudokuCurr, true);
                    // console.log(symbols[9 + i], 10 + i);
                    return;
                }
            }
            // sama numpadilla (toimii vain 9 asti)
            // const limit = Math.min(9, fullLength);
            for(let i = 1; i <= limit; i++) {
                if(e.keyCode === 96 + i) {
                    if(initialValueMode) {
                        // activeSquare.classList.remove('inserted-value');
                        // activeSquare.classList.remove('solver-value');
                        // activeSquare.classList.add('initial-value');
                        switchColor(activeSquareCoord, 0);
                        sudokuOG[activeSquareCoord] = i;
                    }
                    else {
                        // activeSquare.classList.remove('initial-value');
                        // activeSquare.classList.remove('solver-value');
                        // activeSquare.classList.add('inserted-value');
                        switchColor(activeSquareCoord, 1);
                    }
                    // activeSquare.innerHTML = `${i.toString()}`;
                    activeSquare.innerHTML = symbols[i - 1];
                    sudokuCurr[activeSquareCoord] = i;
                    checkErrors(sudokuCurr, true);
                    return;
                }
            }
        }
        
    }
}

window.addEventListener('keyup', keyPressed);




// SUDOKUN KOON MUUTOS
// ensin luodaan divejä
function createDivs(num) {
    let divs = "";
    for(let i = 0; i < num; i++) {
        divs = divs + "<div></div>\n";
    }
    return divs;
}

function switchSize(sLength) {
    // vain 9x9 ja 16x16 mahdollisia
    if(sLength === 3) {
        grid.classList.remove('grid16x16');
        grid.classList.add('grid9x9');
        switchTo9x9.classList.toggle('show-btn');
        switchTo16x16.classList.toggle('show-btn');
    }
    else if(sLength === 4) {
        grid.classList.remove('grid9x9');
        grid.classList.add('grid16x16');
        switchTo9x9.classList.toggle('show-btn');
        switchTo16x16.classList.toggle('show-btn');
    }
    else {
        errorBar.textContent = "Ei sopiva sivunpituus: vain 3 tai 4 mahdollisia"
        return;
    }
    sideLength = sLength;
    fullLength = sideLength * sideLength;
    let htmlText = createDivs(Math.pow(sideLength, 4));
    grid.innerHTML = htmlText;
    squares = Array.from(document.querySelectorAll('.grid div'));
    initiateSquares();
    if(activeSquareCoord > -1) {
        deactivate(activeSquareCoord);
        activeSquareCoord = -1;
    }
    sudokuOG = createEmptySudoku(sideLength);
    sudokuCurr = createEmptySudoku(sideLength);
}

// testataan koon vaihtoa
// switchSize(4);

// painikkeet joilla saadaan koonvaihto esiin
const sizeBtns = document.querySelectorAll('.size-select-btn');

function showContent(e) {
    const sizeSelection = e.currentTarget.parentElement.parentElement;
    // console.log(sizeSelection);
    sizeBtns.forEach(btn => {
        const sizeSelect = btn.parentElement.parentElement;
        if(sizeSelection != sizeSelection) {
            sizeSelect.classList.remove('show-text');
        }
    });
    sizeSelection.classList.toggle('show-text');
}

sizeBtns.forEach(btn => {
    btn.addEventListener('click', showContent);
});

// ja sitten varsinainen koon vaihto
const switchTo9x9 = document.getElementById('9x9');
const switchTo16x16 = document.getElementById('16x16');

switchTo9x9.addEventListener('click', () => switchSize(3));
switchTo16x16.addEventListener('click', () => switchSize(4));

// oletuksena 9x9-sudoku alussa, vaihto 16x16 näkyvissä
switchTo16x16.classList.add('show-btn');
// console.log(switchTo16x16.classList);
// console.log(switchTo9x9.classList);





// VIRHEET SUDOKUSSA
// virheiden etsintä ja niistä ilmoittaminen
const errorBar = document.querySelector('.error-bar');

// true = ei virheitä, false = virhe löytyi
function checkErrors(sudoku, withMessages) {
    //  onko mikään numero kahdesti jollain rivillä, sarakkeessa tai neliössä?
    for(let num = 1; num <= fullLength; num++) {
        // rivit
        for(let i = 1; i <= fullLength; i++){
            let count = 0;
            for(let j = 0; j < fullLength; j++) {
                if(sudoku[(i-1) * fullLength + j] === num) {
                    count++;
                }
            }
            if(count > 1) {
                // console.log(`${num.toString()} esiintyy ainakin kahdesti rivillä ${i.toString()}`);
                if(withMessages) {
                    errorBar.innerHTML = `${symbols[num - 1]} esiintyy ainakin kahdesti rivillä ${i.toString()}`;
                    errorBar.classList.add('error-found');
                }
                return false;
            }

        }
        // sarakkeet
        for(let i = 1; i <= fullLength; i++){
            let count = 0;
            for(let j = 0; j < fullLength; j++) {
                if(sudoku[(i-1) + fullLength * j] === num) {
                    count++;
                }
            }
            if(count > 1) {
                if(withMessages) {
                    errorBar.innerHTML = `${symbols[num - 1]} esiintyy ainakin kahdesti sarakkeessa ${i.toString()}`;
                    errorBar.classList.add('error-found');
                }
                return false;
            }

        }
        // neliöt
        for(let i = 1; i <= fullLength; i++) {
            let count = 0;
            // let x0 = Math.floor((i-1) / sideLength) * sideLength * fullLength + ((i-1) % sideLength) * sideLength;
            let x0 = sqNumToLUCoord(i-1);
            // console.log(x0);
            for(let j = 0; j < sideLength; j++) {
                for(let k = 0; k < sideLength; k++) {
                    if (sudoku[x0 + j + k * fullLength] === num) {
                        count++;
                    }
                }
            }
            if(count > 1) {
                if(withMessages) {
                    errorBar.innerHTML = `${symbols[num - 1]} esiintyy ainakin kahdesti neliössä ${i.toString()}`;
                    errorBar.classList.add('error-found');
                }
                return false;
            }
        }
    }
    if(withMessages) {
        errorBar.classList.remove('error-found');
        errorBar.innerHTML = "";
    }
    return true;
}


// tyhjennys
function clearAll() {
    if(activeSquareCoord > -1) {
        // activeSquare.classList.remove('pressed');
        // activeSquare.classList.add('notPressed');
        deactivate(activeSquareCoord);
    }
    activeSquareCoord = -1;
    for(let i = 0; i < squares.length; i++) {
        squares[i].innerHTML = "";
        sudokuOG[i] = 0;
        sudokuCurr[i] = 0;
    }
    checkErrors(sudokuCurr, true);
}

function clearNonInitial() {
    if(activeSquareCoord > -1) {
        // activeSquare.classList.remove('pressed');
        // activeSquare.classList.add('notPressed');
        deactivate(activeSquareCoord);
    }
    activeSquareCoord = -1;
    for(let i = 0; i < squares.length; i++) {
        if(!squares[i].classList.contains('initial-value')) {
            squares[i].innerHTML = "";
            sudokuCurr[i] = 0;
        }
    }
    checkErrors(sudokuCurr, true);
}

// SUDOKUN RATKAISUUN JOHTAVA PUUHASTELU
// onko tehty muutoksia, oletuksena ei
let changesDone = false;
let changesCoord = -1;
let changesNum = 0;

function resetChanges() {
    changesDone = false;
    changesCoord = -1;
    changesNum = 0;
}

// neliön sqNum vasemman yläkulman koordinaatit
function sqNumToLUCoord(sqNum) {
    return Math.floor(sqNum / sideLength) * sideLength * fullLength + (sqNum % sideLength) * sideLength;
}

// missä neliössä koordinaatit ovat?
function coordToSqNum(coord) {
    const x = coord % fullLength;
    const y = Math.floor(coord / fullLength);
    const ySq = Math.floor(y / sideLength);
    const xSq = Math.floor(x / sideLength);
    return ySq * sideLength + xSq;
}

// sopiiko num sudokun ruutuun sudoku[coord]?
function doesNumFit(coord, num, sudoku) {
    // onko paikka edes tyhjä?
    if(sudoku[coord] !== 0) {
        return false;
    }
    // onko rivillä jo num?
    const rowNum = Math.floor(coord / fullLength);
    for(let i = 0; i < fullLength; i++) {
        if(sudoku[rowNum * fullLength + i] === num) {
            return false;
        }
    }
    // onko sarakkeessa jo num?
    const colNum = coord % fullLength;
    for(let i = 0; i < fullLength; i++) {
        if(sudoku[colNum + i * fullLength] === num) {
            return false;
        }
    }
    // onko neliössä jo num?
    const x0 = Math.floor(rowNum / sideLength) * sideLength * fullLength + Math.floor(colNum / sideLength) * sideLength;
    // const x0 = sqNumToLUCoord(coordToSqNum(coord));
    for(let i = 0; i < sideLength; i++) {
        for(let j = 0; j < sideLength; j++) {
            if(sudoku[x0 + i + j * fullLength] === num) {
                return false;
            }
        }
    }
    return true;
}

// kuinka monta numeroa sopii ruutuun sudoku[coord]?
function numOfFitting(coord, sudoku) {
    let count = 0;
    for(num = 1; num <= fullLength; num++) {
        if(doesNumFit(coord, num, sudoku)) {
            count++;
        }
    }
    return count;
}

// kuinka moneen paikkaan num sopii rivillä rowNum?
function numOfFittingInRow(rowNum, num, sudoku) {
    let count = 0;
    for(let i = 0; i < fullLength; i++) {
        if(doesNumFit(rowNum * fullLength + i, num, sudoku)) {
            count++;
        }
    }
    return count;
}

// kuinka moneen paikkaan num sopii sarakkeessa colNum?
function numOfFittingInCol(colNum, num, sudoku) {
    let count = 0;
    for(let i = 0; i < fullLength; i++) {
        if(doesNumFit(i * fullLength + colNum, num, sudoku)) {
            count++;
        }
    }
    return count;
}

// kuinka moneen paikkaan num sopii neliössä sqNum?
function numOfFittingInSq(sqNum, num, sudoku) {
    let count = 0;
    const x0 = sqNumToLUCoord(sqNum);
    for(let i = 0; i < sideLength; i++) {
        for(let j = 0; j < sideLength; j++) {
            if(doesNumFit(x0 + i + j * fullLength, num, sudoku)) {
                count++;
            }
        }
    }
    return count;
}


function easyFill(sudoku) {
    // katsotaan onko annetussa sudokussa virheitä
    if(!checkErrors(sudoku, true)) {
        return sudoku;
    }
    // katsotaan josko johonkin ruutuun sopii vain yksi numero
    for(let i = 0; i < fullLength * fullLength; i++) {
        if(numOfFitting(i, sudoku) === 1) {
            for(let num = 1; num <= fullLength; num++) {
                if(doesNumFit(i, num, sudoku)) {
                    sudoku[i] = num;
                    changesDone = true;
                    changesCoord = i;
                    changesNum = num;
                    return sudoku;
                }
            }
        }
    }
    for(let num = 1; num <= fullLength; num++) {
        // onko rivejä joihin num sopii vain yhteen paikkaan
        for(let i = 0; i < fullLength; i++) {
            if(numOfFittingInRow(i, num, sudoku) === 1) {
                for(let j = 0; j < fullLength; j++) {
                    if(doesNumFit(i * fullLength + j, num, sudoku)) {
                        sudoku[i * fullLength + j] = num;
                        changesDone = true;
                        changesCoord = i * fullLength + j;
                        changesNum = num;
                        return sudoku;
                    }
                }
            }
        }
        // onko sarakkeita joihin num sopii vain yhteen paikkaan
        for(let i = 0; i < fullLength; i++) {
            if(numOfFittingInCol(i, num, sudoku) === 1) {
                for(let j = 0; j < fullLength; j++) {
                    if(doesNumFit(i + fullLength * j, num, sudoku)) {
                        sudoku[i + fullLength * j] = num;
                        changesDone = true;
                        changesCoord = i + fullLength * j;
                        changesNum = num;
                        return sudoku;
                    }
                }
            }
        }
        // onko neliöitä joihin num sopii vain yhteen paikkaan
        for(let sqNum = 0; sqNum < fullLength; sqNum++) {
            if(numOfFittingInSq(sqNum, num, sudoku) === 1) {
                const x0 = sqNumToLUCoord(sqNum);
                for(let i = 0; i < sideLength; i++) {
                    for(let j = 0; j < sideLength; j++) {
                        if(doesNumFit(x0 + i + fullLength * j, num, sudoku)) {
                            sudoku[x0 + i + fullLength * j] = num;
                            changesDone = true;
                            changesCoord = x0 + i + fullLength * j;
                            changesNum = num;
                            return sudoku;
                        }
                    }
                }
            }
        }
    }
    resetChanges();
    return sudoku;
}

// kuinka monta tyhjää ruutua sudokussa on?
function numOfEmpties(sudoku) {
    let count = 0;
    for(let i = 0; i < Math.pow(sideLength, 4); i++) {
        if(sudoku[i] === 0) {
            count++;
        }
    }
    return count;
}

// ja ratkaistaan
// TAI SITTEN EI
// ROPLEM, ROPLEM!!!!!!!!!!!!!!!
function solve(sudoku) {
    // katsotaan onko annetussa sudokussa virheitä
    if(!checkErrors(sudoku, true)) {
        return sudoku;
    }
    // sudoku = easyFill(sudoku);
    // jos ei tyhjiä, on sudokun parasta olla ratkaistu
    // console.log("alussa tyhjiä");
    // console.log(numOfEmpties(sudoku));
    if(numOfEmpties(sudoku) === 0) {
        console.log("ei tyhjiä");
        changesDone = true;
        return sudoku;
    }
    // jos muutoksia, yritetään ratkaista uudelleen
    // if(changesDone) {
    //     sudoku = solve(sudoku);
    //     if(numOfEmpties(sudoku) === 0) {
    //         console.log("ei tyhjiä");
    //         return sudoku;
    //     }
    // }
    // ja sitten brute-force
    for(let i = 0; i < Math.pow(sideLength, 4); i++) {
        if(sudoku[i] === 0) {
            for(let num = 1; num <= fullLength; num++) {
                if(doesNumFit(i, num, sudoku)) {
                    sudoku[i] = num;
                    sudoku = solve(sudoku);
                    // console.log("sijoitetaan");
                    // console.log(num);
                    // console.log("ruutuun");
                    // console.log(i);
                    // console.log("sijoituksen jälkeen tyhjiä");
                    // console.log(numOfEmpties(sudoku));
                    if(numOfEmpties(sudoku) === 0) {
                        // console.log("ei tyhjiä");
                        changesDone = true;
                        return sudoku;
                    }
                    sudoku[i] = 0;
                    // console.log("palataan takaisin");
                    // console.log(i);
                    // console.log("tyhjäksi");
                }
            }
            // console.log("tyhjä paikka, johon mikään ei sovi");
            return sudoku;
        }
    }
    console.log("loppuun tultiin");
    return sudoku;
}

function easyInsert() {
    // vaihdetaan moodi jos tarpeen
    if(initialValueMode) {
        toggleIVM();
    }
    sudokuCurr = easyFill(sudokuCurr);

    // jos on virheitä, niin ei tehdä mitään muuta
    if(errorBar.classList.contains('error-found')) {
        return;
    }
    
    if(changesDone) {
        squares[changesCoord].classList.remove('initial-value');
        squares[changesCoord].classList.remove('inserted-value');
        squares[changesCoord].classList.add('solver-value');
        // squares[changesCoord].innerHTML = changesNum.toString();
        squares[changesCoord].innerHTML = symbols[changesNum - 1];
        errorBar.innerHTML = `${symbols[changesNum - 1]} sijoitettu`;
        // resetoidaan changes-muuttujat
        resetChanges();
    }
    else {
        errorBar.innerHTML = "Ei helppoja sijoituksia";
    }
}

function showSolution() {
    // vaihdetaan moodi jos tarpeen
    if(initialValueMode) {
        toggleIVM();
    }
    sudokuCurr = solve(sudokuCurr);
    // console.log(sudokuCurr);
    
    // jos on virheitä, niin ei tehdä mitään muuta
    if(errorBar.classList.contains('error-found')) {
        return;
    }

    if(changesDone) {
        for(let i = 0; i < Math.pow(sideLength, 4); i++) {
            // TARKISTA EHDON TOIMIVUUS
            if(!squares[i].innerHTML) {
                squares[i].classList.remove('initial-value');
                squares[i].classList.remove('inserted-value');
                squares[i].classList.add('solver-value');
                squares[i].innerHTML = symbols[sudokuCurr[i] - 1];
            }
        }
        if(numOfEmpties(sudokuCurr) === 0) {
            errorBar.innerHTML = "Sudoku ratkaistu";
        }
        else {
            errorBar.innerHTML = "ongelmia havaittu";
        }
        // resetoidaan changes-muuttujat
        resetChanges();
    }
    else {
        errorBar.innerHTML = "Ei ratkaisua"
    }
}

// painikkeet
const initialValueBtn = document.getElementById('initialValueBtn');
const emptyAllBtn = document.getElementById('emptyAllBtn');
const emptyBtn = document.getElementById('emptyBtn');
const easyBtn = document.getElementById('easyBtn');
const solveBtn = document.getElementById('solveBtn');

initialValueBtn.addEventListener('click', toggleIVM);
initialValueBtn.classList.add('initial-btn');

emptyAllBtn.addEventListener('click', clearAll);

emptyBtn.addEventListener('click', clearNonInitial);

easyBtn.addEventListener('click', easyInsert);

solveBtn.addEventListener('click', showSolution);
