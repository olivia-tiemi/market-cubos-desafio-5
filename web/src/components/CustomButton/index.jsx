import StyledPinkButton from './style';
import { StyledWhiteButton } from './style';

export const CustomButton = ({ text, handler, type, variant, icon }) => {
  return variant === 'white' ? (
    <StyledWhiteButton onClick={handler} type={type}>
      <img src={icon} alt="" />
      &nbsp;&nbsp;
      {text}
    </StyledWhiteButton>
  ) : (
    <StyledPinkButton onClick={handler} type={type}>
      {text}
    </StyledPinkButton>
  );
};
