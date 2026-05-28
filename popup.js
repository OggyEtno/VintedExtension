const keywordsContainer = document.getElementById('keywordsContainer')

function createKeywordRow(keyword = '') {
    const row = document.createElement('div')
    row.className = 'keyword-row'

    const input = document.createElement('input')
    input.type = 'text'
    input.className = 'keyword-input'
    input.value = keyword
    input.placeholder = 'Mot-clé'

    const removeBtn = document.createElement('button')
    removeBtn.textContent = 'X'
    removeBtn.className = 'remove-btn'

    removeBtn.addEventListener('click', () => {
        row.remove()
    })

    row.appendChild(input)
    row.appendChild(removeBtn)

    keywordsContainer.appendChild(row)
}

function saveKeywords() {
    const A_keyword = []

    document.querySelectorAll('.keyword-input').forEach(input => {
        const keyword = input.value.trim()

        if (keyword !== '') {
            A_keyword.push(keyword)
        }
    })

    chrome.storage.local.set({A_keyword: A_keyword})
}

function loadKeywords() {
    chrome.storage.local.get('A_keyword', result => {
        keywordsContainer.innerHTML = ''

        const A_keyword = result.A_keyword || []

        if (A_keyword.length === 0) {
            createKeywordRow()
            return
        }

        A_keyword.forEach(keyword => {
            createKeywordRow(keyword)
        })
    })
}

document.getElementById('addBtn').addEventListener('click', () => { createKeywordRow() })
document.getElementById('saveKeywordsBtn').addEventListener("click", saveKeywords)

async function setDefaultKeywordsInStorage() {
    if ((await chrome.storage.local.get('A_keyword')).A_keyword === undefined) {
        await chrome.storage.local.set({
            A_keyword: [
                'pif', 'hercule',
                'placid', 'muzo',
                'leo',
                'dicentim',
                'totoche',
                'arthur',
                'poche',
                'vaillant'
            ]
        })
    }
}

setDefaultKeywordsInStorage()
    .then(loadKeywords)