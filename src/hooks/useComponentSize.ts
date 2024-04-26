import { useState, useEffect } from "react";

interface Size {
	width: number | undefined;
	height: number | undefined;
}

const useComponentSize = (...refs: React.RefObject<HTMLElement>[]): Size[] => {
	const [sizes, setSizes] = useState<Size[]>([]);

	useEffect(() => {
		const updateSizes = () => {
			const newSizes = refs.map((ref) => {
				if (ref.current) {
					return {
						width: ref.current.offsetWidth,
						height: ref.current.offsetHeight
					};
				} else {
					return { width: undefined, height: undefined };
				}
			});
			setSizes(newSizes);
		};

		updateSizes();

		window.addEventListener("resize", updateSizes);

		return () => {
			window.removeEventListener("resize", updateSizes);
		};
	}, [refs]);

	return sizes;
};

export default useComponentSize;
