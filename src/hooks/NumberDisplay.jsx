export default function NumberDisplay( number ) {
    console.log(number)
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');;
  
}