let $link, $form, $uri, $title;

function init() {
    const {
        link,
        title
    } = parseParams();

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

document.addEventListener('DOMContentLoaded', init);