document.body.innerHTML = initialContent;
window.addEventListener('message', e => {
    if (!('content' in e.data)) return;
    document.body.innerHTML = e.data.content;
});
