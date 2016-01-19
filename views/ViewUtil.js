ViewUtil = {
    /**
     * Sort according to alphabetical order in the browser's locale.
     * Treat a, á, and A as the same character.
     */
    alphabeticalSort(items, keyFn) {
        items = items.slice(0);  // shallow copy
        const collator = new Intl.Collator(undefined, { sensitivity: "base" });
        items.sort((a, b) => {
            return collator.compare(keyFn(a), keyFn(b));
        });
        return items;
    },
};
