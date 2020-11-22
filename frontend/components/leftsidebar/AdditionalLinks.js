import {
    AdditionalLinksContainer,
    LinkBox,
    IconLink,
    SvgImage,
    gitHubIconStyle,
    LinkText,
} from './styled';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdditionalLinks = () => {
    return (
        <AdditionalLinksContainer>
            <LinkBox>
                <IconLink href="https://github.com/anthopark/Anteater-Pathway" target="_blank">
                    <FontAwesomeIcon icon={faGithub} style={gitHubIconStyle} />
                    <LinkText paddingLeft={'1.7rem'}>
                        Contribute
                    </LinkText>
                </IconLink>
            </LinkBox>
            <LinkBox>
                <IconLink href="/">
                    <SvgImage src='./bobame.svg' />
                    <LinkText paddingLeft={'2.5rem'}>
                        Boba me
                    </LinkText>
                </IconLink>
            </LinkBox>
        </AdditionalLinksContainer>
    );
}

export default AdditionalLinks;