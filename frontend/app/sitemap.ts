import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://nikhilesh-attal-portfolio.vercel.app/', // Replace with your domain
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Add other public pages here
  ];
}