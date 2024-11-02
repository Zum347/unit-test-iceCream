import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./../Form/index";
import userEvent from "@testing-library/user-event";

test("koşulları onaylanmasına göre buton aktifliği", async () => {
  render(<Form />);

  const user = userEvent.setup();

  const orderBtn = screen.getByRole("button");
  const checkBox = screen.getByRole("checkbox");
  expect(orderBtn).toBeDisabled();
  await user.click(checkBox);
  expect(orderBtn).toBeEnabled();
  await user.click(checkBox);
  expect(orderBtn).toBeDisabled();
});

test("onayla butonu hover olunca bildirim çıkarma", async () => {
  render(<Form />);
  const user = userEvent.setup();
  const checkBox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");

  await user.click(checkBox);

  fireEvent.mouseEnter(button);

  const popup = screen.getByText("Size gerçekten", { exact: false });

  expect(popup).toBeVisible();

  fireEvent.mouseLeave(button);

  expect(popup).not.toBeVisible();
});