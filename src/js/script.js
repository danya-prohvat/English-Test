const Pagination = () => {
    const partOfQuestion = document.querySelectorAll('.questions__part'),
        deskPagination = document.querySelectorAll('.pagination-desktop__circle'),
        mobilePagination = document.querySelectorAll('.pagination-mobile__item'),
        bntBack = document.querySelector('.back'),
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

    deskPagination.forEach((el, i) => el.addEventListener('click', () => renderAll(i + 1)));
    mobilePagination.forEach((el, i) => el.addEventListener('click', () => renderAll(i + 1)));

    bntBack.addEventListener('click', () => renderAll(--currentPart));
    bntNext.addEventListener('click', () => renderAll(++currentPart));

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
}
Pagination();

const showResult = () => {
    document.querySelector('.showResult').addEventListener('click', () => showResult());

    const answersObject = {
        reading: [2, 2, 3, 3, 3, 3, 2],
        listening: [2, 2, 2, 2, 3, 2],
        grammar: [1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 2],
    };

    function showResult() {
        let grammarQuestionList = [];
        let listeningQuestionList = [];
        let readingQuestionList = [];
        let wordsQuestionList = [];
        let grammarCounter = 0;
        let listeningCounter = 0;
        let readingCounter = 0;
        let wordsCounter = 0;
        document.querySelectorAll('.grammar-questions').forEach((el, i) => {
            let selector = "input[name=grammar-question" + +(i + 1) + ']';
            grammarQuestionList.push(document.querySelectorAll(selector));
        });
        document.querySelectorAll('.listening-questions').forEach((el, i) => {
            let selector = "input[name=listening-question" + +(i + 1) + ']';
            listeningQuestionList.push(document.querySelectorAll(selector));
        });
        document.querySelectorAll('.reading-questions').forEach((el, i) => {
            let selector = "input[name=reading-question" + +(i + 1) + ']';
            readingQuestionList.push(document.querySelectorAll(selector));
        });
        for (let i = 0; i < 42; i++) wordsQuestionList.push(document.querySelector("input[name=words" + +(i + 1) + ']'));
        grammarCounter = isCorrect(grammarQuestionList, answersObject.grammar);
        listeningCounter = isCorrect(listeningQuestionList, answersObject.listening);
        readingCounter = isCorrect(readingQuestionList, answersObject.reading);
        wordsCounter = wordsIsCorrect(wordsQuestionList);
        console.log(listeningCounter);
        console.log(grammarCounter);
        console.log(readingCounter);
        console.log(wordsCounter);
    }

    function isCorrect(questionArr, answersArr) {
        let c = 0;
        questionArr.forEach((questionEl, i) => {
            questionEl.forEach((answersEl) => {
                if (answersEl.checked && answersEl.value == answersArr[i]) c++;
            });
        });
        return c;
    }

    function wordsIsCorrect(words) {
        let c = 0;
        words.forEach(word => {
            if (word.checked) c++;
        });
        return c;
    }
}
showResult();


const audioBlock = () => {
    const audioBtn = document.querySelectorAll('.audio-block__plPs'),
        audioTimeFiled = document.querySelectorAll('.audio-block__time > span'),
        progressBar = document.querySelectorAll('.audio-block__progress-bar'),
        progressPointer = document.querySelectorAll('.audio-block__pointer');

    let audioFilesArr = [];
    for (let i = 1; i <= 3; i++) {
        audioFilesArr.push(new Audio('../audio/audio_' + i + '.mp3'))
    }

    audioFilesArr.forEach((el, ind) => {
        el.addEventListener('loadedmetadata', event => {
            setVideoDuration(event, ind);
            progressBarObserver(event, ind);
        });
    });

    audioBtn.forEach((el, i) => {
        el.addEventListener('click', () => audioHandler(i))
    });

    progressBar.forEach((el, ind) => {
        el.addEventListener('click', event => {
            countTime(ind, event);
            toggleAudioBtn(ind, true);
            playAudio(ind);
        });
    });

    function setVideoDuration(event, ind) {
        let min = Math.floor(event.target.duration / 60);
        let sec = Math.floor(event.target.duration % 60) <= 9 ? Math.floor(event.target.duration % 60) + '0' : Math.floor(event.target.duration % 60);
        audioTimeFiled[ind].innerHTML = min + ':' + sec;
    }

    function audioHandler(ind) {
        if (audioBtn[ind].classList.contains('play')) {
            toggleAudioBtn(ind, true);
            playAudio(ind);
        } else {
            pauseAudio(ind);
            toggleAudioBtn(ind, false);
        }
    }

    function toggleAudioBtn(ind, bool) {
        if (bool) {
            audioBtn[ind].classList.remove('play');
            audioBtn[ind].classList.add('pause');
        } else {
            audioBtn[ind].classList.add('play');
            audioBtn[ind].classList.remove('pause');
        }
    }

    function countTime(ind, event) {
        let screenX = Math.floor(event.screenX - document.querySelectorAll('.audio-block__container')[ind].offsetLeft);
        let time = Math.floor((audioFilesArr[ind].duration / 200) * screenX);
        setPointer(screenX, ind);
        setCurrentTime(ind, time);
    }

    function progressBarObserver(event, ind) {
        setInterval(() => {
            let screenX = Math.ceil((200 / audioFilesArr[ind].duration) * audioFilesArr[ind].currentTime);
            setPointer(screenX, ind);
            if (screenX >= 200) {
                setCurrentTime(ind, 1)
                pauseAudio(ind);
                setPointer(screenX, ind);
                toggleAudioBtn(ind, false);
            }
        }, 200)
    }

    function playAudio(ind) {
        audioFilesArr[ind].play();
    }

    function pauseAudio(ind) {
        audioFilesArr[ind].pause();
    }

    function setCurrentTime(ind, time) {
        audioFilesArr[ind].currentTime = time;
    }

    function setPointer(screenX, ind) {
        progressPointer[ind].style.left = screenX + 'px';
    }
}
audioBlock();