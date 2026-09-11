# Helpers

## Notes regarding tests for...

### Converters.ts

- `convertTemperature()` can return a floating point number so we need to use the `.toBeCloseTo()` Jest matcher.
- The test for converting Fahrenheit to Celsius was commented out but left in place because as of authoring the tests, `convertTemperature()` actually only converts from °C > °F. The function should either be renamed or updated to convert either direction.
- As this note, the `convertWindspeed()` only appears intended to convert from "m/s" to "NM/s" and "mi/s"

### Dates.ts

- `jest.config.ts` does not pin a timezone globally, so `dates.test.ts` pins `process.env.TZ = "America/Phoenix"` locally to keep those assertions consistent across machines/CI. The timezone needed to be a negative offset so testing UTC dates set to midnight would reliably adjust to the previous date. `America/Phoenix` was also selected because the team is based in Arizona, as good a reason as any.

### Formatters.js

- Locale tests use `"es"`. Spanish number formatting puts a no-break space (` `) before `%`, and ICU versions differ on which space character they use, so the expected string uses the escape rather than a literal character.
- `formatDayName()` returns the named day of the *current* week, so `day = 0` always returns "Sunday", not today. Tests pin the system time with fake timers.

### Index.js

- `env` is mocked because `.env` is gitignored and `createEnv` throws on missing variables in CI. The mock uses the relative path `"../env"` because Next's SWC transform only rewrites `@/` aliases in `import` statements, not in `jest.mock()` strings.
- The following tests are commented out because they expose bugs in the current implementation:
  - `fileSize(0)` returns `"NaN undefined"` because `Math.log(0)` is `-Infinity`, and sizes of 1024⁵ or more have no unit past `TB`.
  - `timezoneOffset()` is only correct for timezones behind UTC: `"UTC"` returns `24` and `"Asia/Tokyo"` returns `15`.
  - `isInternalUrl("//example.com")` returns `true` because protocol-relative URLs fail the `isAbsoluteUrl()` check.

### Noirlab.ts

- `next-intl/server` is mocked because it ships ESM-only, which Jest can't parse without transforming `node_modules`. It's only reached through `@/lib/i18n`, and `addLocaleUriSegment()` doesn't use it, so the real locale logic is still what gets tested.
- `"server-only";` at the top of the file is a bare string and has no effect. It should be `import "server-only";` to actually guard the module.

### Styles.ts

- `jest.config.ts` excludes `**/styles.{js,jsx,ts,tsx}` from coverage to skip styled-components files, which also excludes this file. Its tests run, but they don't count toward coverage.
