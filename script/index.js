const loadLesson = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=> res.json())
    .then(json=>displayLesson(json.data))
}

const displayLesson = (lessons) =>{
    // get the container 
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = "";

    for(let lesson of lessons){
        console.log(lesson);
        // create element
        const divBtn = document.createElement("div");
        divBtn.innerHTML = `
        <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no} </button>
        
        `
        // append 
        levelContainer.append(divBtn);
    }
    
}
loadLesson()