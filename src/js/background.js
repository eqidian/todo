var id = chrome.runtime.id;
var todoUrl = 'chrome-extension://' + id + '/popup.html';

// 浏览器
// chrome.browserAction.onClicked.addListener(function() {
//     chrome.tabs.create({
//         url: todoUrl,
//         selected: true
//     })
// })

// 新开窗口打开tudo页面
chrome.tabs.onCreated.addListener(function(newTab) {
    chrome.tabs.executeScript(newTab.id, {
        code: 'location.href = "' + todoUrl + '"'
    });
})