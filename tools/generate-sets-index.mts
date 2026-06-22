import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const directories = {
  defaults: ['components/patterns', 'components/primitives'],
  wildcard: ['utils', 'composables'],
};

const srcRoot = join(process.cwd(), 'src');

function generateDefaultIndex(dir: string) {
  const targetDir = join(srcRoot, dir);

  const files = readdirSync(targetDir)
    .filter((file) => file.endsWith('.vue'))
    .filter((file) => file !== 'index.vue');

  const componentExports = files
    .map((file) => {
      const name = file.replace(/\.vue$/, '');
      return `export { default as ${name} } from './${file}';`;
    })
    .join('\n');

  const hasTypes = existsSync(join(targetDir, 'types.ts'));
  const typesExport = hasTypes ? `export * from './types';` : '';

  const content =
    '// AUTO-GENERATED FILE. DO NOT EDIT.\n\n' +
    [componentExports, typesExport].filter(Boolean).join('\n') +
    '\n';

  writeFileSync(join(targetDir, 'index.ts'), content);

  console.log(
    `Generated ${dir}/index.ts (${files.length} components${hasTypes ? ', +types' : ''})`
  );
}

function generateWildcardIndex(dir: string) {
  const targetDir = join(srcRoot, dir);

  const files = readdirSync(targetDir)
    .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
    .filter((file) => file !== 'index.ts');

  const exports = files
    .map((file) => {
      const name = file.replace(/\.(ts|js)$/, '');
      return `export * from './${name}';`;
    })
    .join('\n');

  const content = '// AUTO-GENERATED FILE. DO NOT EDIT.\n\n' + exports + '\n';

  writeFileSync(join(targetDir, 'index.ts'), content);

  console.log(`Generated wildcard index for ${dir}`);
}

for (const dir of directories.defaults) {
  generateDefaultIndex(dir);
}

for (const dir of directories.wildcard) {
  generateWildcardIndex(dir);
}

console.log('Done.');
