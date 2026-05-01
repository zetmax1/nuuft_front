import React from 'react';
import DOMPurify from 'dompurify';
import '../../styles/rich-text.css';

// Register hooks once, outside component
DOMPurify.addHook('afterSanitizeAttributes', function (node) {
    if ('target' in node && node.getAttribute('target') === '_blank') {
        node.setAttribute('rel', 'noopener noreferrer');
    }
});

DOMPurify.addHook('uponSanitizeAttribute', function (node, data) {
    if (data.attrName === 'style') {
        if (/javascript:|expression\s*\(/i.test(data.attrValue)) {
            data.forceKeepAttr = false;
            node.removeAttribute('style');
        }
    }
});

const sanitizeConfig = {
    ALLOWED_TAGS: [
        'p', 'br', 'b', 'i', 'em', 'strong', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'blockquote', 'img', 'span', 'div', 'hr',
        'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th', 'caption',
        'sub', 'sup', 'u', 's', 'strike', 'pre', 'code'
    ],
    ALLOWED_ATTR: [
        'href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel',
        'width', 'height', 'style', 'colspan', 'rowspan', 'align', 'valign',
        'cellpadding', 'cellspacing'
    ],
    ALLOW_DATA_ATTR: false,
};

const RichTextRenderer = ({ content, className = '' }) => {
    if (!content) return null;

    const sanitizedHtml = DOMPurify.sanitize(content, sanitizeConfig);

    return (
        <div
            className={`rich-text-container ${className}`}
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
    );
};

export default RichTextRenderer;