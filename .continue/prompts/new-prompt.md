---
name: test
description: Write tests for highlighted code with strong coverage and edge cases
invokable: true
---

Write tests for the highlighted code

Requirements:
    - Cover happy path + edge cases + error paths
    - Prefer table-driven tests where appropriate
    - Use realistic fixtures
    - Avoid brittle implementation-detail assertions

Output:
    - Test file content
    - Test file needs to be placed next to the tested file
    - Short explanation of the coverage strategy