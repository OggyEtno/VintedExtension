document.body.addEventListener('contextmenu', function (e) {
    const imgOverlay = e.target.closest('.new-item-box__overlay--clickable');
    if (!imgOverlay) return;

    const item = imgOverlay.closest('.feed-grid__item');
    if (!item) return;

    const dataTestId = item.querySelector('.new-item-box__container[data-testid]')?.dataset.testid
    const itmId = dataTestId.replace("product-item-id-", "")

    e.preventDefault();
    window.open(`https://www.vinted.fr/items/${itmId}`, '_blank');
})