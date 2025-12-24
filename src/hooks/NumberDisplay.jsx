export default function NumberDisplay( number ) {

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');;
  
}