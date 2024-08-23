export interface IFileExplorer {
    id: string;
    name: string;
    isFolder: boolean;
    items: IFileExplorer[];
}

export const EXPLORER_DATA: IFileExplorer = {
    id: `root`,
    name: `root`,
    isFolder: true,
    items: [
        {
            id: `2`,
            name: `node_modules`,
            isFolder: true,
            items: [
                {
                    id: `3`,
                    name: `Subfolder`,
                    isFolder: true,
                    items: [
                        {
                            id: `4`,
                            name: `random`,
                            isFolder: false,
                            items: [],
                        },
                    ],
                },
            ],
        },
        {
            id: `public`,
            name: `public`,
            isFolder: true,
            items: [
                {
                    id: `vite.svg`,
                    name: `vite.svg`,
                    isFolder: false,
                    items: [],
                },
            ],
        },
        {
            id: `src`,
            name: `src`,
            isFolder: true,
            items: [
                {
                    id: `assets`,
                    name: `assets`,
                    isFolder: true,
                    items: [],
                },
                {
                    id: `components`,
                    name: `components`,
                    isFolder: true,
                    items: [],
                },
                {
                    id: `hooks`,
                    name: `hooks`,
                    isFolder: true,
                    items: [],
                },
                {
                    id: `App.tsx`,
                    name: `App.tsx`,
                    isFolder: false,
                    items: [],
                },
                {
                    id: `index.css`,
                    name: `index.css`,
                    isFolder: false,
                    items: [],
                },
                {
                    id: `main.tsx`,
                    name: `main.tsx`,
                    isFolder: false,
                    items: [],
                },
            ],
        },
    ],
};
