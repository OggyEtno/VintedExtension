document.body.addEventListener('contextmenu', function (e) {
    const itmBoxContainer = e.target.closest('.new-item-box__container[data-testid]')
    if (!itmBoxContainer) return;

    const dataTestId = itmBoxContainer?.dataset.testid
    const itmId = dataTestId.replace("product-item-id-", "")

    e.preventDefault()
    window.open(`https://www.vinted.fr/items/${itmId}`, '_blank')
})