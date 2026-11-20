(() => {
  const originalOpen = XMLHttpRequest.prototype.open
  const originalSend = XMLHttpRequest.prototype.send

  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    this._vintedUrl = url
    this._vintedMethod = method

    return originalOpen.call(this, method, url, ...args)
  }

  XMLHttpRequest.prototype.send = function(body) {
    if (
      this._vintedUrl?.includes("/messaging/bundles/items") &&
      this._vintedMethod?.toUpperCase() === "POST"
    ) {
      try {
        body = JSON.parse(body)
        body.per_page = 9999
        body = JSON.stringify(body)
      } catch (error) {
        console.warn("[Vinted] Body JSON non reconnu", error)
      }
    }

    return originalSend.call(this, body)
  }
})()