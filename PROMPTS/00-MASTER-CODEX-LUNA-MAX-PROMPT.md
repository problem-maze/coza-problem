# Master Prompt for Codex Luna Max

You are taking over the Problem Natural Eye Zero Rebuild.

Read the package in the order specified by `00-START-HERE.md`.

Hard requirements:
- use only the authoritative 960×640 base as the visual source for the standalone rebuild,
- do not generate images,
- do not use video loops,
- do not reuse old animation implementation code,
- do not modify `main`,
- keep package/code documentation in English,
- obey the single-file SPA constraints for final integration,
- use native 960×640 or normalized geometry,
- do not advance past phone-visible visual gates without evidence.

Start with Z0 + Z1 only.

Z0: create the smallest static golden baseline with the exact base image and an unmistakable build marker.
Z1: create an authoritative debug region map separating lake, island static exclusion, waterfall stream, waterfall spray, far air, mid forest, near foliage, static wood, and static rocks.

Use the supplied phone evidence to understand the old mapping errors, but rebuild the geometry rather than copying the old shapes.

Run all static checks and `node --check` on touched JS. Produce the versioned HTML artifact and a report. Stop when Z0/Z1 are ready for phone visual approval. Do not start Z2.
