
const CustomButton = ({nameType, selector, click, text, style}) => {
  return (
    <button type={nameType} className={selector} onClick={click} style={style}>{text}</button>
  )
}

export default CustomButton