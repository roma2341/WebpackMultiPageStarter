export class RoutingEntry {
    name: string;
    title?: string;
}

export let Routing: {
    pages: RoutingEntry[]
} = {
    pages: [
        {
            name: 'index-page',
            title: 'Welcome to Index Page'
        },
        {
            name: 'graph-view-page',
            title: 'Welcome to About Page'
        },
        {
            name: 'swatch-book-page',
            title: 'Swatch book'
        }
    ]
}