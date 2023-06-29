function removeElem(obj) {
    if (!obj?.elem) return
    if (playground.elem.contains(obj.elem)) {
        playground.elem.removeChild(obj.elem)
        obj.elem = null
    }
}

function createElem(obj, name, transform, append = true) {
    obj.elem = document.createElement('div');
    obj.elem.className = name;
    obj.elem.id = name;

    if (transform) {
        obj.elem.style.transform = transform;
    }

    if (append) {
        playground.elem.appendChild(obj.elem);
    }
}

function createTextElem(text, id, className, elemType) {
    const textElem = document.createElement(elemType);
    textElem.textContent = text
    textElem.className = className;
    textElem.id = id;

    return textElem
}

function createMenuScreen(id, elems) {
    const divElem = document.createElement('div')
    divElem.className = 'absolute-centered flex-col'
    divElem.id = id

    elems.forEach(elem => {
        divElem.appendChild(elem)
    })
    playground.elem.appendChild(divElem)
    return divElem
}

function cleanUpSingleArr(arr) {
    arr.forEach(elem => {
        if (elem?.elem) {
            removeElem(elem)
        }
    })
}

function randNbr(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function selectLanguage(lang) {
    removeMenu(document.querySelector("#languagescreen"))
    language = lang
    console.log("onclick triggered with lang:", language)
    showStartMenu()
}

function removeMenu(obj) {
    console.log("removeMenu triggered with:", obj)
    if (!obj) return
    if (playground.elem.contains(obj)) {
        playground.elem.removeChild(obj)
        obj = null
        console.log("removeMenu success")
    }
}