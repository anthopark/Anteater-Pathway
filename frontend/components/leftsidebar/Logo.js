import {
    LogoContainer,
    LogoImage,
    LogoHeading,
    LogoTextSpan,
} from './styled'

const Logo = () => {

    return (
        <LogoContainer>
            <LogoImage src="/logo.svg"></LogoImage>
            <LogoHeading>
                <LogoTextSpan
                    align='left'
                >
                    Anteater
                </LogoTextSpan>
                <LogoTextSpan
                    align='right'
                    emphasis
                >
                    Pathway
                </LogoTextSpan>
            </LogoHeading>

        </LogoContainer>
    );
}

export default Logo;