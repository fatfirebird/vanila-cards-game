import Test from './test'
import '@styles/style'
import '@styles/scss.scss'

document.addEventListener('click', e => {
  e.preventDefault();
  Test.test();
})

const ar = async () => await Promise.resolve('123')

ar().then(console.log)

class E {
  static id = Date.now();
}

console.log(E.id)