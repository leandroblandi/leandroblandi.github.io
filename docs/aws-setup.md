# Infraestructura AWS (configuración manual por consola)

Arquitectura: **Route 53** (DNS + dominio) → **CloudFront** (CDN, HTTPS, CloudFront Function) → **S3** privado (archivos estáticos), con un certificado de **ACM**.

> Reemplazá `leandroblandi.me` por tu dominio en todos los pasos y también en `src/app/data/profile.ts`, `public/robots.txt` y `public/sitemap.xml`.

## 1. Registrar el dominio (Route 53)
1. Route 53 → **Registered domains** → **Register domains** → buscá `leandroblandi.me` → completá los datos de contacto (activá la protección de privacidad).
2. Route 53 crea automáticamente una **hosted zone** pública con el mismo nombre. La registración puede tardar de minutos a horas.

## 2. Certificado TLS (ACM, **región us-east-1**)
CloudFront sólo acepta certificados de `us-east-1 (N. Virginia)`.
1. ACM → cambiá la región a **us-east-1** → **Request certificate** → *Public*.
2. Nombres: `leandroblandi.me` y `www.leandroblandi.me`. Validación: **DNS**.
3. En el certificado, **Create records in Route 53** → esperá el estado *Issued*.

## 3. Bucket S3 (privado)
1. S3 → **Create bucket** → nombre `leandroblandi.me` (cualquier región, p. ej. `sa-east-1` o `us-east-1`).
2. Dejá **Block all public access** activado. Sin static website hosting (CloudFront accede vía OAC).

## 4. CloudFront Function
1. CloudFront → **Functions** → **Create function** → nombre `portfolio-router`, runtime `cloudfront-js-2.0`.
2. Pegá el contenido de [`infra/cloudfront-function.js`](../infra/cloudfront-function.js) → **Save** → pestaña *Test* (probá `/`, `/es`, `/en/`, `/main-XXXX.js`) → **Publish**.

## 5. Distribución CloudFront
1. CloudFront → **Create distribution**.
2. **Origin**: el bucket S3 (no el endpoint de website) → **Origin access: Origin access control (OAC)** → *Create new OAC*.
3. **Default cache behavior**:
   - Viewer protocol policy: **Redirect HTTP to HTTPS**.
   - Allowed methods: GET, HEAD. Compress objects: **Yes**.
   - Cache policy: **CachingOptimized** (los headers `Cache-Control` que sube el script de deploy definen el TTL).
   - Response headers policy: **SecurityHeadersPolicy** (managed).
   - Function associations → **Viewer request** → CloudFront Function → `portfolio-router`.
4. **Settings**:
   - Alternate domain names (CNAME): `leandroblandi.me`, `www.leandroblandi.me`.
   - Custom SSL certificate: el de ACM del paso 2.
   - Supported HTTP versions: HTTP/2 y HTTP/3. Default root object: vacío (la function maneja `/`).
5. Crear. CloudFront muestra un banner con la **bucket policy** para OAC → **Copy policy** → S3 → bucket → *Permissions* → *Bucket policy* → pegar y guardar.
6. Distribución → **Error pages** → *Create custom error response*:
   - HTTP error code **403** → Customize → path `/index.csr.html` → response code **404**.
   - Repetir para **404**.
7. Anotá el **Distribution ID** (p. ej. `E1234567890ABC`).

## 6. DNS (Route 53)
En la hosted zone `leandroblandi.me` → **Create record**:
- `leandroblandi.me` · tipo **A** · *Alias* → *CloudFront distribution* → tu distribución.
- Ídem tipo **AAAA** (IPv6).
- Repetí ambos para `www`.

## 7. Usuario para deploy (mínimo privilegio)
1. IAM → **Policies** → *Create policy* → JSON (reemplazá cuenta y distribution ID):
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::leandroblandi.me"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"],
      "Resource": "arn:aws:s3:::leandroblandi.me/*"
    },
    {
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<DISTRIBUTION_ID>"
    }
  ]
}
```
2. Asignala a un usuario IAM (o, mejor, a un permission set de IAM Identity Center).
3. En tu máquina: `aws configure --profile portfolio` (o `aws configure sso`).

## 8. Deploy
```bash
cp .env.deploy.example .env.deploy   # completar BUCKET, DISTRIBUTION_ID, AWS_PROFILE
npm run deploy
```

## Verificación
- `curl -I https://leandroblandi.me/` → `302` a `/es` o `/en`.
- `curl -I https://leandroblandi.me/en` → `200`, `cache-control: no-cache`.
- `curl -I https://leandroblandi.me/main-XXXX.js` → `cache-control: public,max-age=31536000,immutable`.
- Mientras el dominio propaga se puede probar con `https://dXXXX.cloudfront.net`.
