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
                <IconLink href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=LTKH3TMC5ZLS8&item_name=Please+help+me+pay+for+the+Anteater+Pathway+server+%3AD&currency_code=USD&amount=2" target="_blank">
                    <SvgImage src='./bobame.svg' />
                    <LinkText paddingLeft={'1.7rem'}>
                        Boba me
                    </LinkText>
                </IconLink>
            </LinkBox>
        </AdditionalLinksContainer>
    );
}

export default AdditionalLinks;