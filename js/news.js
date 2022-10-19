const loadData = async () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url)
    const data = await res.json()
    .catch(error => error.console.log('data does not loaded'))
    displayCategoryData(data.data.news_category)
}
loadData()

const displayCategoryData = (item) =>{
    const oldDiv = document.getElementById('c-div')

item.forEach(category => {
    const newDiv = document.createElement('div')
    newDiv.classList.add('d-inline')
    console.log(category)
    newDiv.innerHTML = `
        <h6 class="d-inline mx-2 cursor" onClick="singleData('${category.category_id}')">${category.category_name}</h6>
    `
    oldDiv.appendChild(newDiv)

    });

}

const singleData = async id =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url)
    const data = await res.json()
    .catch(error => error.console.log("Error"))
    console.log(data.data)

}

