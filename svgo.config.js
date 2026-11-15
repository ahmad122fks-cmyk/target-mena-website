// Optimise the calligraphy SVGs without changing their shapes:
// keep viewBox, keep ids used by <use>/<clipPath>, round to 2 decimals.
export default {
  multipass: true,
  floatPrecision: 2,
  plugins: [
    { name: 'preset-default', params: { overrides: { removeViewBox: false, cleanupIds: false } } },
  ],
}
