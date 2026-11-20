// Build + sync a S3 + invalidación de CloudFront.
// Requiere AWS CLI v2 configurado y un archivo .env.deploy (ver .env.deploy.example).
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

if (!existsSync('.env.deploy')) {
  console.error('Falta .env.deploy (copiá .env.deploy.example y completalo).');
  process.exit(1);
}
process.loadEnvFile('.env.deploy');
const { BUCKET, DISTRIBUTION_ID, AWS_PROFILE } = process.env;
if (!BUCKET || !DISTRIBUTION_ID) {
  console.error('BUCKET y DISTRIBUTION_ID son obligatorios en .env.deploy.');
  process.exit(1);
}

const profile = AWS_PROFILE ? ` --profile ${AWS_PROFILE}` : '';
const dist = 'dist/portfolio/browser';
const run = (cmd) => {
  console.log(`\n$ ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
};

run('npm run build');
// Assets con hash: caché de 1 año.
run(
  `aws s3 sync ${dist} s3://${BUCKET} --delete --exclude "*.html" --exclude "*.xml" --exclude "*.txt" --exclude "cv/*" --cache-control "public,max-age=31536000,immutable"${profile}`,
);
// HTML, sitemap, robots y CV: siempre revalidar.
run(
  `aws s3 sync ${dist} s3://${BUCKET} --delete --exclude "*" --include "*.html" --include "*.xml" --include "*.txt" --include "cv/*" --cache-control "no-cache"${profile}`,
);
run(`aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/*"${profile}`);
console.log('\nDeploy completo.');
