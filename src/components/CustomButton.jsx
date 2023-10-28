
const CustomButton = ({nameType, selector, click, text}) => {
  return (
    <button type={nameType} className={selector} onClick={click}>{text}</button>
  )
}

export default CustomButton