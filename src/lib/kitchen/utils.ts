import type {InitialPaths} from '@/lib/kitchen/types.ts';

export const createPathArray = (initialString: string) => {
    return initialString.split('/');
};

export const createPathString = (initialPath: string[]) => {
    return initialPath.join('/');
};

export const removeLastSegment = (pathString: string, segmentName?: string) => {
    const path = createPathArray(pathString);
    const lastSegment = path[path.length - 1];
    if (lastSegment === segmentName || segmentName === undefined) {
        return createPathString(path.slice(0, path.length - 1));
    }
    return pathString;
};

export const removeFirstSegment = (pathString: string, segmentName?: string) => {
    const path = createPathArray(pathString);
    const firstSegment = path[0];
    if (firstSegment === segmentName || segmentName === undefined) {
        return createPathString(path.slice(1, path.length));
    }
    return pathString;
};

export const normalizePath = (initialPaths: InitialPaths) => {
    return Object.entries(initialPaths || {})
        .map(([alias, [directory]]) => [
            removeLastSegment(alias, '*'),
            removeLastSegment(directory, '*'),
        ])
        .map(([alias, directory]) => [removeLastSegment(alias, '/'), directory]);
};
