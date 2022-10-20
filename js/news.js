const loadData = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url)
    const data = await res.json()
        .catch(error => error.console.log('data does not loaded'))
    displayCategoryData(data.data.news_category)
}
loadData()

const displayCategoryData = (item) => {
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

const singleData = async id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url)
    const data = await res.json()
        .catch(error => error.console.log("Error"))
    singleDataDisplay(data.data)
    console.log(data.data)

}

const singleDataDisplay = (data) => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ''
    console.log(data)
    data.forEach(item => {
        console.log(item)
        const newDiv = document.createElement('div')
        newDiv.classList.add('row')
        newDiv.classList.add('my-4')
        newDiv.classList.add('border')
        newDiv.classList.add('border-success')
        newDiv.innerHTML = `
        <div class="col-4 border-success border d-flex align-items-center">
        <img style = "width:100%" src="${item.image_url}"/>
        </div>
        <div class="col-8 p-4 ">
        <h5>${item.title}</h5>
        <p>${item.details.slice(0, 300)}</p>

        
        <div class="row">
            <div class="col-6">
                    <div class="d-flex align-items-center justify-content-center">
                    <img style="width:24%; border-radius:50px" src="${item.author.img}"/>
                    <div>
                    <h6 class="me-5">${item.author.name}</h6>
                    <p>${item.author.published_date}</p>
                    </div>
            </div>
        </div>
        <div class="col-6 d-flex align-items-center">
            <p>${item.total_view}M</p>
        </div>
        <button class="btn btn-primary mt-3">Click Me</button>
        </div>

        </div>

        `
        cardContainer.appendChild(newDiv)


    })

}