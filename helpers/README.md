# Helpers

## Notes regarding tests for...

### Converters.ts

- `convertTemperature()` can return a floating point number so we need to use the `.toBeCloseTo()` matcher.
- The test for converting Fahrenheit to Celsius was commented out but left in place because as of authoring the tests, `convertTemperature()` actually only converts from °C > °F. The function should either be renamed or updated to convert either direction.
- As this note, the `convertWindspeed()` only appears intended to convert from "m/s" to "NM/s" and "mi/s"

### Dates.ts

- `vitest.config.ts` pins the timezone globally with `test.env: { TZ: "America/Phoenix" }` to keep date assertions consistent across machines/CI. The timezone needed to be a negative offset so testing UTC dates set to midnight would reliably adjust to the previous date. `America/Phoenix` was also selected because the team is based in Arizona, as good a reason as any.

### Formatters.js

- Locale tests use `"es"`. Spanish number formatting puts a no-break space (` `) before `%`, and ICU versions differ on which space character they use, so the expected string uses the escape rather than a literal character.
- `formatDayName()` returns the named day of the *current* week, so `day = 0` always returns "Sunday", not today. Tests pin the system time with fake timers.

### Index.js

- `env` is mocked because `.env` is gitignored and `createEnv` throws on missing variables in CI. Vitest resolves `@/` aliases in `vi.mock()` paths the same way as in imports, so the mock uses `"@/env"`.
- The following tests are commented out because they expose bugs in the current implementation:
  - `fileSize(0)` returns `"NaN undefined"` because `Math.log(0)` is `-Infinity`, and sizes of 1024⁵ or more have no unit past `TB`.
  - `timezoneOffset()` is only correct for timezones behind UTC: `"UTC"` returns `24` and `"Asia/Tokyo"` returns `15`.
  - `isInternalUrl("//example.com")` returns `true` because protocol-relative URLs fail the `isAbsoluteUrl()` check.

### Noirlab.ts

- `env` is mocked for the same reason as in `index.test.ts`.
- `"server-only";` at the top of the file is a bare string and has no effect. It should be `import "server-only";` to actually guard the module.

### Styles.ts

- `vitest.config.ts` excludes `**/styles.{js,jsx,ts,tsx}` from coverage to skip styled-components files, which also excludes this file. Its tests run, but they don't count toward coverage.
