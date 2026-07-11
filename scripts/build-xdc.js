#!/usr/bin/env node
/**
 * Package the static SvelteKit build as a WebXDC (.xdc) app for Delta Chat.
 *
 * Constraints:
 *   - ZIP with index.html at root
 *   - Offline only — all assets local
 *   - manifest.toml + icon.png required
 *
 * This site uses trailingSlash: 'always' → en/index.html (not en.html).
 * kit.paths.relative is false for CF/GH Pages, so we rewrite absolutes for xdc.
 */

import { execSync } from 'node:child_process';
import {
	copyFileSync,
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	rmSync,
	statSync,
	writeFileSync
} from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD_DIR = join(ROOT, 'build');
const DIST_DIR = join(ROOT, 'dist');
const XDC_STAGE = join(DIST_DIR, '.xdc-stage');
const XDC_NAME = 'themadorg.xdc';

const EXCLUDE_PATTERNS = [
	/\.br$/,
	/\.gz$/,
	/robots\.txt$/,
	/_headers$/,
	/sitemap\.xml$/
];

const LANGS = ['en', 'fa', 'es', 'ru'];

function shouldExclude(filePath) {
	return EXCLUDE_PATTERNS.some((pattern) => pattern.test(filePath));
}

function getAllFiles(dir, baseDir = dir) {
	const results = [];
	const entries = readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			results.push(...getAllFiles(fullPath, baseDir));
		} else {
			const rel = relative(baseDir, fullPath);
			if (!shouldExclude(rel)) results.push(rel);
		}
	}
	return results;
}

if (!existsSync(BUILD_DIR)) {
	console.error('Build directory not found. Run "bun run build" first.');
	process.exit(1);
}

console.log('Preparing WebXDC package…\n');

if (existsSync(XDC_STAGE)) rmSync(XDC_STAGE, { recursive: true, force: true });
mkdirSync(XDC_STAGE, { recursive: true });
mkdirSync(DIST_DIR, { recursive: true });

const allBuildFiles = getAllFiles(BUILD_DIR);
for (const file of allBuildFiles) {
	const dst = join(XDC_STAGE, file);
	mkdirSync(dirname(dst), { recursive: true });
	copyFileSync(join(BUILD_DIR, file), dst);
}
console.log(`   Copied ${allBuildFiles.length} files from build/`);

// manifest.toml + icon.png from project root (WebXDC convention)
for (const f of ['manifest.toml', 'icon.png']) {
	const src = join(ROOT, f);
	if (!existsSync(src)) {
		console.error(`Missing required ${f} at project root.`);
		process.exit(1);
	}
	copyFileSync(src, join(XDC_STAGE, f));
	console.log(`   Added ${f}`);
}

// Inject version into name for chat list
{
	const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'));
	const version = pkg.version || '0.0.0';
	const manifestPath = join(XDC_STAGE, 'manifest.toml');
	let manifest = readFileSync(manifestPath, 'utf-8');
	manifest = manifest.replace(/^name\s*=\s*"(.+?)"/m, `name = "$1 v${version}"`);
	writeFileSync(manifestPath, manifest);
	console.log(`   Version: v${version}`);
}

// Root entry: offline language pick → en/index.html etc.
console.log('\nRoot index.html (offline lang redirect)…');
const rootHtml = `<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>TheMadOrg</title>
	<style>
		body {
			margin: 0;
			min-height: 100vh;
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: system-ui, sans-serif;
			background: #0d0d0d;
			color: #a3a3a3;
		}
	</style>
	<script>
		(function () {
			var langs = ${JSON.stringify(LANGS)};
			var lang = 'en';
			try {
				var stored = localStorage.getItem('madorg-lang');
				if (langs.indexOf(stored) !== -1) lang = stored;
				else {
					var nav = (navigator.language || '').slice(0, 2).toLowerCase();
					if (langs.indexOf(nav) !== -1) lang = nav;
				}
			} catch (e) {
				try {
					var n = (navigator.language || '').slice(0, 2).toLowerCase();
					if (langs.indexOf(n) !== -1) lang = n;
				} catch (e2) {}
			}
			// trailingSlash always → lang/index.html
			window.location.replace(lang + '/index.html');
		})();
	</script>
	<noscript>
		<meta http-equiv="refresh" content="0; url=en/index.html" />
		<p style="text-align:center;padding:2rem">
			<a href="en/index.html">English</a> ·
			<a href="fa/index.html">فارسی</a> ·
			<a href="es/index.html">Español</a> ·
			<a href="ru/index.html">Русский</a>
		</p>
	</noscript>
</head>
<body><p>Loading…</p></body>
</html>`;
writeFileSync(join(XDC_STAGE, 'index.html'), rootHtml);
console.log('   Wrote offline root index.html');

// Absolute → relative paths in HTML
console.log('\nRewriting absolute paths in HTML…');
let htmlFixed = 0;
for (const file of getAllFiles(XDC_STAGE)) {
	if (!file.endsWith('.html')) continue;

	const filePath = join(XDC_STAGE, file);
	let content = readFileSync(filePath, 'utf-8');
	const depth = file.split('/').length - 1;
	const toRoot = depth > 0 ? '../'.repeat(depth) : './';
	const baseRel = toRoot === './' ? '.' : toRoot.replace(/\/$/, '');

	content = content.replace(/(href|src)="\/(?!\/)([^"]+)"/g, `$1="${toRoot}$2"`);
	content = content.replace(/import\("\/(?!\/)([^"]+)"\)/g, `import("${toRoot}$1")`);
	content = content.replace(
		/base:\s*(?:""|'')/g,
		`base: new URL(${JSON.stringify(baseRel)}, location).pathname.replace(/\\/$/, '')`
	);
	content = content.replace(
		/content="(\d+);\s*url=\/([^"]+)"/g,
		(_, t, p) => `content="${t}; url=${toRoot}${p}"`
	);

	// hreflang and similar absolute paths in attributes we already covered with href=

	writeFileSync(filePath, content);
	htmlFixed++;
}
console.log(`   Fixed ${htmlFixed} HTML files`);

// Patch Vite preload helper absolute URLs
console.log('\nPatching JS preload helpers…');
const preloadAbsRe = /function\(([A-Za-z_$][\w$]*)\)\{return"\/"\+\1\}/g;
const preloadAbsReplacement =
	'function($1){return new URL("../".repeat(location.pathname.replace(/\\/[^/]*$/,"").split("/").filter(Boolean).length)+$1,location.href).href}';
let jsFixed = 0;
for (const file of getAllFiles(XDC_STAGE)) {
	if (!file.endsWith('.js')) continue;
	const filePath = join(XDC_STAGE, file);
	let content = readFileSync(filePath, 'utf-8');
	if (!preloadAbsRe.test(content)) continue;
	preloadAbsRe.lastIndex = 0;
	const next = content.replace(preloadAbsRe, preloadAbsReplacement);
	if (next !== content) {
		writeFileSync(filePath, next);
		jsFixed++;
	}
}
console.log(`   Patched ${jsFixed} JS files`);

// Inject webxdc boot flag + normalize /en/index.html → /en/ before SvelteKit boots.
// Without this the client router sees pathname "/en/index.html", [lang] fails
// validation, and the app shows "404 Unknown language".
console.log('\nInjecting WebXDC boot + path normalizer…');
const webxdcBootScript =
	'<script>window.__WEBXDC__=true;' +
	'(function(){' +
	'var p=location.pathname;' +
	// Strip trailing index.html / .html so /en/index.html → /en/
	'if(/\\.html$/i.test(p)){' +
	'var c=p.replace(/\\.html$/i,"");' +
	'if(/\\/index$/i.test(c))c=c.replace(/\\/index$/i,"")||"/";' +
	'if(c.length>1&&!c.endsWith("/"))c+="/";' +
	'history.replaceState(history.state,"",c+location.search+location.hash);' +
	'}else if(p.length>1&&!p.endsWith("/")&&!/\\.[a-z0-9]+$/i.test(p)){' +
	// trailingSlash=always
	'history.replaceState(history.state,"",p+"/"+location.search+location.hash);' +
	'}' +
	'})();</script>';
let flagInjected = 0;
for (const file of getAllFiles(XDC_STAGE)) {
	if (!file.endsWith('.html')) continue;
	const filePath = join(XDC_STAGE, file);
	let content = readFileSync(filePath, 'utf-8');
	// Re-inject if an older package only set the flag
	content = content.replace(/<script>window\.__WEBXDC__=true;.*?<\/script>/s, '');
	if (content.includes('<head>')) {
		content = content.replace('<head>', `<head>${webxdcBootScript}`);
		writeFileSync(filePath, content);
		flagInjected++;
	}
}
console.log(`   Injected into ${flagInjected} HTML files`);

// Zip → .xdc
console.log('\nCreating .xdc…');
const xdcPath = join(DIST_DIR, XDC_NAME);
if (existsSync(xdcPath)) rmSync(xdcPath);

const fileList = getAllFiles(XDC_STAGE);
const fileListPath = join(DIST_DIR, '.xdc-files.txt');
writeFileSync(fileListPath, fileList.join('\n'));

try {
	execSync(`cd "${XDC_STAGE}" && zip -9 -@ "${xdcPath}" < "${fileListPath}"`, {
		stdio: 'pipe'
	});
	rmSync(fileListPath, { force: true });
	rmSync(XDC_STAGE, { recursive: true, force: true });

	const sizeMB = (statSync(xdcPath).size / (1024 * 1024)).toFixed(2);
	console.log(`\nWebXDC ready`);
	console.log(`   ${xdcPath}`);
	console.log(`   ${sizeMB} MB (${fileList.length} files)`);
	console.log(`\n   Test: npx @webxdc/webxdc-dev run ${xdcPath}`);
	console.log(`   Send themadorg.xdc in Delta Chat to open the offline landing.`);
} catch (err) {
	console.error('Zip failed:', err.message);
	rmSync(XDC_STAGE, { recursive: true, force: true });
	rmSync(fileListPath, { force: true });
	process.exit(1);
}
