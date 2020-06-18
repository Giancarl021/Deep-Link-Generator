let $link, $form, $uri, $title;

function init() {
    const {
        link: _link,
        title
    } = parseParams();

    const link = parseExceptions(_link);

    $link = document.getElementById('link');
    $form = document.querySelector('form');
    [$uri, $title] = [...document.querySelectorAll('input')];

    $link.href = $uri.value = link || '';
    $link.innerText = $title.value = title || '';

    if (link && title) {
        $form.style.display = 'none';
    }
}

function parseParams() {
    const data = /\?/.test(window.location.href) ? window.location.href.split('?').pop().split('&') : [];
    const params = {};
    for (const param of data) {
        const [key, value] = param.split('=');
        params[key] = /^\d+$/g.test(value) ? parseFloat(value) : decodeURIComponent(value);
    }
    return params;
}

function generateLink() {
    window.location.href = window.location.href.split('?').shift() + `?link=${encodeURIComponent($uri.value)}&title=${encodeURIComponent($title.value)}`;
}

function parseExceptions(link) {
    let r = '';
    const exceptions = [
        {
            regex: /^tel:/,
            fn(link) {
                return 'tel:' + encodeURIComponent(link.replace('tel:', ''));
            }
        }
    ];

    for (const exception of exceptions) {
        if(exception.regex.test(link)) {
            r = exception.fn(link);
        }
    }

    return r;
}

document.addEventListener('DOMContentLoaded', init);