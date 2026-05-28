// const sellerId = 187797157
// fetchAllItems(sellerId)

const params = new URLSearchParams(window.location.search);
const sellerId = params.get('sellerId')
const A_sellerItem = JSON.parse(params.get('A_sellerItem'))

displayAllItems(A_sellerItem)

function displayAllItems(A_itm) {
    for (itmIdx in A_itm) {
        addItm(A_itm[itmIdx])
    }
}

function addItm(itm) {
    const item = document.createElement('div')
    item.className = 'itm'

    const label = document.createElement('label')
    label.className = 'itmTitle'
    label.textContent = itm.title
    label.setAttribute('for', itm.id)

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = 'itmCheck'
    checkbox.value = itm.id
    checkbox.id = itm.id

    const img = document.createElement('img')
    img.className = 'itmImg'
    img.src = itm.img

    item.appendChild(label)
    item.appendChild(checkbox)
    item.appendChild(img)

    document.getElementById('itmList').appendChild(item)
}

document.getElementById('buildURL').addEventListener('click', function () {
    const A_itemId = []

    document.querySelectorAll('.itmCheck').forEach((checkbox) => {
        if (checkbox.checked) {
            A_itemId.push(checkbox.value)
        }
    })

    const builtURL = "https://www.vinted.fr/member/" 
        + sellerId 
        + "/bundles/new?item_ids[]=" 
        + A_itemId.join('&item_ids[]=')

    const link = document.getElementById('builtURL')
    link.href = builtURL
    link.textContent = builtURL
})