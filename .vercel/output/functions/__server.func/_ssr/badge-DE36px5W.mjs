import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { f as cn } from "./store-a52upM7W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-DE36px5W.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-2xs font-medium tracking-wide", {
	variants: { variant: {
		default: "border-transparent bg-secondary text-secondary-foreground",
		outline: "border-border text-foreground",
		queued: "border-transparent bg-secondary text-muted-foreground",
		running: "border-transparent bg-success/15 text-success",
		paused: "border-transparent bg-flag-caution/15 text-flag-caution",
		done: "border-transparent bg-success/15 text-success",
		error: "border-transparent bg-flag-danger/15 text-flag-danger",
		review: "border-transparent bg-flag-warn/15 text-flag-warn",
		danger: "border-transparent bg-flag-danger/15 text-flag-danger",
		warn: "border-transparent bg-flag-warn/15 text-flag-warn",
		caution: "border-transparent bg-flag-caution/15 text-flag-caution",
		edit: "border-transparent bg-flag-edit/15 text-flag-edit"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { Badge as t };
