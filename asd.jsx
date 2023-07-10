export default function test() {
	return (
		<div>

			<div className="mb-4 border-b border-gray-200 dark:border-gray-700">
				<ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
					<li className="mr-2" role="presentation">
						<button className="inline-block p-4 border-b-2 rounded-t-lg" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
					</li>
					<li className="mr-2" role="presentation">
						<button className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Dashboard</button>
					</li>
					<li className="mr-2" role="presentation">
						<button className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Settings</button>
					</li>
					<li role="presentation">
						<button className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">Contacts</button>
					</li>
				</ul>
			</div>
			<div id="myTabContent">
				<div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="profile" role="tabpanel" aria-labelledby="profile-tab">
					<p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Profile tabs associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
				</div>
				<div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
					<p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Dashboard tabs associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
				</div>
				<div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="settings" role="tabpanel" aria-labelledby="settings-tab">
					<p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Settings tabs associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
				</div>
				<div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="contacts" role="tabpanel" aria-labelledby="contacts-tab">
					<p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Contacts tabs associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
				</div>
			</div>


			<button aria-selected="false" id='markdown-tab' aria-controls='markdown' data-tabs-target="#viewMarkdown" role='tab' className="px-4 py-2 bg-[#1e1e1e] rounded-sm border-b-2 border-transparent hover:border-gray-300" onClick={() => handleOnClickView(previewState.MARKDOWN)}>Markdown</button>

			<button aria-selected="false" id='preview-tab' aria-controls='preview' data-tabs-target="#viewPreview" role='tab' className="px-4 py-2 bg-[#1e1e1e] rounded-sm border-b-2 border-transparent hover:border-gray-300" onClick={() => handleOnClickView(previewState.PREVIEW)}>Preview</button>


			<main id='content' className="w-full h-full p-4">
				<textarea id="viewMarkdown" aria-labelledby='markdown-tab' role='tabpanel' className="hidden resize-none w-full h-full bg-[#1e1e1e] p-4 rounded-lg shadow-lg focus:outline-none focus:ring-1 focus:ring-gray-400" value={note?.noteBody}
					onChange={(e) => setNote({
						...note,
						noteBody: e.target.value
					})}
				></textarea>

				<div id="viewPreview" aria-labelledby='preview-tab' role='tabpanel' className="hidden w-full h-full bg-[#1e1e1e] p-4 rounded-lg shadow-lg focus:outline-none focus:ring-1 focus:ring-gray-400">
					{note?.noteBody}
				</div>
			</main>
		</div>
	);
}


<ReactMarkdown
	className='prose prose-invert max-w-none overflow-auto h-full bg-[#1e1e1e] p-4 rounded-lg shadow-lg focus:outline-none focus:ring-1 focus:ring-gray-400'
	components={{
		code({ node, inline, className, children, ...props }) {
			const match = /language-(\w+)/.exec(className || '')
			return !inline && match ? (
				<SyntaxHighlighter
					{...props}
					children={String(children).replace(/\n$/, '')}
					style={dark}
					language={match[1]}
					PreTag="div"
				/>
			) : (
				<code {...props} className={className}>
					{children}
				</code>
			)
		}
	}}
>
	{note?.noteBody}
</ReactMarkdown>