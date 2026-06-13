"use client";

import { useEffect } from "react";

export function HashScrollHandler() {
	useEffect(() => {
		const hash = window.location.hash.slice(1);
		if (!hash) return;

		const timer = setTimeout(() => {
			document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	return null;
}
