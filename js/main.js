/* eslint-env jquery */

(function() {

    var foo = 1;
    return foo;

})();

//catelogGenerate
(function () {
    var catelog = $('#catelog');
    $('.article').each(function () {
        var chapterLinkElement = $('<a>', {
            href: '#' + $(this).attr('id'),
            text: $(this).data('title'),
            class: 'sidebar-link'
        });
        var sectionListElement = $('<ul>', {
            class: 'sub-menu'
        });

        //查找article div里的所有section元素
        $(this).find('.section').each(function () {
            var sectionListWrapper = $('<li>');
            var sectionLink = $('<a>', {
                href: '#' + $(this).attr('id'),
                text: $(this).data('title'),
                class: 'section-link'
            });
            sectionLink.appendTo(sectionListWrapper);
            sectionListWrapper.appendTo(sectionListElement);
        });

        var articleListWrapper = $('<li>');
        articleListWrapper.append(chapterLinkElement);
        articleListWrapper.append(sectionListElement);
        catelog.append(articleListWrapper);

    });
})();
