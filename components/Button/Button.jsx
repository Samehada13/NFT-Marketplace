import { useRouter } from 'next/router';

import Style from './Button.module.css';

const Button = ({btnName, handleClick, icon, classStyle}) => {
  const router = useRouter();
  
  return (
    <div className={Style.box}>
      <button className={`button-primary`} onClick={()=> handleClick()}>
        {icon} {btnName}
      </button>
    </div>
  )
}

export default Button