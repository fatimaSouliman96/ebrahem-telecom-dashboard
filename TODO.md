# TODO: Number Validation Fix Plan

## Approved Plan Steps:
- [x] Step 1: Add shared `isValidPositiveNumber` validator to src/utilits/validation.js
- [x] Step 2: Update src/components/forms/AddProvider.jsx: Remove broken fn, fix onChange handlers, change input types to 'text'
- [x] Step 3: Import shared validator in AddProvider.jsx (EditProvider already uses equivalent)
- [ ] Step 4: Test both forms (type letters, commas, paste invalid → should block)
- [ ] Step 5: Mark complete & attempt_completion

**Status: Steps 1-3 complete. Forms now use shared validator allowing only digits + optional comma/dot, positive numbers. Ready for test.**
