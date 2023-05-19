hexo.extend.filter.register('before_post_render', render, 9);

function ignore(data) {
	let source = data.source;
	let ext = source.substring(source.lastIndexOf('.')).toLowerCase();
	return ['.js', '.css', '.html', '.htm'].indexOf(ext) > -1;
}

function render(data) {
	let reg = /(\s*)(```) *(mermaid) *\n?([\s\S]+?)\s*(\2)(\n+|$)/g;

	if (!ignore(data)) {
		let matched = false;
		data.content = data.content
			.replace(reg, function(raw, start, startQuote, lang, content, endQuote, end) {
				matched = true;
				return start + '<pre class="mermaid">' + content + '</pre>' + end;
				// use this if you also need to display the source code
				// return start + '<pre class="mermaid">'+content+'</pre>' + end + raw;
			});
		if (matched) {
			// https://mermaid.js.org/intro/n00b-gettingStarted.html#_3-calling-the-javascript-api
			// always use latest one
			data.content += `\n\n<script type="module"> import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.esm.min.mjs';	mermaid.initialize({ startOnLoad: true }); </script>`;
		}
	}
};
