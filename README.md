This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Build

npm run build

## AWS CLI를 사용하여 S3에 업로드

aws s3 mv s3://els-ssr-app s3://els-ssr-app/backup/ --recursive --exclude "backup\*"

aws s3 cp ./out s3://els-ssr-app/ --recursive

# AWS CloudFront + S3 배포

### 1. Next.js 애플리케이션 빌드

### 1.1 `next.config.mjs` 설정

`next.config.mjs` 파일을 생성하고 정적 사이트로 빌드하도록 설정합니다.

```jsx
javascript코드 복사
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,    // 정적 사이트 빌드 시 새로고침(refresh) 404 에러 방지
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/api/:path*',
        destination: '/api',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

```

- `output: 'export'`: 정적 사이트로 빌드하기 위한 설정.
- `distDir: 'out'`: 빌드된 파일이 저장될 디렉터리.
- `images: { unoptimized: true }`: Next.js의 기본 이미지 최적화를 비활성화하여 정적 사이트에서 이미지를 다룰 수 있도록 합니다.

### 1.2 애플리케이션 빌드

터미널에서 애플리케이션을 빌드합니다.

```bash
npm run build

```

빌드된 파일은 프로젝트 루트의 `out` 디렉터리에 저장됩니다.

### 2. AWS S3 버킷 생성 및 파일 업로드

### 2.1 S3 버킷 생성

1. **AWS Management Console**에 로그인합니다.
2. **S3 서비스**로 이동합니다.
3. **버킷 생성** 버튼을 클릭하고, 이름을 지정하고 **생성**합니다. 예: **els-ssr-app**.

### 2.2 버킷 설정

1. 생성된 버킷으로 이동합니다.
2. **권한** 탭에서 **퍼블릭 액세스 차단** 설정을 수정하여, 버킷과 객체의 퍼블릭 읽기 액세스를 허용합니다.
3. **정책 편집**에서 버킷 정책을 추가합니다. 이 정책은 모든 사용자가 HTTP와 HTTPS를 통해 S3 버킷의 객체를 읽을 수 있도록 합니다.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::els-ssr-app/*"
    }
  ]
}
```

4. **속성** 탭에서 **정적 웹 사이트 호스팅** 설정에서 정적 웹 사이트 호스팅 활성화하고 인덱스 문서에 "index.html" 입력합니다.

### 2.3 파일 업로드

1. **파일 업로드** 버튼을 클릭합니다.
2. `out` 디렉터리의 모든 파일과 폴더를 선택하고 업로드합니다.

### 2.4 AWS CLI를 사용하여 S3에 파일 업로드

AWS CLI를 사용하여 S3에 파일을 업로드하고, HTTP와 HTTPS를 통해 접근할 수 있도록 설정합니다.

```bash
aws s3 cp ./out s3://els-ssr-app/ --recursive
```

`--acl public-read` 옵션은 S3 설정에 따라서 사용 가능합니다.

### 3. AWS CloudFront 배포 설정

### 3.1 CloudFront 배포 생성

1. **CloudFront 서비스**로 이동합니다.
2. **배포 생성** 버튼을 클릭합니다.
3. **원본 도메인 이름**에 S3 버킷의 URL을 입력합니다. S3 웹 사이트 엔드포인트를 사용하도록 선택합니다.
   예: S3 버킷 URL - els-ssr-app.s3.ap-northeast-2.amazonaws.com
   예: S3 웹 사이트 엔드포인트 - els-ssr-app.s3-website.ap-northeast-2.amazonaws.com
4. **원본 액세스**는 **`공개`**를 선택합니다.
5. **기본 캐시 동작** 설정에서 `Viewer Protocol Policy`를 `HTTP and HTTPS`로 설정합니다.
6. **설정**에서 `기본값 루트 객체(Default Root Object)`에 `index.html`을 입력합니다. 이 설정을 통해 CloudFront는 기본 경로에서 `index.html`을 로드하도록 구성됩니다.
7. **생성** 버튼을 클릭하여 배포를 완료합니다.

### 3.2 배포 완료 후

1. 배포가 완료되면 **배포 ID**를 클릭합니다.
2. **설정** 탭에서 **도메인 이름**을 확인하고, 이를 통해 배포된 사이트에 접근할 수 있습니다.
   예: [https://dys8bxirz9fks.cloudfront.net](https://dys8bxirz9fks.cloudfront.net/)

### 4. CloudFront와 S3 버킷 연결

### 4.1 S3 버킷의 객체에 대한 CloudFront의 요청 권한 부여

1. S3 버킷에서 **버킷 정책**을 업데이트하여 CloudFront 배포가 S3 버킷의 객체를 읽을 수 있도록 설정합니다.
2. CloudFront 배포 ID를 확인하고, 이를 정책에 포함합니다.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipalRead",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::els-ssr-app/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::495693425233:distribution/E3BQZAVHF2AH2I"
        }
      }
    }
  ]
}
```

- `AWS:SourceArn`에서 CloudFront 배포 ARN을 `arn:aws:cloudfront::[AWS_ACCOUNT_ID]:distribution/[DISTRIBUTION_ID]` 형식으로 설정합니다.

### 배포 확인

이제 [`https://dys8bxirz9fks.cloudfront.net`](https://dys8bxirz9fks.cloudfront.net/)과 같은 CloudFront URL을 통해 배포된 애플리케이션에 접근할 수 있습니다.

## 전체 요약

1. **Next.js 애플리케이션 빌드:** 정적 사이트로 빌드하여 `out` 디렉터리에 파일 저장.
2. **S3 버킷 생성 및 파일 업로드:** 버킷을 생성하고, 빌드된 파일을 업로드하며 퍼블릭 액세스 설정.
3. **CloudFront 배포 설정:** CloudFront 배포를 생성하고 S3 버킷과 연결.
4. **S3 버킷의 객체 접근 권한 부여:** CloudFront가 S3 버킷의 객체를 읽을 수 있도록 설정.
