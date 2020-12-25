import ContactUsModal from '@components/contactUsModal';
import {
    AdditionalLinksContainer,
    LinkBox,
    IconLink,
    SvgImage,
    gitHubIconStyle,
    LinkText,
} from './styled';


const AdditionalLinks = () => {
    return (
        <AdditionalLinksContainer>
            <ContactUsModal />
            <LinkBox>
                <IconLink href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=LTKH3TMC5ZLS8&item_name=I+would+love+%242+boba%21+This+woud+also+help+the+team+pay+for+the+server.+Thank+you+%3A%29&currency_code=USD&amount=2" target="_blank">
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