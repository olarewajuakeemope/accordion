import './styles/main.css'

const CONTENT_URL = 'http://design.propcom.co.uk/buildtest/accordion-data.json'
const xhr = new XMLHttpRequest()

const clearSelected = () => {
  const selected = document.querySelector('li.selected')
  if (selected) {
    selected.classList.remove('selected')
  }
}

const handleClick = e => {
  const listEl = e.target.parentNode
  if (listEl.classList.contains('selected')) {
    listEl.classList.remove('selected')
  } else {
    clearSelected()
    listEl.classList.add('selected')
  }
}

const composeTemplate = ({heading, content}) => (
  `<h2>
    ${heading}
    <span></span>
   </h2>
   <p>${content}</p>`
)

const reqListener = e => {
  const accordionWrapper = document.getElementById('accordion')
  const res = JSON.parse(e.target.response)

  res.blocks.forEach(block => {
    const listEl = document.createElement('li')
    listEl.innerHTML = composeTemplate(block)
    listEl.querySelector('h2').onclick = handleClick
    accordionWrapper.appendChild(listEl)
  })
}

// we need this to avoid FOUC
document.getElementById('container').style.display = 'block'

xhr.addEventListener('load', reqListener)
xhr.open('GET', CONTENT_URL)
xhr.send()
