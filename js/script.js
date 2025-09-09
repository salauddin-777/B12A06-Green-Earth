const ulCategories = document.getElementById('ul-categories');
const showPlants = document.getElementById('show-plants');
const youCartContainer = document.getElementById('your-cart-container');
const totalPriceContainer = document.getElementById('total-price-container');
let totalPrice = 0;

const loadCategories = () =>{
    const url = 'https://openapi.programming-hero.com/api/categories';
    fetch(url)
    .then(res=>res.json())
    .then(data => {
        showCategories(data.categories)
    })
}

const loadPlants = (id) =>{
    showLoading();
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data=>{
        showPlantsSection(data.plants);
        
    })
    .finally(() => {
            hideLoading();
        });
    
}


const showPlantsSection = (plants) =>{
    showPlants.innerHTML = '';
    plants.forEach(plant =>{
        console.log(plant);
        
        showPlants.innerHTML += `
           <div class=" shadow-xl p-3 m-3 space-y-4">
                    <img class="rounded-sm md:w-77 md:h-72" src="${plant.image}" alt="">
                    <h2 onclick = "loadTreeModal(${plant.id})" class="font-bold text-xl ">${plant.name}</h2>
                    <p>${plant.description}</p>
                    <div class="flex justify-between items-center">
                        <h4 class="text-green-600 bg-[#cff0dc] p-2 rounded-lg">${plant.category}</h4>
                        <h2><i class="fa-solid fa-bangladeshi-taka-sign"></i> <span>${plant.price}</span></h2>
                    </div>
                    <button onclick = "yourCartLoader(${plant.id})" class="btn text-white bg-[#15803d] sm:flex-wrap w-full rounded-2xl">Add to Cart</button>
                </div> 
        `
    })
}

const allTrees = (id) =>{
    showLoading();
    const url = 'https://openapi.programming-hero.com/api/plants';
    fetch(url)
    .then(res=> res.json())
    .then(data=>{
        allTreesShow(data.plants);
    })
    .finally(()=>{
        hideLoading();
    })
}

const allTreesShow =(trees) =>{
    showPlants.innerHTML = '';
    trees.forEach(tree =>{
        showPlants.innerHTML += `
           <div class="  shadow-xl p-3 m-3 space-y-4 image-container ">
                    <img class="rounded-sm md:w-77 md:h-72" src="${tree.image}" alt="">
                    <h2 onclick ="loadTreeModal(${tree.id})" class="font-bold text-xl ">${tree.name }</h2>
                    <p>${tree.description}</p>
                    <div class="flex justify-between items-center">
                        <h4 class="text-green-600 bg-[#cff0dc] p-2 rounded-lg">${tree.category}</h4>
                        <h2><i class="fa-solid fa-bangladeshi-taka-sign"></i> <span class = "font-bold text-green-700">${tree.price}</span></h2>
                    </div>
                    <button onclick ="yourCartLoader(${tree.id})" class="btn text-white bg-[#15803d] sm:flex-wrap w-full rounded-2xl">Add to Cart</button>
                </div> 
        `
    })
}

const loadTreeModal = async (id)=>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const res = await fetch(url);
    const details = await res.json()
    showTreeModal(details.plants); 
}

const showTreeModal = (tree)=>{
    console.log(tree);
    const detailsBox = document.getElementById('details-container')
    detailsBox.innerHTML = `
    <div class = "space-y-3">
        <h2 class="font-bold text-2xl">${tree.name}</h2>
        <img class = "md:w-[100%] md:h-72"" src="${tree.image}" alt="">
        <h3 ><span class = "font-bold">Category : </span> ${tree.category} </h3>
        <h3><span class = "font-bold">Price</span><i class="fa-solid fa-bangladeshi-taka-sign"></i> <span class = "">${tree.price}</span></h3>
        <p class = "md:w-100%" ><span class = "font-bold">Description: </span>: ${tree.description}</p>
    </div>
    `
    document.getElementById('tree_modal').showModal();
}


const showCategories = (categories) =>{
    categories.forEach(cat =>{
        ulCategories.innerHTML += `  
            <li onclick = 'loadPlants(${cat.id})' class="category-item font-medium text-lg hover:bg-[#15803d] hover:text-white rounded-lg p-2 ">${cat.category_name}</li>
        `
    })
    ulCategories.addEventListener('click',(e)=>{
        const allLi = document.querySelectorAll('li');

        allLi.forEach(li=>{
            li.classList.remove('bg-[#15803d]', 'text-white' )
        })
        if(e.target.localName === 'li'){
            e.target.classList.add('bg-[#15803d]', 'text-white' )
        }
    })
}

const yourCartLoader = (id) =>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
    .then(res=> res.json())
    .then(data=>{
        yourCart(data.plants);
    })
}

const yourCart = (detail) =>{
    // alert('Adding card  ')
    const price = Number(detail.price) || 0;
    const uniqueId = `cart-item-${detail.id}-${Date.now()}`;
    youCartContainer.innerHTML += `
            <div id="${uniqueId}" class = "my-5 bg-[#f0fcf4] rounded-2xl  mx-2 p-2">
                <h2>${detail.name}</h2>
                <div class="flex justify-between mx-2 my-3">
                  <h3><i class="fa-solid fa-bangladeshi-taka-sign"></i>${detail.price} X 1</h3>
                   <h3 onclick="removeFromCart('${uniqueId}', ${price})" 
                    class="cursor-pointer text-red-600 font-bold">X</h3>
                </div>
              </div>
    `
    totalPrice += price;
    document.getElementById("total-price").innerText = totalPrice;
}

const removeFromCart = (itemId, price) => {
    const item = document.getElementById(itemId);
    if (item) {
        item.remove();
    }

    totalPrice -= price;
    document.getElementById("total-price").innerText = totalPrice;
}

const showLoading = () =>{
    document.getElementById('loading-spinner').classList.remove('hidden');

}
const hideLoading = () =>{
    document.getElementById('loading-spinner').classList.add('hidden');
}

allTrees();
loadCategories();