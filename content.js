async function createBundle() {
    const nbItems = parseInt(
        document.querySelector('.web_ui__Text__text.web_ui__Text__title.web_ui__Text__left')?.textContent
    ) // Useless
    const A_keyword = (await chrome.storage.local.get('A_keyword')).A_keyword
    const sellerId = getSellerId()
    if (sellerId === null) {
        alert('Aucun vendeur id trouvé')
        return
    }

    fetchSellerItems(sellerId, nbItems, A_keyword, displayItemsBundle)

    function getSellerId() {
        if (window.location.pathname.match(/items\/\d+/)) {
            const A_memberLink = document.querySelectorAll('a[href^="/member/"]')
            for (let memberLink of A_memberLink) {
                let sellerIdMatches = memberLink.getAttribute("href").match(/\d+/)
                if (sellerIdMatches !== null) {
                    return sellerIdMatches[0]
                }
            }

            return null
        } else {
            return window.location.pathname.match(/\/member\/(\d+)/)[1]
        }
    }

    function normalize(str) {
        return str
            .normalize("NFD")                // sépare accents
            .replace(/[\u0300-\u036f]/g, "") // supprime accents
            .toLowerCase()
    }

    function hasKeyword(str, A_keyword) {
        const normalizedStr = normalize(str)

        return A_keyword.some(kw => 
            normalizedStr.includes(normalize(kw))
        )
    }

    function fetchSellerItems(sellerId, nbItems, A_keyword, callback) {
        const url = new URL("https://www.vinted.fr/api/v2/bundles/items")

        url.searchParams.append('user_id', sellerId)
        url.searchParams.append('page', 1)
        url.searchParams.append('per_page', nbItems)    // Overwritten by background.js

        fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau')
            }
            return response.json()
        })
        .then(response => {
            let A_sellerItem = []

            for (let itm of response.items) {
                if (hasKeyword(itm.title, A_keyword)) {
                    A_sellerItem.push(itm.id)
                }
            }

            // Manage 100+ itm limit
            if (A_sellerItem.length >= 100) {
                A_sellerItem = []

                for (let itm of response.items) {
                    if (hasKeyword(itm.title, A_keyword)) {
                        A_sellerItem.push({
                            id : itm.id,
                            title : itm.title,
                            img : itm.photos[0].full_size_url
                        })
                    }
                }

                window.location.href = chrome.runtime.getURL(
                    'filterItemsList.html?sellerId=' + sellerId + '&A_sellerItem=' + encodeURIComponent(JSON.stringify(A_sellerItem))
                )
                // alert(A_sellerItem.length + ' articles in console.log')
                // console.log(A_sellerItem)
                return
            }

            callback(A_sellerItem, sellerId)
        })
        .catch(error => {
            console.error('Erreur :', error)
        })
    }

    function displayItemsBundle(A_item, sellerId) {
        if (A_item.length <= 0) {
            alert('Rien trouvé !')
            return
        }

        window.location.href = 'https://www.vinted.fr/member/' + sellerId + '/bundles/new?item_ids[]=' + A_item.join('&item_ids[]=')
        // window.location.href += "/bundles/new?item_ids[]=" + A_item.join('&item_ids[]=')
    }
}

function createExtPanel() {
    const extPanel = document.createElement("div")
    extPanel.id = "vinted-extension-extPanel"

    fetch(chrome.runtime.getURL("extPanel.html"))
        .then(res => res.text())
        .then(html => {
            extPanel.innerHTML = html
            document.body.appendChild(extPanel)

            document.getElementById("createBundle").addEventListener("click", function () {
                this.textContent = 'Lot en cours...'
                this.style.backgroundColor = 'rgb(227 127 3)'

                createBundle()
            })
        })
}

createExtPanel()
