export interface NewsItem {
    id: string;
    title: string;
    content: string;
    link: string;
    keywords: string;
    creator: string;
    video_url: string;
    description: string;
    pubDate: string;
    image_url: string;
    source_id: string;
    source_priority: number;
    source_url: string;
    source_icon: string;
    language: string;
    country: string[];
    category: string[];
    ai_tag: string;
    sentiment: string;
    sentiment_stats: string;
    ai_region: string;
  }

export interface NewsState {
    news: NewsItem[];
    loading: boolean;
    error: string | null;
    pagination: any;
    }
