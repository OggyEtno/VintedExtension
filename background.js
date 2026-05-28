// Force Vinted bundle to select all chosen items
// by loading all of them at once
chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1], // éviter doublons
    addRules: [{
      id: 1,
      priority: 1,
      action: {
        type: "redirect",
        redirect: {
          transform: {
            queryTransform: {
              addOrReplaceParams: [
                { key: "per_page", value: "9999" }
              ]
            }
          }
        }
      },
      condition: {
        urlFilter: "vinted.fr/api/v2/bundles/items",
        resourceTypes: ["xmlhttprequest"]
      }
    }]
  })
})