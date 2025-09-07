const ulCategories = document.getElementById('ul-categories');
const showPlants = document.getElementById('show-plants');

const loadCategories = () =>{
    const url = 'https://openapi.programming-hero.com/api/categories';
    fetch(url)
    .then(res=>res.json())
    .then(data => {
        showCategories(data.categories)
    })
}

const loadPlants = (id) =>{
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data=>{
        showPlantsSection(data.plants);
        
    })
}


const showPlantsSection = (plants) =>{
    showPlants.innerHTML = '';
    plants.forEach(plant =>{
        console.log(plant);
        
        showPlants.innerHTML += `
           <div class=" shadow-xl p-3 m-3 space-y-4">
                    <img class="rounded-sm " src="${plant.image}" alt="">
                    <h2 class="font-bold text-xl">${plant.name}</h2>
                    <p>${plant.description}</p>
                    <div class="flex justify-between items-center">
                        <h4 class="text-green-600 bg-[#cff0dc] p-2 rounded-lg">Fruit Tree</h4>
                        <h2><i class="fa-solid fa-bangladeshi-taka-sign"></i> <span>${plant.price}</span></h2>
                    </div>
                    <button class="btn text-white bg-[#15803d] sm:flex-wrap w-full rounded-2xl">Add to Cart</button>
                </div> 
        `
    })
}

const allTrees = (id) =>{
    const url = 'https://openapi.programming-hero.com/api/plants';
    fetch(url)
    .then(res=> res.json())
    .then(data=>{
        allTreesShow(data.plants);
    })
}

const allTreesShow =(trees) =>{
    showPlants.innerHTML = '';
    trees.forEach(tree =>{
        showPlants.innerHTML += `
           <div class=" shadow-xl p-3 m-3 space-y-4 image-container ">
                    <img class="rounded-sm " src="${tree.image}" alt="">
                    <h2 class="font-bold text-xl">${tree.name}</h2>
                    <p>${tree.description}</p>
                    <div class="flex justify-between items-center">
                        <h4 class="text-green-600 bg-[#cff0dc] p-2 rounded-lg">Fruit Tree</h4>
                        <h2><i class="fa-solid fa-bangladeshi-taka-sign"></i> <span>${tree.price}</span></h2>
                    </div>
                    <button class="btn text-white bg-[#15803d] sm:flex-wrap w-full rounded-2xl">Add to Cart</button>
                </div> 
        `
    })
}



const showCategories = (categories) =>{
    categories.forEach(cat =>{
        ulCategories.innerHTML += `
            
            <li onclick = 'loadPlants(${cat.id})' class="font-medium text-lg hover:bg-[#15803d] hover:text-white rounded-lg p-2 ">${cat.category_name}</li>
        `
    })
}
loadCategories();