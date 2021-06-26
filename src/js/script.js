const partOfQuestion = document.querySelectorAll('.questions__part');

const deskPagination = document.querySelectorAll('.pagination-desktop__circle');

const bntBack = document.querySelector('.back'),
    bntNext = document.querySelector('.next'),
    bntShowResult = document.querySelector('.showResult');

let currentPart = 1;

print(currentPart);

deskPagination.forEach((el, i) => {
    el.addEventListener('click', () => print(i+1));
});

function print(part) {
    partOfQuestion.forEach((el, i) => {
        if (i+1 === part) el.classList.remove('hidden');
        else el.classList.add('hidden');
    });
    showBtn(part);
}

function showBtn(part) {
    if (part === 11) bntShowResult.classList.remove('button-hidden');
    else bntShowResult.classList.add('button-hidden')
    if (part !== 1) bntBack.classList.remove('button-hidden');
    else bntBack.classList.add('button-hidden')
    if (part !== 11) bntNext.classList.remove('button-hidden');
    else bntNext.classList.add('button-hidden')
}

bntBack.addEventListener('click', () => print(--currentPart));
bntNext.addEventListener('click', () => print(++currentPart));
// bntShowResult.addEventListener('click', () => {});
