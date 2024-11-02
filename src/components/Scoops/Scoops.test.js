import { getByRole, render, screen } from "@testing-library/react";
import Scoops from ".";
import userEvent from "@testing-library/user-event";

/*
    ! Seçiciler:

    ? Query [All] BySelector(BySeçisi) (KullanılacakKomut BirtanemiHepsimi Seçici(Yazıya,ArkaPlana))

    * Query >> get | find | query

    * get: Elementler başlangıçta DOM'da var ise kullanılır
    * find: Elementin ne zaman ekrana basılacağı belli değilse (async) ise tercih edilir.
    * query: get ile benzer çalışır ve elemanı bulamazsa null döndürür. Hata vermez.get hata verir.

    ! find methodu promise döndürür. Bu yüzden 
    ! async await vb. ele alınması gerekir.

    * all kullandığımız zaman elemanlar geriye hep dizi döner.
    */

test("Veri apiden geldikten sonra ekrana kartlar basılır", async () => {
  render(<Scoops />);

  // ekrana basılan bütün kartları çağır (resimlerini)
  const images = await screen.findAllByRole("img", { name: "çeşit-resmi" });

  // gelen resimlerin sayısı 2'den büyük veya eşit mi
  expect(images.length).toBeGreaterThanOrEqual(2);
});

// Test Drivend Development (Red-to-Green)
test("Çeşit ekleme ve sıfırlamanın toplam fiyata etkisi", async () => {
  render(<Scoops />);
  const user = userEvent.setup();
  // toplam fiyata erişme
  const total = screen.getByRole("heading", { name: /çeşitler ücreti/i }); //i=insensetive > büyük küçük harf duyarlığı ve içeriğinin tamamını yazmak zorunda kalmayız
  // toplam fiyat sıfıdan başlar
  expect(total).toHaveTextContent("0");

  // bütün ekle butonlarını çağırma
  const addButtons = await screen.findAllByRole("button", { name: /ekle/i });
  const delButtons = await screen.findAllByRole("button", { name: /Sıfırla/i });

  // bir tane çeşit ekle ve fiyatı kontol et
  await user.click(addButtons[0]);
  expect(total).toHaveTextContent("20");

  // iki tane daha ekle ve fiyatı kontrol et
  await user.dblClick(addButtons[2]);
  expect(total).toHaveTextContent("60");

  // bir tane eklenen elemanı sıfırlama
  await user.click(delButtons[0]);
  expect(total).toHaveTextContent("40");

  // iki tane eklenen elemanı çıkarma
  await user.click(delButtons[2]);
  expect(total).toHaveTextContent("0");
});