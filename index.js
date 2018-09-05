let content = `
  { hey } hello woot mate <boo> what { moo } what { coo } what { doo } what { poo } pop
`
const popAt = [1.22, 2.22, 3.22, 4.22, 5.22, 6.22, 7.22, 8.22]

content = content.replace(/</g, '<span class="black underline">')
content = content.replace(/>/g, '</span>')
content = content.replace(/{/g, '<span class="black">')
content = content.replace(/}/g, '</span>')
console.log(content)

const textContainer = document.querySelector('.text-container')
const poppedWord = document.querySelector('.pop')
let blacks = null

function addContent (content) {
  textContainer.innerHTML = `<p>${content}</p>`
  blacks = document.querySelectorAll('.black')
}

addContent(content)

let poppedCounter = 0
let lastInterval = null
let lastElem = null
function popNext () {
  if (poppedCounter === blacks.length) return

  const elem = blacks[poppedCounter++]
  if (elem) {
    elem.classList.add('pop')
  }
  if (lastInterval) {
    if (lastElem.classList.contains('pop')) {
      lastElem.classList.remove('pop')
    }
    clearInterval(lastInterval)
  }
  lastInterval = setInterval(function () {
    if (elem.classList.contains('pop')) {
      elem.classList.remove('pop')
    }
  }, 1000)
  lastElem = elem
}

function startAnimation () {
  let old = Date.now()
  popAt.reverse()
  requestAnimationFrame(maybePaint)

  function maybePaint () {
    const now = Date.now()
    const diff = (now - old) / 1000
    const lastIndex = popAt.length - 1
    if (diff > popAt[lastIndex]) {
      popNext()
      popAt.pop()
    }

    if (popAt[0]) requestAnimationFrame(maybePaint)
  }
}

startAnimation()
