import { Metadata, ResolvingMetadata } from 'next';

import { Search } from '../components/pages/search/Search';

export const metadata: Metadata = {
    title: 'NeverGetFancy',
    description:
        'Mo Salah is on for a legendary run in Fantasy Premier League, with the highest points total ' +
        'for a single player, ever. How many points did you lose out on this season by not perma-capping him?',
};

export default function Page() {
    return <Search />;
}
