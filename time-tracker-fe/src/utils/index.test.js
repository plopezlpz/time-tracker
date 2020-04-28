import { formatDuration } from "./index";

describe("utils", () => {
  describe("formatDuration", () => {
    it.each`
      secs      | expected
      ${60}     | ${"00:01:00"}
      ${61}     | ${"00:01:01"}
      ${0}      | ${"00:00:00"}
      ${36000}  | ${"10:00:00"}
      ${360000} | ${"100:00:00"}
    `("$secs secs => $expected", ({ secs, expected }) => {
      expect(formatDuration(secs)).toBe(expected);
    });
  });
});
