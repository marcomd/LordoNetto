import styled from "styled-components"

const StyledCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledCheckbox = styled.input`
  /* removing default appearance */
  -webkit-appearance: none;
  appearance: none;
  /* creating a custom design */
  width: 1.6em;
  height: 1.6em;
  border-radius: 0.5em;
  margin: auto 0.5rem;
  border: 0.15em solid white;
  outline: none;
  cursor: pointer;
  &.checked {
    background-color: #007a7e;
    position: relative;
  }
`

type Props = {
  className?: string;
  checked: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const Checkbox = ({ 
  className, 
  checked, 
  onClick,
  children,
  ...props
}: Props) => (
  <StyledCheckboxContainer>
    <StyledCheckbox 
      type="checkbox" 
      onClick={onClick} 
      className={checked ? "checked" : ""} {...props} />
    <span>{children}</span>
  </StyledCheckboxContainer>
)

export default Checkbox