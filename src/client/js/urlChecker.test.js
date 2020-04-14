import { checkForUrl } from "./urlChecker";

test("This should be a valid url", () => {
  expect(checkForUrl("https://www.apple.com")).toBeTruthy();
});

test("This should be a wrong url", () => {
  expect(checkForUrl("htpts://www.apple.com")).toBeFalsy();
});
