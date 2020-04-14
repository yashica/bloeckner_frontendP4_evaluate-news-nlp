import { handleSubmit, postData } from "./formHandler";

test("Function is defined should be true", async () => {
  expect(handleSubmit).toBeDefined();
});

test("This should be a function", async () => {
  expect(typeof handleSubmit).toBe("function");
});
