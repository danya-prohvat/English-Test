const partOfQuestion = document.querySelectorAll('.questions__part');

const deskPagination = document.querySelectorAll('.pagination-desktop__circle'),
      mobilePagination = document.querySelectorAll('.pagination-mobile__item');

const bntBack = document.querySelector('.back'),
    bntNext = document.querySelector('.next'),
    bntShowResult = document.querySelector('.showResult');

let currentPart = 1;

const renderAll = (part = 1) => {
    currentPart = part;
    print(part);
    showBtn(part);
    checkPagination(part);
}
renderAll();

deskPagination.forEach((el, i) => {
    el.addEventListener('click', () => renderAll(i + 1));
});

mobilePagination.forEach((el, i) => {
    el.addEventListener('click', () => renderAll(i + 1));
});

bntBack.addEventListener('click', () => renderAll(--currentPart));
bntNext.addEventListener('click', () => renderAll(++currentPart));

// bntShowResult.addEventListener('click', () => {});

function print(part) {
    partOfQuestion.forEach((el, i) => {
        if (i + 1 === part) el.classList.remove('hidden');
        else el.classList.add('hidden');
    });
}

function showBtn(part) {
    if (part === 11) bntShowResult.classList.remove('button-hidden');
    else bntShowResult.classList.add('button-hidden')
    if (part !== 1) bntBack.classList.remove('button-hidden');
    else bntBack.classList.add('button-hidden')
    if (part !== 11) bntNext.classList.remove('button-hidden');
    else bntNext.classList.add('button-hidden')
}

function checkPagination(part) {
    deskPagination.forEach((el, i) => {
        if (i + 1 === part) el.classList.add('checked');
        else el.classList.remove('checked');
    });
}


