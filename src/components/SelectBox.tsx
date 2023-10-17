import { styled } from "styled-components";

const Select = styled.select`
  margin: 0;
  min-width: 0;
  display: block;
  width: 100%;
  height: 100%;
  padding: 8px 8px;
  font-size: inherit;
  line-height: inherit;
  border: 1px solid;
  border-radius: 4px;
  color: inherit;
  background-color: transparent;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:focus {
    border-color: red;
  }
`;

export default function SelectBox(prop: any) {
  return (
    <Select onChange={prop.onChange}>
      <option value="sortByLowId">Lowest Num</option>
      <option value="sortByHighId">Highest Num</option>
      <option value="sortByLowName">A - Z</option>
      <option value="sortByHighName">Z - A</option>
    </Select>
  );
}
