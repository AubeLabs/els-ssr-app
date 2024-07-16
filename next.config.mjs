/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', 
    distDir: 'out', 
    trailingSlash: true,    // 정적 사이트 빌드 시 새로고침(refresh) 404 에러 방지
}

export default nextConfig;