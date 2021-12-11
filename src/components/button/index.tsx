
import './style.scss'

interface ButtonProps {
    containerClass?: string;
    disabled?: boolean;
    onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <>
            <div
                className={`button ${props.containerClass}`}
                onClick={props.onClick}
            >
                <span>{children}</span>
            </div>
        </>
    )
}

export default Button;