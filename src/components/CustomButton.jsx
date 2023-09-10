
const CustomButton = ({selector, click, text}) => {
  return (
    <button className={selector} onClick={click}>{text}</button>
  )
}

export default CustomButton