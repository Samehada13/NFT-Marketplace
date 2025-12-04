import { useRouter } from 'next/router';

import Style from './Button.module.css';
const ButtonVariant = {
    primary: 'primary',
    secondary: 'secondary',
    danger: 'danger',
    success: 'success',
    warning: 'warning',
    info: 'info',
    light: 'light',
    dark: 'dark',
    link: 'link',
}
const Button = ({btnName, handleClick, icon, className = '', variant = 'primary' }) => {
  const router = useRouter();
  
  return (
    <div className={Style.box}>
      <button className={`button button-${ButtonVariant[variant]} ${className}`} onClick={()=> handleClick()}>
        {icon} {btnName}
      </button>
    </div>
  )
}

export default Button