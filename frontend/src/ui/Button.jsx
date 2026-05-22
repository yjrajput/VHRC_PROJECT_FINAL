


const Button = ({ styles, children, onClick}) => {


  
  return (
    <button onClick={onClick} className={`${styles} active:shadow-md active:scale-95 text-white  px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-mediu cursor-pointer`}>
        {children}
    </button>
  )
}

export default Button