# Codex Operating Contract

For every gate:
1. Read the relevant package files.
2. Read/search the current code before editing.
3. Make a scoped implementation.
4. Re-search for conflicting state/rules after editing.
5. Extract every touched JS block and run `node --check`.
6. Run package/static validators.
7. Create a unique build marker.
8. Produce a report with verified vs unverified claims separated.
9. Ask for phone evidence only when the next decision truly depends on it.
10. Do not silently broaden scope into the next gate.

When a change “should work” but does not, search for hidden overrides/state before stacking another patch.
