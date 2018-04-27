import './styles/main.css'

const CONTENT_URL = 'http://design.propcom.co.uk/buildtest/accordion-data.json'
const oReq = new XMLHttpRequest()

const handleClick = e => {
  const accordion = e.target.parentNode
  if (accordion.classList.contains('selected')) {
    accordion.classList.remove('selected')
  } else {
    const selected = document.querySelector('.selected')
    if (selected) {
      selected.classList.remove('selected')
    }
    accordion.classList.add('selected')
  }
}

const reqListener = e => {
  const accordionWrapper = document.getElementById('accordion')
  const res = JSON.parse(e.target.response)
  res.blocks.forEach(block => {
    const li = document.createElement('li')
    const span = document.createElement('span')
    const p = document.createElement('p')
    const h2 = document.createElement('h2')

    h2.innerText = block.heading
    p.innerText = block.content
    li.onclick = handleClick

    h2.appendChild(span)
    li.appendChild(h2)
    li.appendChild(p)
    accordionWrapper.appendChild(li)
  })
}

// this is to avoid FOUC
document.getElementById('container').style.display = 'block'

oReq.addEventListener('load', reqListener)
oReq.open('GET', CONTENT_URL)
oReq.send()
