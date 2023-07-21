export default function FooterLayout() {
	return (
		<footer className="flex justify-center items-center bg-surface p-2 mt-2 h-10">
			<p className="text-xs text-on-surface">Notik © {new Date().getFullYear()}</p>
			<p className="text-xs text-on-surface mx-2">|</p>
			<p className="text-xs text-on-surface">Made with 🖤 by <a href="https://github.com/Kazte/">Kazte</a></p>
		</footer >
	)
}