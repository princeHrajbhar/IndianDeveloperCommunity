# Admin App Router map

Canonical routes use singular resource segments and nested App Router pages:

- `/dashboard/job`, `/dashboard/job/add`, `/dashboard/job/[id]`, `/dashboard/job/[id]/edit`
- `/dashboard/application`, `/dashboard/application/[id]`
- `/dashboard/lead`, `/dashboard/lead/add`, `/dashboard/lead/[id]`
- `/dashboard/user`, `/dashboard/user/add`, `/dashboard/user/[id]`
- `/dashboard/file`
- `/dashboard/queue`

Legacy plural URLs remain as server redirects so existing bookmarks do not break.
