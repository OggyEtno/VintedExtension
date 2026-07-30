function hideAds() {
  document.querySelectorAll('._ads-module-scss-module__WaSmgW__slotContainer').forEach(el => {
    el.style.display = 'none'
  })
}

hideAds()

const observer = new MutationObserver(hideAds)

observer.observe(document.body, {
  childList: true,
  subtree: true
})