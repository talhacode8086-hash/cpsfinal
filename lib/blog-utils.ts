export const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
};

export const generateTOC = (content: string) => {
    // Matches ##, ###, and ####
    const headingRegex = /^(#{2,4})\s+(.*)$/gm;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        let title = match[2];

        // Strip markdown links [Text](URL) to just Text
        title = title.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
        // Strip emojis if they cause issues, but user specifically has emojis in H4s

        const id = title.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();

        headings.push({ title, level, id });
    }

    return headings;
};
