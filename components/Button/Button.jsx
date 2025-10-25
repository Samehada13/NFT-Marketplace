import { useRouter } from 'next/router';

import Style from './Button.module.css';

const Button = ({btnName, handleClick, icon, className = '', variant = 'primary' }) => {
  const router = useRouter();
  
  return (
    <div className={Style.box}>
      <button className={`button button-${variant} ${className}`} onClick={()=> handleClick()}>
        {icon} {btnName}
      </button>
    </div>
  )
}

export default Button