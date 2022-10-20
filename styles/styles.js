import styled from "@emotion/styled";

export const Nav = styled("div")`
  & > * {
    margin-left: 1em;
    color: white;
  }
  background: black;
  padding: 1em;
  height: 2em;
  display: flex;
  align-items: center;
`;

export const PageBody = styled("div")`
  // width: 100%;
  height: 100%;
  padding: 2em;
`;

export const TabContainer = styled("div")`
  width: 70vw;
  webkit-box-shadow: -1px 0px 5px 0px rgba(184, 184, 184, 1);
  -moz-box-shadow: -1px 0px 5px 0px rgba(184, 184, 184, 1);
  box-shadow: -1px 0px 5px 0px rgba(184, 184, 184, 1);
`;
export const TabHead = styled("div")`
  border-bottom: 2px solid #d9d9d9;
  display: flex;
  justify-content: space-evenly;
`;

export const Tab = styled("div")`
  padding: 1em 10%;
  background: ${({ selected }) => (selected ? "#D9D9D9" : "")};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  * {
    color: ${({ selected }) => (selected ? "#FF5C5C" : "black")};
  }
  :hover {
    box-shadow: -1px 0px 5px 0px rgba(184, 184, 184, 1);
    cursor: pointer;
  }
`;

export const TabBody = styled(PageBody)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
