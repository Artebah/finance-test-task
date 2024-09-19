import React, { FC } from "react";
import styled from "styled-components";
import { socket } from "../../socket";

interface ChangeIntervalProps {}

const ChangeInterval: FC<ChangeIntervalProps> = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const newInterval = input.value;

    if (+newInterval < 1000) {
      const proceedIntervalChanging = window.confirm(
        "An interval of less than 1 second can impact processor productivity"
      );

      if (proceedIntervalChanging) {
        socket.emit("changeInterval", newInterval);
      }
    } else {
      socket.emit("changeInterval", newInterval);
    }
  };

  return (
    <StyledChangeIntervalForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor="change-interval">Set tickers interval</StyledLabel>
      <input type="number" defaultValue={5000} name="change-interval" id="change-interval" />
      <button type="submit">change</button>
    </StyledChangeIntervalForm>
  );
};

const StyledChangeIntervalForm = styled.form`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;

  input,
  button {
    border-radius: 10px;
    border: 1px solid #333;
  }

  input {
    height: 30px;
    padding: 0 0 0 10px;
  }

  button {
    text-transform: uppercase;
    padding: 5px 20px;
    transition: all 0.3s ease 0s;
    cursor: pointer;

    &:hover {
      background: #dcdcdc;
    }
  }
`;

const StyledLabel = styled.label`
  line-height: 1;
  margin: 0 0 10px;
  display: block;
  font-weight: 700;
  font-size: 1.5em;
`;

export { ChangeInterval };
