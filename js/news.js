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
        // console.log(category)
        newDiv.innerHTML = `
        <h6 class="d-inline mx-2 cursor" onClick="singleData('${category.category_id}')">${category.category_name}</h6>
    `
        oldDiv.appendChild(newDiv)

    });


}

const singleData = async id => {

    spineer(true)


    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url)
    const data = await res.json()
        .catch(error => error.console.log("Error"))
    singleDataDisplay(data.data)
    // console.log(data.data)

}

const singleDataDisplay = (data) => {

    const totalData = document.getElementById('total-data')
    totalData.innerHTML = ''
    const h4 = document.createElement('h4')
     h4.innerHTML= `Total Data Found: ${data.length
     }` 
     totalData.appendChild(h4)

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
        <div class="col-md-4 col-sm-12 border-success border d-flex align-items-center">
        <img style = "width:100%" src="${item.image_url}"/>
        </div>
        <div class="col-md-8 col-sm-12 p-4 ">
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
        <button id="modal" type="button" onClick="modal('${item._id}')" class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#newsModal">
                Click Me
            </button>
        </div>

        </div>

        `
        cardContainer.appendChild(newDiv)
        // console.log(item)

    })

    spineer(false)


}


const modal = async id =>{
   const url = `https://openapi.programming-hero.com/api/news/${id}`
   const res = await fetch(url)
   const data = await res.json()
   .catch(error => error.console.log("error")) 
   displayModal(data.data[0])
}

const displayModal = (news) =>{
    console.log(news)
    const title = document.getElementById('newsModalLabel')
    title.innerText = news.title
    const body = document.getElementById('modal-body')
    body.innerHTML = `
    <h4>${news.author.name ? news.author.name : "No Data Found"}</h4>
    <h5>Totall Views: ${news.total_view ? news.total_view : "No Data Found"}</h5>
    <h5>Rating: ${news.rating.number}</h5>
    <h5>Badge: ${news.rating.badge}</h5>
    `
}



const spineer = (loading) =>{
    const spin = document.getElementById('loader')
    if(loading){
        spin.classList.remove('d-none')
    }
    else {
        spin.classList.add('d-none')
    }
}