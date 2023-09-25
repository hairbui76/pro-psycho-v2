class Router {
	methods = [
		"delete",
		"get",
		"head",
		"patch",
		"post",
		"put",
		"options",
		"all",
		"route",
		"register",
		"use",
	];
	constructor(fastify) {
		this.fastify = fastify;
		this.methods.forEach((method) => {
			this[method] = this.createHttpMethod(method);
		});
	}
	routeMap(path = "", opts = {}) {
		this.path = path;
		this.opts = opts;
		return this;
	}
	createHttpMethod(method) {
		return (...args) => {
			let path = this.path;
			let fn;
			let opts = this.opts;
			// TODO: Pending to optimize fastify router
			// const typesArgs = args.map((arg) => typeof arg);
			// switch (typesArgs.length) {
			// 	case 1: {
			// 		if (typesArgs[0] === "string") path += args[0];
			// 		else if (typesArgs[0] === "object") opts = { ...opts, ...args[0] };
			// 		else if (typesArgs[0] === "function") fn = args[0];
			// 	}
			// }
			while (args.length) {
				const arg = args.pop();
				if (typeof arg === "string") path += arg;
				else if (typeof arg === "object") opts = { ...opts, ...arg };
				else if (typeof arg === "function") fn = arg;
			}
			this.fastify[method](path, opts, fn);
			return this;
		};
	}
}

module.exports = Router;
