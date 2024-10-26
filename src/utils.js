export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}


export let typed = new Typed('#adviceString', { // Тут id того блока, в которм будет анимация
  stringsElement: '#typed-strings', // Тут id блока из которого берем строки для анимации
  typeSpeed: 100, // Скорость печати
  startDelay: 500, // Задержка перед стартом анимации
  backSpeed: 50, // Скорость удаления
  loop: true // Указываем, повторять ли анимацию
});
