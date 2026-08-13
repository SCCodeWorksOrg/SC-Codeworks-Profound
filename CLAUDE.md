# SC Codeworks — repo standard (auto-loaded by Claude Code, ANY account)

This file travels with the code so every Claude account (and human) working here
inherits the standard without relying on any one account's private memory.

**Every agent / worker / cron / pipeline / scheduled job added to this repo MUST:**
1. Register in the monitoring registry (`SCCodeWorksOrg/scc-monitoring/agents.yaml`).
2. Emit a heartbeat each run: `{name, status, last_run_at (ISO-8601 UTC), detail, processed, failed}`.
3. Have an external healthcheck (healthchecks.io) — the dead-man's-switch (nothing attests to its own liveness).
4. Reconcile records at every data boundary (received vs produced vs acknowledged) with a dead-letter — NO leaks.
5. Be proven before "ready": trigger the real failure it guards, observe it fire + alert. Evidence, not assertion.

**No build-and-leave.** An untracked agent is a silent single point of failure.
The monitors are themselves monitored, recursively, out to an external service.
Full spec: `SCCodeWorksOrg/scc-monitoring/ARCHITECTURE.md`.

Also governs: native-AI + minimal data entry · forced RLS tenant isolation, no
secret in git/logs · surface-only-what-needs-attention (no noise) · gated
adversarial review + layered QA before merge · $0-until-first-customer.
