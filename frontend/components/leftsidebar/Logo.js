import {
    LogoContainer,
    LogoImage,
} from './styled'

const Logo = () => {

    return (
        <LogoContainer>
            <a href="https://github.com/anthopark/Anteater-Pathway" target="_blank">
                <LogoImage src="/logo.svg"></LogoImage>
            </a>

        </LogoContainer>
    );
}

export default Logo;