const createElement = (arr) =>{
    const htmlElement = arr.map((el)=> `<span class="btn">${el}</span>`);
    return htmlElement.join(" ")
}

const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById("spinner-container").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else{
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner-container").classList.add("hidden");
    }
}

const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data))
}

const removeActive = () => {
    const lessonBtn = document.querySelectorAll(".lesson-btn");

    lessonBtn.forEach(lesson => lesson.classList.remove("active"))
}

const loadLevelWord = (id) => {
    manageSpinner(true);
    let url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {

            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active")
            displayWord(data.data);


        });
}

const loadWordDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(details => displayWordDetail(details.data));
}

// "data": {
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
// "id": 5

displayWordDetail = (details) => {
    // console.log(details);
    const detailContainer = document.getElementById("detail-container");
    detailContainer.innerHTML = `
     <div class="">
                    <h2 class="text-2xl font-bold">${details.word} (<i class="fa-solid fa-microphone"></i>:${details.pronunciation})</h2>
                </div>
                <div class="">
                    <p class="text-xl font-semibold">Meaning</p>
                    <p class="font-medium">${details.meaning}</p>
                </div>
                <div class="">
                    <p class="text-xl font-semibold">Example</p>
                    <p class="text-gray-500">${details.sentence}</p>
                </div>
                <div class="">
                    <p class="text-xl font-medium">synonyms</p>
                    <div>${createElement(details.synonyms)}</div>
                </div>
    
    `
    document.getElementById("my_modal_5").showModal()

}

const displayWord = (words) => {
    // console.log(words);
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length === 0) {
        wordContainer.innerHTML = `<div class="text-center col-span-full font-bangla space-y-5">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <h2 class="text-[13px] font-medium text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h2>
            <h2 class="text-4xl text-[#292524] font-semibold">নেক্সট Lesson এ যান।</h2>
        </div>`

        manageSpinner(false)
        return

    }

    words.forEach(word => {
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `
          <div class="bg-white text-center py-12 px-5 space-y-5 rounded-lg shadow-sm h-[100%]">
            <h2 class="text-2xl font-bold">${word.word ? word.word : "Word পাওয়া যায়নি"}</h2>
            <p class="text-xl font-medium">Meaning /Pronounciation</p>
            <h2 class="font-bangla text-2xl font-semibold text-[#18181B]">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}</h2>
            <div class="flex justify-between items-center ">
                <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.append(wordDiv)
    })
      manageSpinner(false)

}

const displayLesson = (lessons) => {
    // get the container 
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = "";

    for (let lesson of lessons) {
        // console.log(lesson);
        // create element
        const divBtn = document.createElement("div");
        divBtn.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>
        
        `
        // append 
        levelContainer.append(divBtn);
        // manageSpinner(false)
    }

}
loadLesson()

document.getElementById("btn-search").addEventListener("click", ()=>{
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);
    
})