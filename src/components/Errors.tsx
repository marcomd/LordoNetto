import styled from "styled-components";
import { FallbackProps } from "react-error-boundary";

const ErrorDiv = styled.div`
  color: red;
  padding: 1rem;
  font-size: 1.2rem;
`;

function GenericErrorFallback({ error }: FallbackProps) {
  return (
    <ErrorDiv>
      <p>Something went wrong!</p>
      <pre>{error.message}</pre>
    </ErrorDiv>
  );
}

export { GenericErrorFallback };
