import { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata/canonical';
import SearchClient from './SearchClient';

export async function generateMetadata(): Promise<Metadata> {
    return pageMetadata.search();
}

export default function SearchPage() {
    return <SearchClient />;
}