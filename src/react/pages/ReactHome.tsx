export const ReactHome = () => {
	return (
		<html>
			<head>
				<meta charSet="utf-8" />
				<title>Awesome.Social</title>
				<meta name="description" content="Bun, Elysia & React" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="stylesheet" href="/styles/Home.css" />
				<link rel="icon" href="/assets/favicon.ico" />
			</head>
			<body>
				<main>
					<header>
						<h1>Welcome to Awesome.Social</h1>
					</header>
					<section>
						<p>
							This is a simple social media platform built with
							Bun, Elysia & React.
						</p>
					</section>
					<footer>
						<p>&copy; {new Date().getFullYear()} Awesome.Social</p>
					</footer>
				</main>
			</body>
		</html>
	);
};
