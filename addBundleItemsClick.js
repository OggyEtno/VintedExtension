document.body.addEventListener('contextmenu', function (e) {
    const itmBoxContainer = e.target.closest('[data-testid^="product-item-id-"]')
    if (!itmBoxContainer) return;

    const dataTestId = itmBoxContainer?.dataset.testid
    const itmId = dataTestId.replace("product-item-id-", "")

    e.preventDefault()
    window.open(`https://www.vinted.fr/items/${itmId}`, '_blank')
})