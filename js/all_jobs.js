//Start Home
let current_arr = [];
let fav_arr = JSON.parse(localStorage.getItem('favorites')) || [];
main = document.querySelector("#main");
home = document.querySelector("#home");
favorites = document.querySelector("#favorites");

home.addEventListener('click', () => {
    main.innerHTML = '';
    main.innerHTML += `<div class="row">
    <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
        <div class="custom-div">
            <h2>Wellcome to our jobs search service</h2>
            <p>To use our service all what you need is a good heart and some skills 🤯</p>
            <br>
            <hr>
            <h7>Enjoy</h7>
        </div>
    </div>
</div>
</div>`
})
//End Home 


//Start All Jobs 
main = document.querySelector("#main");
jobs = document.querySelector("#jobs");
// let jobs_arr;

function getJobs() {
    const url = "https://remotive.com/api/remote-jobs?limit=50";
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            current_arr = data.jobs
            buildJobs(current_arr);
            // console.log(jobs_arr)
        })
        .catch((err) => console.log(err))
}




function buildJobs(arr) {
    main.innerHTML = '';
    arr.forEach((job, index) => {
        if (inStorage(job.id)) {
            main.innerHTML += `<div class="card" style="width: 18rem;">
    <div class="card-header w-100">
    Company Name: ${job.company_name}
    </div>
    <div class="img">
    <img src="${job.company_logo}" class="card-img-top" alt="...">
    </div>
    <div class="card-body">
    <h5 class="card-title">${job.title}</h5>
    <p class="card-text">Salary: ${job.salary}</p>
    <div class="overflow-auto" style="max-height: 200px; max-width: 250px;">
    <p class="card-text">${job.description}</p>
    </div>
    <div class="card-body d-flex justify-content-around  gap-4">
    <button href="#" class="btn btn-secondary" id="removeBtn${index}" onclick="removeCard('${index}')">Remove</button>
    <button href="#" class="btn btn-danger">See this JOB</button>
    </div>
    </div>
    <div class="card-footer text-body-secondary w-100">
    type:${job.job_type}
    </div>
    </div>`
        }
    else{
            main.innerHTML += `<div class="card" style="width: 18rem;">
    <div class="card-header w-100">
    Company Name: ${job.company_name}
    </div>
    <div class="img">
    <img src="${job.company_logo}" class="card-img-top" alt="...">
    </div>
    <div class="card-body">
    <h5 class="card-title">${job.title}</h5>
    <p class="card-text">Salary: ${job.salary}</p>
    <div class="overflow-auto" style="max-height: 200px; max-width: 250px;">
    <p class="card-text">${job.description}</p>
    </div>
    <div class="card-body d-flex justify-content-around  gap-4">
    <button href="#" class="btn btn-primary" id="saveBtn${index}" onclick="saveBtn('${index}')">Save this JOB</button>
    <button href="#" class="btn btn-danger">See this JOB</button>
    </div>
    </div>
    <div class="card-footer text-body-secondary w-100">
    type:${job.job_type}
    </div>
    </div>`}
    });
}


jobs.addEventListener('click', () => {
    getJobs();
})



function saveBtn(idb) {
    addToFav(idb);
    const saveBtn = document.querySelector(`#saveBtn${idb}`);
    const removeBtn = document.createElement("button");
    removeBtn.id = `removeBtn${idb}`;
    removeBtn.classList.add("btn", "btn-secondary");
    removeBtn.innerHTML = "Remove";
    removeBtn.onclick = () => removeCard();
    saveBtn.replaceWith(removeBtn);

}

function removeCard(index) { 
    fav_arr.splice(index, 1)
    localStorage.setItem('favorites', JSON.stringify(fav_arr))
    fav_arr = JSON.parse(localStorage.getItem('favorites') || [])
    current_arr = fav_arr
    buildJobs(fav_arr)
};




function addToFav(idb) {
    fav_arr.push(current_arr[idb]);
    localStorage.setItem('favorites', JSON.stringify(fav_arr))
}

//End All Jobs 




//Start Categories 
category = document.querySelector("#category");
ul = document.querySelector("#ul");
let categories_arr;
let jobCat_arr;


function getCategories() {
    const cat_url = "https://remotive.com/api/remote-jobs/categories";
    fetch(cat_url)
        .then((res) => res.json())
        .then((data) => {
            categories_arr = data.jobs
            buildCategories()
        })
        .catch((err) => console.log(err))
}


function buildCategories() {
    ul.innerHTML = '';
    categories_arr.forEach(cat => {
        ul.innerHTML += `<li><a class="dropdown-item" onclick="buildPageByCat('${cat.slug}')">${cat.slug}</a></li>`
    });
}
getCategories();


function getJobCat() {
    fetch(jobByCat_url)
        .then((res) => res.json())
        .then((data) => {
            current_arr = data.jobs
            buildCategories()
        })
        .catch((err) => console.log(err))
}


function buildPageByCat(catSlug) {
    const jobCat_url = `https://remotive.com/api/remote-jobs?category=${catSlug}&limit=10`;
    fetch(jobCat_url)
        .then((res) => res.json())
        .then((data) => {
            current_arr = data.jobs
            buildJobs(current_arr);
        })
        .catch((err) => console.log(err))
}

function inStorage(jobId) {
    let flag = false
    fav_arr.forEach(element => {
        if (element.id == jobId) {
            flag = true
        }   
    });
    return flag
}
//End Categories


//saved / favorites
favorites.addEventListener('click', () => {
    current_arr = fav_arr
    buildJobs(fav_arr)
})






















// <div class="justify-content space-between">
// getJobs()






// function buildJobs(){
//     jobs_arr.forEach(job => {
//     // main.innerHTML = '<div class="col-lg-8 col-md-10 col-sm-12 mx-auto"></div>';
//     main.innerHTML += `<div class="container">
//     <div class="row">
//       <div class="col-lg-4 col-md-6 col-sm-12">
//         <div class="card" style="width: 18rem;">
//           <img src="${job.company_logo}" class="card-img-top" alt="...">
//           <div class="card-body">
//             <h5 class="card-title">${job.category}</h5>
//             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//             <a href="#" class="btn btn-primary">Go somewhere</a>
//           </div>
//         </div>
//       </div>
//       </div>
//   `
//     });
// }