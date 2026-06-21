import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const directories = ['patterns', 'primitives'];

for (const dir of directories) {
  const targetDir = join(process.cwd(), 'src', 'components', dir);

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

console.log('Done.');
