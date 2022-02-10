const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
      hello
    </button>
  )
}
 
export default Button;