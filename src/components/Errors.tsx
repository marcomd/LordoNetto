import styled from "styled-components";

const ErrorDiv = styled.div`
  color: red;
  padding: 1rem;
  font-size: 1.2rem;
`;

function GenericErrorFallback({ error }) {
  return (
    <ErrorDiv>
      <p>Something went wrong!</p>
      <pre>{error.message}</pre>
    </ErrorDiv>
  );
}

export { GenericErrorFallback };
