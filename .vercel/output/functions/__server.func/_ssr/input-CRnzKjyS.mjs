import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { f as cn } from "./store-a52upM7W.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		"data-slot": "input",
		className: cn("flex h-9 w-full min-w-0 rounded-sm border border-input bg-transparent px-3 py-1 text-sm outline-none transition-[box-shadow,border-color] duration-150", "placeholder:text-muted-foreground", "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30", "disabled:pointer-events-none disabled:opacity-40", "file:border-0 file:bg-transparent file:text-sm file:font-medium", className),
		...props
	});
}
//#endregion
export { Input as t };
