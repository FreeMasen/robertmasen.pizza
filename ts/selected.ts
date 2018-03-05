
function updateButtons(id: string) {
    let buttons = document.querySelectorAll('.nav-link');
    for (var i = 0; i < buttons.length; i++) {
        var el = buttons[i];
        if (el.getAttribute('id') == id) {
            addClass(el, 'selected');
        } else {
            removeClass(el, 'selected');
        }
    }
}

function addClass(el, name) {
    if (!el) return;
    var currentClass = el.getAttribute('class');
    if (!currentClass) currentClass = '';
    var classList = currentClass.split(' ');
    if (classList.indexOf(name) > -1) return console.log('already selected');
    classList.push(name);
    el.setAttribute('class', classList.filter(c => c.length > 0).join(' '));
}

function removeClass(el, name) {
    if (!el) return;
    var currentClass = el.getAttribute('class');
    if (!currentClass) return;
    var classList = currentClass.split(' ');
    var i = classList.indexOf(name)
    if (i < 0) return;
    classList.splice(i, 1);
    el.setAttribute('class', classList.filter(c => c.length > 0).join(' '));
}