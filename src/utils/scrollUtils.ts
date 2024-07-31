export const scrollToElement = (scrollTarget: string) => () => {

    const element = document.getElementById(scrollTarget);

    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
        });
    }
};
