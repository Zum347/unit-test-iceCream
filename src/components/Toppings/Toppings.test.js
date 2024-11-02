import { render, screen } from "@testing-library/react";
import Toppings from ".";
import userEvent from "@testing-library/user-event";

test("sosları ekleme ve çıkarmanın toplam fiyatı etkiler", async () => {
  render(<Toppings />);
  const user = userEvent.setup();

  const total = screen.getByRole("heading", { name: /Sosların Ücreti: 0/i });

  const mochiCheck = await screen.findByRole("checkbox", { name: /mochi/i });

  await user.click(mochiCheck);

  expect(total).toHaveTextContent("3");

  const cherriesCheck = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  await user.click(cherriesCheck);
  expect(total).toHaveTextContent("6");
  await user.click(mochiCheck);
  expect(total).toHaveTextContent("3");
  await user.click(cherriesCheck);
  expect(total).toHaveTextContent("0");
});