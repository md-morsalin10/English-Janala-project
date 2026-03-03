const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data))
}
const loadLevelWord = (id)=>{
    let url = `https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url);
    fetch (url)
    .then(res=> res.json())
    .then(data=> displayWord(data.data));
}
// {
//     "id": 5,
//     "level": 1,
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার"
// }
const displayWord = (words) =>{
    console.log(words);
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    words.forEach(word =>{
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `
          <div class="bg-white text-center py-12 px-5 space-y-5 rounded-lg shadow-sm">
            <h2 class="text-3xl font-bold">${word.word}</h2>
            <p class="text-xl font-medium">Meaning /Pronounciation</p>
            <h2 class="font-bangla text-3xl font-semibold text-[#18181B]">${word.meaning} /${word.pronunciation}</h2>
            <div class="flex justify-between items-center ">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
     wordContainer.append(wordDiv)
    })
    
}

const displayLesson = (lessons) => {
    // get the container 
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = "";

    for (let lesson of lessons) {
        console.log(lesson);
        // create element
        const divBtn = document.createElement("div");
        divBtn.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>
        
        `
        // append 
        levelContainer.append(divBtn);
    }

}
loadLesson()