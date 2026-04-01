/*jslint
    white: true,
    browser: true,
    vars: true
*/

/**
 * Generates a table of contents for your document based on the headings
 *  present. Anchors are injected into the document and the
 *  entries in the table of contents are linked to them. The table of
 *  contents will be generated inside of the first element with the id `toc`.
 * @param {HTMLDOMDocument} documentRef Optional A reference to the document
 *  object. Defaults to `document`.
 * @author Matthew Christopher Kastor-Inare III
 * @version 20130726
 * @example
 * // call this after the page has loaded
 * htmlTableOfContents();
 */
function htmlTableOfContents (documentRef) {
    var documentRef = documentRef || document;
    var toc = documentRef.getElementById('toc');
    var headings = [].slice.call(documentRef.body.querySelectorAll('h2, h3'));
    headings.forEach(function (heading, index) {
        var anchor = documentRef.createElement('a');
        anchor.setAttribute('name', 'toc' + index);
        anchor.setAttribute('id', 'toc' + index);
        
        var link = documentRef.createElement('a');
        link.setAttribute('href', '#toc' + index);
        link.textContent = heading.textContent;
        
        var div = documentRef.createElement('div');
        div.setAttribute('class', heading.tagName.toLowerCase());
        
        div.appendChild(link);
        toc.appendChild(div);
        heading.parentNode.insertBefore(anchor, heading);
    });
}

/**
 * Toggle the table of contents container visibility
 */
function toggleTOC() {
    var tocContainer = document.querySelector('.toc-container');
    if (tocContainer) {
        tocContainer.classList.toggle('visible');
    }
}

// Initialize TOC toggle functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    var tocHandle = document.querySelector('.toc-handle');
    var tocContainer = document.querySelector('.toc-container');
    
    if (tocHandle) {
        tocHandle.addEventListener('click', toggleTOC);
    }
    
    // Close TOC when clicking outside of it
    if (tocContainer) {
        document.addEventListener('click', function(event) {
            // Check if click is outside the toc-container and it's currently visible
            if (!tocContainer.contains(event.target) && tocContainer.classList.contains('visible')) {
                tocContainer.classList.remove('visible');
            }
        });
    }
});

try {
     module.exports = htmlTableOfContents;
} catch (e) {
    // module.exports is not defined
}