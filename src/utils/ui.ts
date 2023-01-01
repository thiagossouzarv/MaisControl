export default class UIUtils {
    static scrollToEnd(scrollView: any, animated = true) {
        try {
            scrollView?.scrollToEnd({
                animated,
            });

        } catch (error) { }
    }

    static scrollToTop(scrollView: any, animated = true) {
        try {
            scrollView?.scrollTo({
                y: 0,
                animated,
            });

        } catch (error) { }
    }

    static scrollToLeft(scrollView: any, animated = true) {
        try {
            scrollView?.scrollTo({
                x: 0,
                animated,
            });

        } catch (error) { }
    }

    static scrollFlatlistToTop(scrollView: any, animated = true) {
        try {
            scrollView?.scrollToOffset({
                offset: 0,
                animated,
            });

        } catch (error) { }
    }

    static scrollFlatlistToItem(scrollView: any, index = 0, animated = true) {
        try {
            scrollView?.scrollToIndex({
                index,
                animated,
            });

        } catch (error) { }
    }

    static scrollSectionList(sectionList: any, sectionIndex = 0, itemIndex = 0, animated = true) {
        try {
            sectionList?.scrollToLocation({
                animated,
                sectionIndex,
                itemIndex,
            });
        } catch (err) { }
    }
}